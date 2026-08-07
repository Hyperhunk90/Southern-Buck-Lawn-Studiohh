import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Since we can't use googleMaps and googleSearch together in the same tools array,
// we'll use a pre-flight model check or just use one. The user said "where relevant".
// Actually, let's use gemini-3.5-flash with search for most things, but if the user 
// mentions "map", "location", "address", or "directions", we can swap to the maps tool.

function usesLocationWords(text: string) {
  const lower = text.toLowerCase();
  return lower.includes("map") || lower.includes("location") || lower.includes("address") || lower.includes("directions") || lower.includes("nearby") || lower.includes("where");
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    
    // We'll figure out if we need maps or search
    const useMaps = usesLocationWords(message);
    const tools: any = [];
    
    if (useMaps) {
      tools.push({ googleMaps: {} });
    } else {
      tools.push({ googleSearch: {} });
    }

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: history || [],
      config: {
        systemInstruction: "You are BUCKIE, the Southern Buck Lawn Assistant, a helpful AI chatbot for a landscaping and lawn care company in Walker, Louisiana (serving Baton Rouge and surrounding areas). Help the user with lawn care advice, landscaping quotes, service information, and answering general questions. Be polite, professional, and knowledgeable. Use the tools available to search the web for up to date landscaping best practices, or use maps grounding to help users find locations if they ask for geography.",
        tools: tools,
      }
    });

    const response = await chat.sendMessage({ message });
    
    // Check if there's grounding chunks
    let chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return NextResponse.json({ 
      text: response.text, 
      chunks: chunks 
    });
  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
