import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BusinessInfo {
  industry: string;
  stage: string;
  target_market: string;
  objectives: string;
}

interface FrameworkSection {
  title: string;
  content: string;
  type: 'text' | 'checklist' | 'table' | 'template';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { framework_type, business_context, business_info } = await req.json();

    if (!framework_type || !business_context) {
      throw new Error('Framework type and business context are required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating framework:', { framework_type, context_length: business_context.length });

    const frameworkPrompts = {
      business_plan: `Create a comprehensive business plan framework including:
        - Executive Summary template
        - Market Analysis structure
        - Financial projections format
        - Marketing strategy outline
        - Operations plan
        - Risk assessment framework
        - Implementation timeline
        
        Provide specific templates, checklists, and detailed guidance for each section.`,
      
      content_strategy: `Create a complete content strategy framework including:
        - Content audit template
        - Content calendar structure
        - Brand voice guidelines
        - Content distribution strategy
        - Performance metrics framework
        - Content creation workflows
        - Engagement optimization tactics
        
        Include practical templates and actionable checklists.`,
      
      investment_proposal: `Create a professional investment proposal framework including:
        - Executive summary template
        - Problem and solution framework
        - Market opportunity analysis
        - Business model canvas
        - Financial model structure
        - Funding requirements breakdown
        - ROI projections
        - Risk mitigation strategies
        
        Provide investor-ready templates and presentation structures.`,
      
      marketing_plan: `Create a strategic marketing plan framework including:
        - Market research template
        - Customer persona development
        - Competitive analysis framework
        - Marketing mix strategy (4Ps/7Ps)
        - Digital marketing roadmap
        - Campaign planning templates
        - Budget allocation framework
        - Performance tracking system
        
        Include practical implementation guides and measurement frameworks.`,
      
      team_structure: `Create an organizational and operations framework including:
        - Organizational chart template
        - Role and responsibility matrix
        - Hiring plan framework
        - Performance management system
        - Communication protocols
        - Operational workflow maps
        - Team development strategies
        - Culture and values framework
        
        Provide actionable templates for team building and operations.`
    };

    const systemPrompt = `You are an expert business strategist and framework designer. Your task is to create comprehensive, actionable business frameworks that provide real value to entrepreneurs and business professionals.

    For the framework type "${framework_type}", create a detailed framework that includes:
    1. A comprehensive overview and introduction
    2. Specific sections with practical templates and examples
    3. Actionable checklists and step-by-step guides
    4. Industry-specific recommendations when relevant
    5. Estimated completion times and difficulty levels
    6. Key deliverables and success metrics

    Format your response as a JSON object with this structure:
    {
      "framework": "Main framework overview and introduction",
      "sections": [
        {
          "title": "Section name",
          "content": "Detailed content with templates and examples",
          "type": "text|checklist|table|template"
        }
      ],
      "framework_type": "${framework_type}",
      "metadata": {
        "estimated_completion_time": "time estimate",
        "difficulty_level": "Beginner|Intermediate|Advanced",
        "key_deliverables": ["deliverable 1", "deliverable 2"]
      }
    }

    Make it practical, actionable, and tailored to the specific business context provided.`;

    const userPrompt = `${frameworkPrompts[framework_type as keyof typeof frameworkPrompts] || frameworkPrompts.business_plan}

    Business Context: ${business_context}

    Please create a comprehensive framework that addresses the specific needs and context of this business. Include practical templates, checklists, and actionable guidance that can be immediately implemented.`;

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
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 4000,
        temperature: 0.3,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const completion = data.choices[0].message.content;

    let frameworkResult;
    try {
      frameworkResult = JSON.parse(completion);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      // Fallback to text format
      frameworkResult = {
        framework: completion,
        sections: [],
        framework_type,
        metadata: {
          estimated_completion_time: "2-4 weeks",
          difficulty_level: "Intermediate",
          key_deliverables: ["Comprehensive framework document"]
        }
      };
    }

    console.log('Framework generated successfully');

    return new Response(JSON.stringify(frameworkResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in framework generation:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});