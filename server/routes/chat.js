const express = require('express');
const verifyToken = require('../middleware/auth');
const { callLLM } = require('../util/llmClient');
const router = express.Router();

router.post('/generate', verifyToken, async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ message: 'Missing query' });

    const provider = (process.env.LLM_PROVIDER || 'gemini').toLowerCase();
    const llmResp = await callLLM(provider, query);
    // Normalize response to string
    const text = typeof llmResp === 'string' ? llmResp : JSON.stringify(llmResp);
    res.json({ response: text });
  } catch (err) {
    console.error('LLM error:', err.message || err);
    res.status(500).json({ message: 'Failed to generate response', details: err.message });
  }
});

module.exports = router;
