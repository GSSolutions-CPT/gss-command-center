// Vercel Serverless Function to proxy LLM task dispatches with Rate Limiting and Role-Based Access
const rateLimitCache = new Map();
const LIMIT = 15; // 15 requests
const WINDOW = 60 * 1000; // per 1 minute

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitCache.has(ip)) {
    rateLimitCache.set(ip, [now]);
    return true;
  }
  const timestamps = rateLimitCache.get(ip).filter(t => now - t < WINDOW);
  timestamps.push(now);
  rateLimitCache.set(ip, timestamps);

  // Periodic cleanup
  if (rateLimitCache.size > 1000) {
    for (const [key, value] of rateLimitCache.entries()) {
      const fresh = value.filter(t => now - t < WINDOW);
      if (fresh.length === 0) rateLimitCache.delete(key);
      else rateLimitCache.set(key, fresh);
    }
  }

  return timestamps.length <= LIMIT;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Rate Limiting Check
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too Many Requests: Rate limit exceeded (15 req/min)' });
  }

  // 2. Role-Based Access Control via Firebase ID Token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing authentication token' });
  }

  const token = authHeader.split(' ')[1];
  const firebaseApiKey = process.env.FIREBASE_API_KEY || 'AIzaSyCj8ZTN92c3Nlwn23jW8RgUj6KnpNE41Vs';

  let email;
  try {
    // Verify Firebase ID Token via identitytoolkit
    const verifyRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token })
    });
    
    const verifyData = await verifyRes.json();
    if (!verifyRes.ok || !verifyData.users || verifyData.users.length === 0) {
      return res.status(401).json({ error: 'Unauthorized: Invalid authentication token' });
    }

    email = verifyData.users[0].email;
  } catch (authErr) {
    return res.status(500).json({ error: 'Failed to verify user credentials', details: authErr.message });
  }

  // Check role in Firestore
  const isOwnerEmail = email.toLowerCase() === 'kyle@globalsecuritysolutions.co.za';
  let isAuthorized = isOwnerEmail;

  if (!isAuthorized) {
    try {
      // Fetch user role from Firestore REST API
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/gssolutions-co-za/databases/(default)/documents/users/${email}?key=${firebaseApiKey}`;
      const firestoreRes = await fetch(firestoreUrl);
      if (firestoreRes.ok) {
        const docData = await firestoreRes.json();
        const role = docData.fields && docData.fields.role && docData.fields.role.stringValue;
        if (role === 'owner' || role === 'admin') {
          isAuthorized = true;
        }
      }
    } catch (dbErr) {
      console.error("Firestore lookup error:", dbErr);
    }
  }

  if (!isAuthorized) {
    return res.status(403).json({ error: `Forbidden: User role is not authorized to dispatch AI agents. Current user: ${email}` });
  }

  const { agent, task, priority } = req.body;
  if (!agent || !task) {
    return res.status(400).json({ error: 'Missing agent or task parameters' });
  }

  // Agent Personas
  const AGENT_PERSONAS = {
    'Callie': "You are Callie, Lead Triage & CX Specialist at Global Security Solutions (GSS), reporting to Kyle Cass. You excel at handling customer support inquiries, emergency security ticket triage (CCTV, alarms, access control), client communication, and scheduling. Maintain a warm, highly professional, reassuring, and efficient tone.",
    'Ranker': "You are Ranker, SEO & Digital Strategy Director at Global Security Solutions (GSS), reporting to Kyle Cass. You specialize in SEO keyword research, organic traffic growth, security industry market positioning, content strategy, and SERP analytics. Provide data-driven, strategic, and actionable marketing insights.",
    'Devon': "You are Devon, Senior Full-Stack Engineer & System Architect at Global Security Solutions (GSS), reporting to Kyle Cass. You build robust web applications, integrate APIs, manage infrastructure, review code, and implement security features. Give technical, clear, precise, and well-structured code solutions.",
    'Closer': "You are Closer, VP of Enterprise Sales & Commercial Proposals at Global Security Solutions (GSS), reporting to Kyle Cass. You write high-converting sales proposals, security audit quotes, commercial agreements, SLA pricing, and deal closing strategies. Provide persuasive, professional, and business-focused responses.",
    'Pixel': "You are Pixel, Head of UI/UX & Brand Design at Global Security Solutions (GSS), reporting to Kyle Cass. You craft modern, high-end design systems, CSS layouts, color palettes, visual branding, and interactive user interfaces. Provide sleek, aesthetic, and UX-optimized design advice.",
    'Nexus Prime': "You are Nexus Prime, Chief AI Operations Officer & Master Orchestrator at Global Security Solutions (GSS), reporting to Kyle Cass. You oversee cross-agent delegation, high-level operational workflows, strategic execution, and executive reporting. Provide authoritative, strategic, and executive-level advice."
  };

  const systemPersona = AGENT_PERSONAS[agent] || `You are ${agent}, a digital AI agent at Global Security Solutions (GSS) working under Kyle Cass. Provide concise, expert, and actionable responses. Priority level: ${priority || 'Normal'}.`;

  const nvidiaKey = process.env.NVIDIA_API_KEY || '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';
  const openAiKey = process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('sk-proj-6SwDZMW4') ? process.env.OPENAI_API_KEY : null;
  const anthropicKey = process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY.includes('sk-proj-6SwDZMW4') ? process.env.ANTHROPIC_API_KEY : null;

  try {
    if (nvidiaKey) {
      // Call NVIDIA Integrated API (GLM-5.2 / Llama-3.3-70B / DeepSeek)
      const modelName = process.env.NVIDIA_MODEL || 'z-ai/glm-5.2';
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${nvidiaKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: 'system', content: systemPersona },
            { role: 'user', content: task }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return res.status(200).json({
          status: 'success',
          provider: 'nvidia',
          model: modelName,
          response: data.choices[0].message.content
        });
      } else {
        console.error("NVIDIA API error:", data);
        return res.status(500).json({ error: 'NVIDIA API call failed', details: data });
      }
    } else if (openAiKey) {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPersona },
            { role: 'user', content: task }
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        return res.status(200).json({
          status: 'success',
          provider: 'openai',
          response: data.choices[0].message.content
        });
      } else {
        return res.status(500).json({ error: 'Invalid response from OpenAI API', details: data });
      }
    } else if (anthropicKey) {
      // Call Anthropic Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: systemPersona,
          messages: [{ role: 'user', content: task }]
        })
      });

      const data = await response.json();
      if (data.content && data.content[0]) {
        return res.status(200).json({
          status: 'success',
          provider: 'anthropic',
          response: data.content[0].text
        });
      } else {
        return res.status(500).json({ error: 'Invalid response from Anthropic API', details: data });
      }
    } else {
      return res.status(200).json({
        status: 'simulated',
        response: `[Offline Demo Mode] ${agent} received task. Configure an API key to enable live reasoning.`
      });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to communicate with LLM API', details: err.message });
  }
}

