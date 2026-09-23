/**
 * Epiphiny Flow — website contact form receiver.
 *
 * Google Apps Script bound to a Google Sheet. Receives a submission from the
 * "Contact us" form on epiphinyflow.com, appends it as a row, and emails
 * info@epiphinyflow.com so nobody has to remember to open the Sheet.
 *
 * Robert Croll, 2026-09-22: "have it linked to a database where we store their
 * details". A Sheet is the database here, deliberately: Rob can open, sort and
 * filter it in a tool he already uses, which is worth more than a table he
 * would need someone else to query.
 *
 * ── SETUP, once ──────────────────────────────────────────────────────────
 * 1. Create a Google Sheet, name it e.g. "Epiphiny Flow — website enquiries".
 * 2. Extensions → Apps Script. Delete the placeholder, paste this file.
 * 3. Run `setup` once from the editor. It creates the header row and asks for
 *    the permissions this needs (edit the Sheet, send mail as you). Approve.
 * 4. Deploy → New deployment → type "Web app".
 *       Execute as:        Me
 *       Who has access:    Anyone                 <-- required; the form is
 *                                                     public and unauthenticated
 * 5. Copy the /exec URL it gives you. In Vercel, set:
 *       VITE_ENQUIRY_ENDPOINT = <that /exec URL>
 *    and redeploy the site. No API key is needed or wanted here.
 *
 * ── WHY "Anyone" IS SAFE ENOUGH, AND WHERE IT IS NOT ────────────────────
 * The URL is unguessable but public, so anyone holding it can append rows.
 * Mitigations below: a honeypot field, a length cap, and a required-fields
 * check. What it does NOT stop is a determined person spamming the Sheet once
 * they have the URL. If that ever happens, redeploy to get a new URL, or add a
 * shared secret to SHARED_SECRET and to VITE_ENQUIRY_TOKEN on the site.
 * Nothing sensitive is readable through this endpoint: doGet is deliberately
 * inert, so the URL cannot be used to read back submissions.
 */

var NOTIFY_TO = 'info@epiphinyflow.com';
var SHEET_NAME = 'Enquiries';
var MAX_LEN = 5000; // per field, to stop a huge paste filling the Sheet
var SHARED_SECRET = ''; // optional; if set, submissions must carry it

var HEADERS = [
  'Received',
  'First name',
  'Surname',
  'Company',
  'Email',
  'Question',
  'Page',
  'User agent',
];

/** Run once from the editor to create the tab and header row. */
function setup() {
  var sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return 'ready: ' + sheet.getName();
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function clean_(v) {
  return String(v == null ? '' : v).trim().slice(0, MAX_LEN);
}

/**
 * Deliberately inert. A web app must expose doGet to deploy cleanly, but this
 * endpoint should never serve data: returning submissions here would make
 * every enquiry readable by anyone holding the URL.
 */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: 'This endpoint accepts POST only.' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Two browsers submitting at once must not write over the same row.
    lock.waitLock(20000);

    var body = {};
    try {
      body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    } catch (err) {
      return json_({ ok: false, error: 'bad json' });
    }

    if (SHARED_SECRET && body.token !== SHARED_SECRET) {
      return json_({ ok: false, error: 'unauthorised' });
    }

    // Honeypot: a real person never fills a field they cannot see.
    // Answer 200 so a bot cannot tell it was rejected.
    if (clean_(body.website)) {
      return json_({ ok: true });
    }

    var first = clean_(body.first_name);
    var last = clean_(body.last_name);
    var email = clean_(body.email);
    var question = clean_(body.question);

    if (!first || !last || !email || !question) {
      return json_({ ok: false, error: 'missing required fields' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json_({ ok: false, error: 'bad email' });
    }

    var company = clean_(body.company);
    var page = clean_(body.page_url);
    var agent = clean_(body.user_agent);
    var now = new Date();

    getSheet_().appendRow([now, first, last, company, email, question, page, agent]);

    // The Sheet is the record; the email is so somebody actually sees it.
    // A failure to send must NOT lose the row, hence the inner try.
    try {
      MailApp.sendEmail({
        to: NOTIFY_TO,
        subject: 'Website enquiry from ' + first + ' ' + last,
        replyTo: email,
        body:
          'A new enquiry was submitted on epiphinyflow.com.\n\n' +
          'Name:     ' + first + ' ' + last + '\n' +
          'Company:  ' + (company || '(not given)') + '\n' +
          'Email:    ' + email + '\n' +
          'Page:     ' + (page || '(unknown)') + '\n\n' +
          'Question:\n' + question + '\n\n' +
          '--\nStored in the enquiries Sheet. Reply directly to this email to answer them.',
      });
    } catch (mailErr) {
      // Row is already written; report success but record the mail failure.
      console.error('mail failed: ' + mailErr);
    }

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server error' });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignored) {}
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
