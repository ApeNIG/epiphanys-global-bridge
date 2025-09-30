import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  full_name: string;
}

// Extract first name from full name
const getFirstName = (fullName: string): string => {
  const nameParts = fullName.trim().split(' ');
  return nameParts[0] || 'there';
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
    const { email, full_name }: WelcomeEmailRequest = await req.json();

    if (!email || !full_name) {
      return new Response(
        JSON.stringify({ error: 'Email and full name are required' }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    const firstName = getFirstName(full_name);
    console.log(`Sending welcome email to ${email} for ${full_name} (first name: ${firstName})`);

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "Epiphiny Flow <hello@epiphinyflow.com>",
      to: [email],
      subject: "Thank You for Joining Epiphiny Flow 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Welcome to Epiphiny Flow! 🚀
          </h1>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Hi <strong>${sanitizeHtml(firstName)}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Thank you for attending our event and signing up to the Epiphiny Flow Deal Flow Platform. 
            Your support and participation mean a lot as we work to build a powerful ecosystem that 
            connects entrepreneurs, investors, and partners to grow, scale, and boost opportunities 
            across the UK and beyond.
          </p>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #2563eb;">
            <p style="color: #1e40af; margin: 0; font-size: 16px; line-height: 1.6;">
              We'll be sharing updates, opportunities, and next steps with you soon. In the meantime, 
              we're excited to have you as part of this journey.
            </p>
          </div>

          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            If you have any questions or ideas, feel free to reach out to us directly — we'd love to hear from you.
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://epiphinyflow.com/dashboard" 
               style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">
              Explore the Platform
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            <strong>With gratitude,</strong><br>
            The Epiphiny Flow Team<br>
            <a href="mailto:robert@epiphinyflow.com" style="color: #2563eb; text-decoration: none;">robert@epiphinyflow.com</a>
          </p>

          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 30px;">
            You're receiving this email because you signed up to Epiphiny Flow.
          </p>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Welcome email sent successfully",
        emailId: emailResponse.data?.id
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
    console.error("Error in send-welcome-email function:", error);
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
