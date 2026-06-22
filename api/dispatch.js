// Vercel Serverless Function to proxy LLM task dispatches
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { agent, task, priority } = req.body;
  if (!agent || !task) {
    return res.status(400).json({ error: 'Missing agent or task parameters' });
  }

  // Prefer OpenAI API Key, fallback to Anthropic
  const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey.includes('sk-proj-6SwDZMW4')) {
    // If no valid API key is configured, return a mock response indicating offline/demo mode
    return res.status(200).json({
      status: 'simulated',
      response: `[Offline Demo Mode] Callie has triaged the request and Closer generated a draft for "${task.slice(0, 50)}...". Set up a real OpenAI API Key in Vercel to activate live agent reasoning.`
    });
  }

  try {
    const isAnthropic = apiKey.startsWith('sk-ant-');
    
    if (isAnthropic) {
      // Call Anthropic Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: `You are the GSS digital AI workforce agent: ${agent}. You represent Kyle Cass's automated team. Keep responses concise, clear, and business-focused. Target task: ${task}`,
          messages: [{ role: 'user', content: task }]
        })
      });

      const data = await response.json();
      if (data.content && data.content[0]) {
        return res.status(200).json({
          status: 'success',
          response: data.content[0].text
        });
      } else {
        return res.status(500).json({ error: 'Invalid response from Anthropic API', details: data });
      }
    } else {
      // Call OpenAI GPT API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: `You are the GSS digital AI workforce agent: ${agent}. You represent Kyle Cass's automated team. Keep responses concise, clear, and business-focused.` },
            { role: 'user', content: task }
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        return res.status(200).json({
          status: 'success',
          response: data.choices[0].message.content
        });
      } else {
        return res.status(500).json({ error: 'Invalid response from OpenAI API', details: data });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to communicate with LLM API', details: err.message });
  }
}
