const axios = require("axios");

async function callLLM(provider, prompt, retries = 3) {
  try {
    if (provider === "gemini") {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

      const url =
        process.env.GEMINI_URL ||
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

      const payload = {
        contents: [
        {
            role: "user",
            parts: [{ text: prompt }],
        },
        ],
    };


      const res = await axios.post(`${url}?key=${apiKey}`, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
    });


      const text =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from model";
      return text;
    }

    throw new Error("Unsupported LLM provider");
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);
      await new Promise((r) => setTimeout(r, 1000 * (4 - retries)));
      return callLLM(provider, prompt, retries - 1);
    }
    throw err;
  }
}

module.exports = { callLLM };
