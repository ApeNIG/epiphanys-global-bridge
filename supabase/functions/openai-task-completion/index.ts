import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, task_type = 'general', max_tokens = 1000 } = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Processing task:', { task_type, prompt_length: prompt.length });

    const systemPrompts = {
      general: 'You are a helpful assistant that completes tasks efficiently.',
      business_plan: 'You are a business strategy expert. Help create comprehensive business plans and analyze market opportunities.',
      content_creation: 'You are a content creation specialist. Help create engaging, professional content for various platforms.',
      data_analysis: 'You are a data analyst. Help interpret data and provide actionable insights.',
      proposal_writing: 'You are a proposal writing expert. Help create compelling, professional proposals.',
      market_research: 'You are a market research specialist. Help analyze markets, competitors, and opportunities.'
    };

    const systemPrompt = systemPrompts[task_type as keyof typeof systemPrompts] || systemPrompts.general;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const completion = data.choices[0].message.content;

    console.log('Task completed successfully');

    return new Response(JSON.stringify({ 
      completion,
      usage: data.usage,
      task_type 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in task completion:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});