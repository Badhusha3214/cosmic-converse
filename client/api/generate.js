// Vercel serverless function: POST /api/generate
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  const { gemini_content: message, planet_info: planetInfo = {}, previous_content: previousContent } =
    req.body || {};

  if (!message) {
    return res.status(400).json({ error: "gemini_content is required" });
  }

  try {
    const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Use the chat memory to remember our previous conversation: ${JSON.stringify(previousContent)} these are our old conversation you have to answer according to these msg take the as uer mamory , if you want you can take this as the memory of your self ${JSON.stringify(planetInfo)}, now  think you are ${planetInfo.name} planet now talk to me as ${planetInfo.name} , this is my question  : ${message} `;

    const result = await model.generateContent(prompt);
    const lines = result.response.text().split("\n").filter((line) => line.trim() !== "");

    return res.status(200).json({ message: "Gemini Reponse Retrived Successfully", data: lines });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: err.message });
  }
};
