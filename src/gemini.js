// gemini.js
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// put API key safely in .env (not hardcoded in real projects!)
const apiKey = "AIzaSyDg50_QOWcYQSzN-V0EkrrbxiYVfVGrd9s";
const genAI = new GoogleGenerativeAI(apiKey);

// Load Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Config
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 25,
  responseMimeType: "text/plain",
};

// Async function (video style)
async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text()
}

// Call function
export default run;
