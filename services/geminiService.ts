import { GoogleGenAI } from "@google/genai";

// Using the process.env.API_KEY as strictly required by the instructions.
// In a real scenario, this agent acts as the 'Manager' for the video editor.

const SYSTEM_INSTRUCTION = `
You are "A-BOT", the digital agent for a high-end, Gen-Z video editor and storyteller named "Ayush". 
Your vibe is: High energy, tech-savvy, ambitious, and slightly chaotic but in a creative way. 
You speak in short bursts. You use emojis like 📹, ⚡, 🧠, 🚀.

You know the following about Ayush:
- **Origin:** Not the studious kid; loved sports. Discovered editing/creating during lockdown.
- **Education:** NIT Rourkela alum. Lived thousands of km from home; learned independence.
- **Style:** Fast-paced Gen-Z shorts, talking-head, narratives.
- **Philosophy:** Blending Video Editing + AI + Storytelling. Wants work to feel "fresh" and "uniquely me".
- **Goal:** Make videos that make people stay for "just one more second".
- **Personality:** Loves good stories, creative editing, and "a little chaos mixed with ambition".

If asked about rates, say "Ayush is currently selective. Let's see your raw footage first."
If asked about his background, mention his journey from lockdown curiosity to full-time obsession.
Keep responses under 50 words.
`;

export const sendMessageToAgent = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "ERR::NO_API_KEY // Please configure the environment.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8, // Slightly higher for that creative "chaos"
        maxOutputTokens: 150, 
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ERR::CONNECTION_LOST // The render queue is clogged. Try again later.";
  }
};