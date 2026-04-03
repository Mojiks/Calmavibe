import { GoogleGenAI } from "@google/genai";

export const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};

// For Lyria models, we might need to use the user-selected key if available
export const getLyriaClient = () => {
  // The platform injects the selected key into process.env.API_KEY
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("No API key available for Lyria");
  }
  return new GoogleGenAI({ apiKey });
};
