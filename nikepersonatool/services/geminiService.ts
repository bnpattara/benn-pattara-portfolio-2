import { GoogleGenAI } from "@google/genai";
import { Persona } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePersonaResponse = async (
  persona: Persona,
  history: { role: 'user' | 'model'; content: string }[],
  userMessage: string
): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview'; 
    
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: persona.systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I have nothing to add at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble processing that request right now.";
  }
};

export const generateFocusGroupResponse = async (
  activePersonas: Persona[],
  history: { role: 'user' | 'model'; content: string }[],
  userMessage: string
): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview';

    const participantsDescription = activePersonas.map(p => 
      `Name: ${p.name.toUpperCase()} (${p.role})\nBio/Personality: ${p.systemInstruction}`
    ).join('\n---\n');

    const groupSystemInstruction = `
      You are simulating a consumer focus group with the following participants:
      ${participantsDescription}

      The user acts as the Moderator.

      DIRECTIVES FOR RESPONSE:
      1. **MANDATORY PARTICIPATION**: EVERY participant listed above MUST provide an individual response to the moderator's question in this turn.
      2. **NO GROUP SUMMARIES**: Write out the exact dialogue for each person separately.
      3. **INTERACTION**: Participants should speak to the moderator but also react to each other.
      4. **STRICT SCRIPT FORMAT**: Output strictly as a screenplay script. Name followed by colon.
         
      Format:
      NAME: [Dialogue]
    `;

    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: groupSystemInstruction,
        temperature: 0.9,
      },
      history: chatHistory,
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "The group remains silent.";
  } catch (error) {
    console.error("Gemini Group API Error:", error);
    return "The focus group is having technical difficulties.";
  }
};