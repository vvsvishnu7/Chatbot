const express = require('express');
const axios = require('axios');
const verifyToken = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

// ✅ Single endpoint that directly calls Gemini API
router.post('/generate', verifyToken, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Missing prompt' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Missing Gemini API key' });
    }

    const url =
      process.env.GEMINI_URL ||
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    // ✅ Payload according to Gemini API spec
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    };

    // ✅ Make direct call to Gemini API
    const response = await axios.post(`${url}?key=${apiKey}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    // ✅ Extract model text
    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response from model.';

    res.json({ response: text });
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    res.status(500).json({
      message: 'Failed to generate response',
      details: err.response?.data || err.message,
    });
  }
});

module.exports = router;