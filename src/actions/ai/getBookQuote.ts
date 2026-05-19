"use server";
import { Author, IAuthor } from "@/src/models/author";
import { ApiError, GoogleGenAI } from "@google/genai";
import { StatusCodes } from "http-status-codes";

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });

export async function getBookQuote(bookTitle: string, authorId: string) {
  try {
    const author = await Author.findById(authorId).select("name").lean<IAuthor>();
    if (!author) return { success: false, message: "The author wasn't found" };
    const authorName = author.name;

    const models = [
      "gemini-3.1-flash-lite",
      "gemini-2.5-pro",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
    ];

    for (const modelName of models) {
      try {
        const result = await ai.models.generateContent({
          model: modelName,
          contents: `Get a random, unique quote from the "${bookTitle}" by ${authorName}. Request ID: ${Date.now()}. SURPRISE ME 
                      with a quote I haven't seen yet.`,
          config: {
            systemInstruction: `You are a professional literary archivist. 
                            Your goal is to provide accurate book quotes.
                            RULES:
                            1. LANGUAGE MATCHING (CRITICAL): Detect the language used in the book title and author name. Return the quote ONLY in that same language. Do NOT translate.
                            2. Accuracy: Silently correct typos in the authors name and book title before searching for the quote.
                            3. Quote Length: The quote MUST be between 50 and 120 characters long.
                            4. Fallback: If the book is too rare, new, or the quote is not found, DO NOT apologize. Instead, generate a witty, 
                            humorous fake quote about the fact that this specific book is keeping its secrets or that the quote went on vacation.
                            5. Output: Return ONLY a valid JSON. No markdown, no here is your data, no backticks.
                            6. ANTI-REPETITION PROTOCOL: 
                            - Every request is unique. Do NOT provide the same quote twice.
                            - To ensure variety, mentally pick a RANDOM chapter (from 1 to 20) and a RANDOM character before selecting the quote.
                            - Focus on atmospheric descriptions or minor character dialogues to ensure novelty.`,
            temperature: 0.7,
            responseMimeType: "application/json",
          },
        });
        if (result.text) {
          const response = JSON.parse(result.text);
          return { success: true, quote: response.quote };
        }
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === StatusCodes.TOO_MANY_REQUESTS || error.status >= 500) {
            console.warn(`Model ${modelName} is unavailable, trying another one`);
            continue;
          }
          if (error.status === StatusCodes.UNPROCESSABLE_ENTITY) {
            return { success: false, message: "Failed to generate a quote due to security policy" };
          }
          if (error.status === StatusCodes.BAD_REQUEST) {
            if (error.message.toLowerCase().includes("location")) {
              return { success: false, message: "This feature is unavailable in your region" };
            }
          }
        }
        throw error;
      }
    }
  } catch (error) {
    console.error("AI model error", error);
    return { success: false, message: "Failed to generate a quote" };
  }
}
