require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(message, planetInfo, previousContent) {
  const prompt = `Talk to me as ${planetInfo.name}: ${message} - Use the chat memory to remember our previous conversation: ${previousContent}`;

  // Generate content based on the prompt
  const result = await model.generateContent(prompt);

  // Extract the response
  const response = result.response;

  // Assuming response has a text() method
  const text = response.text ? await response.text() : response;

  // Split the text into an array of lines
  const lines = text.split("\n");

  // remove empty lines
  return lines.filter((line) => line.trim() !== "");

}

module.exports = run;
