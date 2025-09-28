import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Initialize Supabase client for JWT verification
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  organization_type: string;
  industry_focus: string;
  consultation_goals: string;
  current_challenges: string;
  budget_range: string;
  timeframe: string;
  hear_about_us?: string;
}

// Input validation function
const validateConsultationRequest = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Required fields validation
  const requiredFields = ['full_name', 'email', 'phone', 'company', 'position', 'organization_type', 'industry_focus', 'consultation_goals', 'current_challenges', 'budget_range', 'timeframe'];
  
  for (const field of requiredFields) {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim().length === 0) {
      errors.push(`${field} is required and must be a non-empty string`);
    }
  }
  
  // Email validation
  if (data.email && typeof data.email === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }
  
  // Length validation
  const maxLengths = {
    full_name: 100,
    email: 255,
    phone: 20,
    company: 100,
    position: 100,
    organization_type: 50,
    industry_focus: 100,
    consultation_goals: 1000,
    current_challenges: 1000,
    budget_range: 50,
    timeframe: 50,
    hear_about_us: 200
  };
  
  for (const [field, maxLength] of Object.entries(maxLengths)) {
    if (data[field] && typeof data[field] === 'string' && data[field].length > maxLength) {
      errors.push(`${field} must be less than ${maxLength} characters`);
    }
  }
  
  // Sanitize and check for suspicious content
  for (const field of Object.keys(data)) {
    if (typeof data[field] === 'string') {
      if (data[field].includes('<script>') || data[field].includes('javascript:') || data[field].includes('data:')) {
        errors.push(`${field} contains potentially unsafe content`);
      }
    }
  }
  
  return { isValid: errors.length === 0, errors };
};

// HTML sanitization function
const sanitizeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input data
    const { isValid, errors } = validateConsultationRequest(rawData);
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: errors }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    const consultationData: ConsultationRequest = rawData;
    console.log("Received consultation request:", consultationData);

    // Send notification email to Robert
    const emailResponse = await resend.emails.send({
      from: "Epiphiny Flow <notifications@epiphinyflow.com>",
      to: ["robert@epiphinyflow.com"],
      subject: `New Consultation Request from ${consultationData.full_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Consultation Request
          </h1>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Contact Information</h2>
            <p><strong>Name:</strong> ${sanitizeHtml(consultationData.full_name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizeHtml(consultationData.email)}">${sanitizeHtml(consultationData.email)}</a></p>
            <p><strong>Phone:</strong> ${sanitizeHtml(consultationData.phone)}</p>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Organization Details</h2>
            <p><strong>Company:</strong> ${sanitizeHtml(consultationData.company)}</p>
            <p><strong>Position:</strong> ${sanitizeHtml(consultationData.position)}</p>
            <p><strong>Organization Type:</strong> ${sanitizeHtml(consultationData.organization_type)}</p>
            <p><strong>Industry Focus:</strong> ${sanitizeHtml(consultationData.industry_focus)}</p>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Consultation Details</h2>
            <p><strong>Goals:</strong></p>
            <p style="background-color: white; padding: 10px; border-left: 4px solid #2563eb; margin: 10px 0;">
              ${sanitizeHtml(consultationData.consultation_goals)}
            </p>
            
            <p><strong>Current Challenges:</strong></p>
            <p style="background-color: white; padding: 10px; border-left: 4px solid #2563eb; margin: 10px 0;">
              ${sanitizeHtml(consultationData.current_challenges)}
            </p>
            
            <p><strong>Budget Range:</strong> ${sanitizeHtml(consultationData.budget_range)}</p>
            <p><strong>Timeframe:</strong> ${sanitizeHtml(consultationData.timeframe)}</p>
            ${consultationData.hear_about_us ? `<p><strong>How they heard about us:</strong> ${sanitizeHtml(consultationData.hear_about_us)}</p>` : ''}
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${sanitizeHtml(consultationData.email)}?subject=Re: Consultation Request"
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
               Reply to ${sanitizeHtml(consultationData.full_name)}
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            This consultation request was submitted through the Epiphiny Flow website.
          </p>
        </div>
      `,
    });

    console.log("Notification email sent to Robert:", emailResponse);

    // Send confirmation email to the user
    const confirmationResponse = await resend.emails.send({
      from: "Epiphiny Flow <hello@epiphinyflow.com>",
      to: [consultationData.email],
      subject: "Thank you for your consultation request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Thank you for your consultation request!
          </h1>
          
          <p>Dear ${sanitizeHtml(consultationData.full_name)},</p>
          
          <p>Thank you for reaching out to Epiphiny Flow. We have received your consultation request and our team will review it shortly.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
            <ul style="color: #374151;">
              <li>Our team will review your request within 24 hours</li>
              <li>We'll reach out to schedule a consultation call at your convenience</li>
              <li>We'll prepare a customized discussion based on your goals and challenges</li>
            </ul>
          </div>

          <p>In the meantime, feel free to explore our platform and resources. If you have any urgent questions, please don't hesitate to contact us directly.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://epiphinyflow.com" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit Our Platform
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            The Epiphiny Flow Team<br>
            <a href="mailto:robert@epiphinyflow.com">robert@epiphinyflow.com</a>
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent to user:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Consultation request submitted successfully",
        notificationSent: !!emailResponse.data,
        confirmationSent: !!confirmationResponse.data
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-consultation-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);