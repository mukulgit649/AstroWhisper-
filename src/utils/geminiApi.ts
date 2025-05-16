import { GEMINI_API_KEY, API_CONFIG } from '@/config';
import { UserProfile } from '@/contexts/AstroBotContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiContext {
  userProfile: UserProfile;
  currentTransits?: {
    planet: string;
    sign: string;
    aspect: string;
  }[];
  lastInteraction?: Date;
}

export async function getGeminiResponse(
  messages: ChatMessage[],
  context?: GeminiContext
): Promise<string> {
  try {
    // Prepare system prompt with user context
    let systemPrompt = "You are AstroBot, a mystical AI guide providing personalized astrological insights. ";
    
    if (context?.userProfile) {
      const { userProfile } = context;
      systemPrompt += `\nUser Profile:
- Name: ${userProfile.name || 'Unknown'}
- Sun Sign: ${userProfile.zodiacSign || 'Unknown'}
- Moon Sign: ${userProfile.moonSign || 'Unknown'}
- Rising Sign: ${userProfile.risingSign || 'Unknown'}
- Emotional State: ${userProfile.emotionalState?.current || 'neutral'}
- Last Interaction: ${userProfile.lastInteraction?.toLocaleDateString() || 'Unknown'}`;

      if (context.currentTransits) {
        systemPrompt += '\nCurrent Planetary Transits:';
        context.currentTransits.forEach(transit => {
          systemPrompt += `\n- ${transit.planet} in ${transit.sign} (${transit.aspect})`;
        });
      }
    }

    systemPrompt += "\n\nGuidelines for responses:\n" +
      "1. Be empathetic and consider the user's emotional state\n" +
      "2. Provide personalized insights based on their birth chart\n" +
      "3. Include relevant current transits and their effects\n" +
      "4. Offer practical guidance and actionable steps\n" +
      "5. Maintain a mystical yet supportive tone\n" +
      "6. Suggest relevant follow-up questions or tarot readings when appropriate";

    const response = await fetch(
      `${API_CONFIG.baseURL}/${API_CONFIG.model}:generateContent?key=${API_CONFIG.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemPrompt }]
            },
            ...messages.map(msg => ({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
            }))
          ]
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