import { GEMINI_API_KEY, API_CONFIG } from '@/config';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function getGeminiResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await fetch(
      `${API_CONFIG.baseURL}/${API_CONFIG.model}:generateContent?key=${API_CONFIG.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          }))
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || response.statusText);
    }

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts ||
      !data.candidates[0].content.parts[0] ||
      !data.candidates[0].content.parts[0].text
    ) {
      throw new Error('No valid response from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
} 