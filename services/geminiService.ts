// This service is DEPRECATED and has been neutralized for security.
// Chat logic is now handled by the backend serverless function at /api/chat
// Do not use this file.

export const streamChatResponse = async (history: any[], message: string, onUpdate: (chunk: string) => void) => {
  console.warn("Usage of deprecated frontend Gemini service detected. Please use the backend API.");
  onUpdate("I've been updated to use a more secure backend system. Please refresh your page.");
};
