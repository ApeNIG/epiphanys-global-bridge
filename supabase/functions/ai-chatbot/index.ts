import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation constants
const MAX_MESSAGE_LENGTH = 2000;
const MAX_CONVERSATION_HISTORY = 20;
const MAX_HISTORY_MESSAGE_LENGTH = 1000;

// Rate limiting using in-memory store (resets on function restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function getRateLimitKey(req: Request): string {
  // Use IP address or a combination of headers for rate limiting
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  record.count++;
  return { allowed: true };
}

function sanitizeMessage(message: string): string {
  if (typeof message !== 'string') return '';
  return message.trim().slice(0, MAX_MESSAGE_LENGTH);
}

function validateConversationHistory(history: unknown): { role: string; content: string }[] {
  if (!Array.isArray(history)) return [];
  
  return history
    .slice(-MAX_CONVERSATION_HISTORY)
    .filter((msg): msg is { role: string; content: string } => {
      return (
        typeof msg === 'object' &&
        msg !== null &&
        typeof msg.role === 'string' &&
        typeof msg.content === 'string' &&
        ['user', 'assistant'].includes(msg.role)
      );
    })
    .map(msg => ({
      role: msg.role,
      content: msg.content.trim().slice(0, MAX_HISTORY_MESSAGE_LENGTH)
    }));
}

const systemPrompt = `You are an AI assistant for a world-leading digital platform that connects businesses, organisations, and individuals with public and private sector opportunities in business, careers, investment, and global collaboration. The platform has a strong focus on serving diaspora communities in the UK.

Key platform features include:
- Business opportunities and partnerships
- Career opportunities and professional networking
- Investment opportunities and deal flow
- Global collaboration and cultural connections
- Professional profiles and networking
- Connection requests between users
- Advisory services and consultation
- Goals tracking and achievement

Your role is to:
1. Answer questions about the platform and its features
2. Provide helpful recommendations based on user needs
3. Consultatively guide users toward relevant features
4. Encourage sign-up when appropriate, but in a natural, helpful way
5. Focus on the value proposition for diaspora communities and professionals

Guidelines:
- Be conversational, helpful, and professional
- Understand that users may be entrepreneurs, professionals, investors, or organizations
- Highlight how the platform can help with their specific goals
- Suggest relevant features based on their interests
- When appropriate, mention that creating an account unlocks more features
- Keep responses concise but informative
- Focus on opportunities, connections, and growth

Always be consultative - ask follow-up questions to better understand their needs and provide more targeted recommendations.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(req);
    const rateLimitResult = checkRateLimit(rateLimitKey);
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for ${rateLimitKey}`);
      return new Response(JSON.stringify({ 
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter
      }), {
        status: 429,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimitResult.retryAfter)
        },
      });
    }

    const body = await req.json();
    const message = sanitizeMessage(body.message);
    const conversationHistory = validateConversationHistory(body.conversationHistory);

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing chatbot request:', { 
      messageLength: message.length, 
      historyLength: conversationHistory.length 
    });

    // Build conversation context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: botResponse,
      suggestions: generateSuggestions(message)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chatbot function:', error);
    return new Response(JSON.stringify({ 
      error: 'Sorry, I encountered an error. Please try again.',
      response: "I'm here to help you discover opportunities and connect with the right people on our platform. What would you like to know about?"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSuggestions(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const suggestions = [];

  if (lowerMessage.includes('business') || lowerMessage.includes('opportunity')) {
    suggestions.push("Explore business opportunities");
  }
  if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
    suggestions.push("Find career opportunities");
  }
  if (lowerMessage.includes('invest') || lowerMessage.includes('funding')) {
    suggestions.push("Discover investment opportunities");
  }
  if (lowerMessage.includes('network') || lowerMessage.includes('connect')) {
    suggestions.push("Build your network");
  }
  if (lowerMessage.includes('diaspora') || lowerMessage.includes('community')) {
    suggestions.push("Join the diaspora community");
  }

  // Default suggestions if none match
  if (suggestions.length === 0) {
    suggestions.push("Tell me about your goals", "Explore opportunities", "Learn about networking");
  }

  return suggestions.slice(0, 3);
}
