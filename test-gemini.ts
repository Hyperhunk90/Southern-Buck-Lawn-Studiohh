import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function main() {
  try {
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: "You are a helpful assistant.",
      },
    });
    let response = await chat.sendMessage({ message: "Hello, my name is Alex" });
    console.log(response.text);
    response = await chat.sendMessage({ message: "What is my name?" });
    console.log(response.text);
    console.log("HISTORY:", await chat.getHistory());
  } catch (e) {
    console.error(e);
  }
}
main();
