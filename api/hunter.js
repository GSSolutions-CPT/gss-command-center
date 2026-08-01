// Vercel Serverless Function: Autonomous AI Lead Hunter Engine for GSS Command Center
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { area = 'Durbanville', sector = 'Commercial', need = 'CCTV Upgrades & VMS' } = req.body;

  const nvidiaKey = process.env.NVIDIA_API_KEY || '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';
  const openAiKey = process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('sk-proj-6SwDZMW4') ? process.env.OPENAI_API_KEY : null;

  const hunterSystemPrompt = `You are Ranker & Closer, autonomous lead generation agents at Global Security Solutions (GSS), reporting to Kyle Cass in Cape Town. 
Your objective is to autonomously hunt high-value commercial, industrial, or residential security prospects in ${area}, Cape Town.
Target Sector: ${sector}. Primary Need: ${need}.

For the given region and sector, generate exactly 3 realistic, high-converting prospect opportunities in JSON format.
Return ONLY valid JSON with this structure (no extra Markdown text outside JSON):
{
  "prospects": [
    {
      "name": "Full Business / Estate / Property Name in ${area}",
      "sector": "${sector}",
      "area": "${area}",
      "estValue": 250000,
      "decisionMaker": "Role & Title (e.g. Operations Director / Body Corporate Trustee / Facility Manager)",
      "vulnerability": "Specific security gap identified (e.g. legacy analog cameras, non-compliant electric fence, high-volume gate bottleneck)",
      "proposedSolution": "Concise summary of GSS solution (CCTV VMS, SANS 10222 electric fence, smart access control)",
      "pitchSnippet": "High-converting 2-paragraph outreach email pitch tailored for Kyle Cass to send."
    }
  ]
}`;

  try {
    let rawOutput = '';

    if (nvidiaKey) {
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${nvidiaKey}`
        },
        body: JSON.stringify({
          model: process.env.NVIDIA_MODEL || 'z-ai/glm-5.2',
          messages: [
            { role: 'system', content: hunterSystemPrompt },
            { role: 'user', content: `Generate 3 autonomous lead prospects for ${area} (${sector} - ${need}). Return strict JSON.` }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        rawOutput = data.choices[0].message.content;
      }
    } else if (openAiKey) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: hunterSystemPrompt },
            { role: 'user', content: `Generate 3 autonomous lead prospects for ${area} (${sector} - ${need}). Return strict JSON.` }
          ]
        })
      });
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        rawOutput = data.choices[0].message.content;
      }
    }

    if (!rawOutput) {
      return res.status(500).json({ error: 'Failed to retrieve AI prospect data' });
    }

    // Clean JSON response if wrapped in markdown block
    let cleanedJson = rawOutput.trim();
    if (cleanedJson.startsWith('```json')) {
      cleanedJson = cleanedJson.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanedJson.startsWith('```')) {
      cleanedJson = cleanedJson.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsedData = JSON.parse(cleanedJson);
    return res.status(200).json({ status: 'success', data: parsedData });

  } catch (err) {
    console.error("Hunter API Error:", err);
    return res.status(500).json({ error: 'Failed to execute lead hunter', details: err.message });
  }
}
