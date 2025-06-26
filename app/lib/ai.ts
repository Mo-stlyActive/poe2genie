// AI Service Layer for poe2genie
// Handles all AI interactions using OpenAI API

export interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export interface ItemAnalysis {
  description: string;
  buildSuggestions: string[];
  tradeAdvice: string;
  metaAnalysis: string;
}

export interface BuildAdvice {
  suggestions: string[];
  improvements: string[];
  alternatives: string[];
  playstyleNotes: string;
}

export interface SearchEnhancement {
  enhancedQuery: string;
  filters: Record<string, any>;
  suggestions: string[];
}

class AIService {
  private apiKey: string;
  private baseUrl: string;
  private lastRequestTime: number = 0;
  private minRequestInterval: number = 1000; // 1 second between requests

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
  }

  private async makeRequest(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.'
      };
    }

    // Rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    this.lastRequestTime = Date.now();

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt || 'You are a helpful Path of Exile expert assistant. Provide clear, accurate, and helpful advice about PoE items, builds, and game mechanics.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        let errorMessage = `OpenAI API error: ${response.status}`;
        
        if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please wait a few minutes before trying again.';
        } else if (response.status === 401) {
          errorMessage = 'Invalid API key. Please check your OpenAI API key configuration.';
        } else if (response.status === 402) {
          errorMessage = 'Payment required. Please add payment method to your OpenAI account.';
        } else if (response.status === 403) {
          errorMessage = 'Access denied. Please check your OpenAI account permissions.';
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return {
        success: true,
        data: data.choices[0]?.message?.content || 'No response from AI'
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Analyze an item and provide insights
  async analyzeItem(item: any): Promise<AIResponse> {
    const prompt = `
      Analyze this Path of Exile item and provide insights:
      
      Item Name: ${item.name}
      Type: ${item.typeLine}
      Value: ${item.chaosValue} chaos
      ${item.explicitModifiers ? `Modifiers: ${item.explicitModifiers.map((m: any) => m.text).join(', ')}` : ''}
      ${item.flavourText ? `Flavor Text: ${item.flavourText}` : ''}
      
      Please provide:
      1. A clear description of what this item does
      2. Build suggestions that would benefit from this item
      3. Trade advice (is it worth the price?)
      4. Meta analysis (how popular/useful is this item currently?)
      
      Format your response in a clear, structured way.
    `;

    return this.makeRequest(prompt);
  }

  // Provide build advice based on user input
  async getBuildAdvice(buildData: any): Promise<AIResponse> {
    const prompt = `
      Analyze this Path of Exile build and provide advice:
      
      Class: ${buildData.characterClass}
      Description: ${buildData.description}
      Equipment: ${JSON.stringify(buildData.equipment)}
      Notes: ${buildData.notes}
      
      Please provide:
      1. Suggestions for improving this build
      2. Alternative approaches or items to consider
      3. Playstyle notes and tips
      4. Any potential issues or weaknesses to address
      
      Be constructive and specific in your advice.
    `;

    return this.makeRequest(prompt);
  }

  // Enhance search queries with natural language processing
  async enhanceSearchQuery(query: string): Promise<AIResponse> {
    const prompt = `
      Analyze this Path of Exile search query and enhance it:
      
      Original Query: "${query}"
      
      Please:
      1. Suggest an enhanced search query
      2. Identify potential item types to search
      3. Suggest related search terms
      4. Provide context about what the user might be looking for
      
      Focus on making the search more effective and comprehensive.
    `;

    return this.makeRequest(prompt);
  }

  // Answer PoE-related questions
  async answerQuestion(question: string): Promise<AIResponse> {
    const systemPrompt = `You are a knowledgeable Path of Exile expert. Answer questions about PoE mechanics, items, builds, trading, and general gameplay. Be accurate, helpful, and concise. If you're not sure about something, say so rather than guessing.`;

    return this.makeRequest(question, systemPrompt);
  }

  // Generate build suggestions based on playstyle
  async suggestBuild(playstyle: string, preferences: string): Promise<AIResponse> {
    const prompt = `
      Suggest a Path of Exile build based on this playstyle and preferences:
      
      Playstyle: ${playstyle}
      Preferences: ${preferences}
      
      Please provide:
      1. A suggested character class and ascendancy
      2. Key items to aim for
      3. Skill gem recommendations
      4. Passive tree priorities
      5. Leveling tips
      
      Make the suggestions practical and achievable.
    `;

    return this.makeRequest(prompt);
  }
}

// Export a singleton instance
export const aiService = new AIService(); 