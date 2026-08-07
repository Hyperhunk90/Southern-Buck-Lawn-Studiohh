import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function main() {
  try {
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: [
        { role: 'user', parts: [{ text: 'Hello, my name is Alex' }] },
        { role: 'model', parts: [{ text: 'Hello Alex! How can I help you today?' }] }
      ]
    });
    const response = await chat.sendMessage({ message: "What is my name?" });
    console.log(response.text);
  } catch (e) {
    console.error(e);
  }
}
main();
