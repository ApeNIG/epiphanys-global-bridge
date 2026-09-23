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
/** Optional shared secret, matching SHARED_SECRET in scripts/enquiry-form/Code.gs. */
const TOKEN = import.meta.env.VITE_ENQUIRY_TOKEN as string | undefined;

/** Google Apps Script web apps need a preflight-free request; see submitEnquiry.
 *  Detected from the URL, with VITE_ENQUIRY_MODE as an explicit override so the
 *  branch can be exercised against a local stand-in rather than only ever being
 *  run for the first time in production. */
const MODE = import.meta.env.VITE_ENQUIRY_MODE as string | undefined;
const isAppsScript = (url: string) =>
  MODE ? MODE === "apps-script" : url.includes("script.google.com");

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

/** Which route actually carried the enquiry. The dialog must not claim an
 *  enquiry was delivered when all that happened was a mail draft being opened,
 *  which the visitor still has to send and may never see if their machine has
 *  no mail client configured. */
export type SubmitResult = "stored" | "mail-draft";

export const hasBackend = (): boolean => Boolean(ENDPOINT);

export async function submitEnquiry(enquiry: Enquiry): Promise<SubmitResult> {
  if (ENDPOINT) {
    try {
      const res = isAppsScript(ENDPOINT)
        ? /* Apps Script answers no CORS preflight, so this MUST stay a
             "simple" request: text/plain, and no custom headers at all. Send
             it as application/json and the browser preflights, Google does not
             answer, and every submission fails with an opaque network error
             that looks like the site being broken. The body is still JSON; only
             the declared type differs, and Code.gs parses postData.contents. */
          await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ ...toRow(enquiry), token: TOKEN }),
            redirect: "follow",
          })
        : await fetch(ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Prefer: "return=minimal",
              ...(API_KEY ? { apikey: API_KEY, Authorization: `Bearer ${API_KEY}` } : {}),
            },
            body: JSON.stringify(toRow(enquiry)),
          });

      if (res.ok) {
        /* Apps Script answers 200 even when it rejected the submission, so a
           status code is not proof here: read the body it actually returned.
           Treating 200 as success would silently drop malformed enquiries. */
        if (isAppsScript(ENDPOINT)) {
          const parsed = await res.json().catch(() => null);
          if (parsed && parsed.ok === false) throw new Error(parsed.error || "rejected");
        }
        return "stored";
      }
    } catch {
      /* network error: fall through */
    }
    /* Fall through to the mail client rather than throwing: a failed backend
       should degrade to the old behaviour, not lose the enquiry. */
  }

  const href = buildMailto(enquiry);
  if (typeof window !== "undefined") {
    window.location.href = href;
    return "mail-draft";
  }
  throw new Error("no window to open a mail client with");
}
