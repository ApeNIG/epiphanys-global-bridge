/**
 * Where a contact enquiry goes.
 *
 * This is the ONLY file that needs to change when a backend exists. The dialog
 * calls submitEnquiry() and knows nothing about how it is delivered.
 *
 * CURRENT STATE, 2026-09-23. There is no backend. The Supabase project this
 * repo is configured against, `wtrqojsqscnloymlwwpw`, does not exist any more:
 *
 *     nslookup wtrqojsqscnloymlwwpw.supabase.co 1.1.1.1
 *       -> Non-existent domain      (supabase.co itself resolves fine)
 *
 * so there is nothing to insert into, and the Resend key used by
 * supabase/functions/send-consultation-email lived in that same project.
 * Robert Croll asked for submissions stored in a database "if possible";
 * storing them is blocked on provisioning a project, which needs account
 * access.
 *
 * Until then this composes the enquiry as an email and hands it to the
 * visitor's mail client, which is exactly what the "Contact us" button did
 * before, except the visitor is now prompted for the details Rob asked for
 * instead of facing an empty message. Nothing is silently dropped.
 *
 * TO WIRE A BACKEND: set VITE_ENQUIRY_ENDPOINT to a URL that accepts a JSON
 * POST. The mail fallback then only runs if that call fails, so a backend
 * outage still cannot swallow an enquiry.
 *
 * For Supabase specifically the endpoint is the table's REST URL and no
 * serverless function is needed:
 *
 *   VITE_ENQUIRY_ENDPOINT = https://<ref>.supabase.co/rest/v1/contact_submissions
 *   VITE_ENQUIRY_API_KEY  = the project's anon/publishable key
 *
 * Two details that would otherwise make that fail silently, both handled
 * below: PostgREST needs the key on BOTH the apikey and Authorization headers,
 * and the JSON keys must match the column names, which are snake_case in
 * supabase/sql/contact_submissions.sql while this type is camelCase.
 */

export type Enquiry = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  question: string;
};

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;
const API_KEY = import.meta.env.VITE_ENQUIRY_API_KEY as string | undefined;

/** Column names, not field names. See supabase/sql/contact_submissions.sql. */
export const toRow = (e: Enquiry) => ({
  first_name: e.firstName.trim(),
  last_name: e.lastName.trim(),
  company: e.company.trim() || null,
  email: e.email.trim(),
  question: e.question.trim(),
  page_url: typeof window !== "undefined" ? window.location.href : null,
  user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
});

export const buildMailto = (e: Enquiry): string => {
  const name = `${e.firstName.trim()} ${e.lastName.trim()}`.trim();
  const subject = `Website enquiry from ${name}`;
  const body = [
    `Name: ${name}`,
    `Company: ${e.company.trim() || "(not given)"}`,
    `Email: ${e.email.trim()}`,
    "",
    "Question:",
    e.question.trim(),
  ].join("\n");
  return `mailto:info@epiphinyflow.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

export async function submitEnquiry(enquiry: Enquiry): Promise<void> {
  if (ENDPOINT) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      };
      if (API_KEY) {
        headers.apikey = API_KEY;
        headers.Authorization = `Bearer ${API_KEY}`;
      }
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify(toRow(enquiry)),
      });
      if (res.ok) return;
    } catch {
      /* network error: fall through */
    }
    /* Fall through to the mail client rather than throwing: a failed backend
       should degrade to the old behaviour, not lose the enquiry. */
  }

  const href = buildMailto(enquiry);
  if (typeof window !== "undefined") {
    window.location.href = href;
    return;
  }
  throw new Error("no window to open a mail client with");
}
