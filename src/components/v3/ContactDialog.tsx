import { useEffect, useRef, useState } from "react";
import { X, Send, Check } from "lucide-react";
import {
  submitEnquiry,
  buildMailto,
  type Enquiry,
  type SubmitResult,
} from "@/lib/submitEnquiry";

/**
 * Contact enquiry dialog, Robert Croll's instruction of 2026-09-22: turn the
 * "Contact us" button into "an information box" capturing first name and
 * surname, company name, email address and a question, stored somewhere.
 *
 * WHY THIS IS NOT WIRED TO A DATABASE YET, recorded here so the next person
 * does not go looking for one. The Supabase project this repo points at,
 * `wtrqojsqscnloymlwwpw`, NO LONGER EXISTS: that hostname returns NXDOMAIN
 * from 1.1.1.1 while supabase.co itself resolves. So there is currently no
 * store to insert into and no Resend key to send with, and provisioning either
 * needs account access this build does not have.
 *
 * Rather than ship a form that silently fails, submission goes through
 * `submitEnquiry`, which uses a backend when one is configured and otherwise
 * falls back to composing the same message as an email. The visitor always
 * gets their enquiry sent; only the storage half waits on an account. When a
 * backend exists, that one file changes and this component does not.
 */

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-[#15171A] " +
  "placeholder:text-gray-400 outline-none transition-colors focus:border-[#2A9D8F] " +
  "focus:ring-2 focus:ring-[#00E7C3]/25";

const LABEL =
  "block text-[11px] font-semibold tracking-[1.5px] uppercase text-gray-500 mb-2";

const ContactDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [form, setForm] = useState<Enquiry>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    question: "",
  });
  /* Honeypot. A public form with no protection collects bot spam from the day
     it ships. Named plausibly and hidden from sight but NOT with display:none,
     which some bots check for; it is taken out of the layout and out of the
     accessibility tree instead. */
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [route, setRoute] = useState<SubmitResult>("stored");
  const [errors, setErrors] = useState<Partial<Record<keyof Enquiry, string>>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    /* Move focus into the dialog so a keyboard user is not left behind on the
       page underneath. */
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const set = (k: keyof Enquiry) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const next: Partial<Record<keyof Enquiry, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Please add your first name";
    if (!form.lastName.trim()) next.lastName = "Please add your surname";
    /* Deliberately permissive: a shape check, not an attempt to decide which
       addresses are real. Over-strict patterns reject valid addresses, and the
       only real test of an address is sending to it. */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please add an email address we can reply to";
    if (!form.question.trim()) next.question = "Please tell us how we can help";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // honeypot filled: a bot. Pretend success, store nothing.
    if (!validate()) return;
    setStatus("sending");
    try {
      setRoute(await submitEnquiry(form));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
    >
      <div
        className="absolute inset-0 bg-[#0A1628]/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-[560px] max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[#F5F0E8] shadow-[0_40px_120px_-40px_rgba(10,22,40,0.7)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-[#15171A]" />
        </button>

        <div className="p-6 md:p-9">
          {status === "sent" ? (
            <div className="py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#00E7C3]/15 flex items-center justify-center mx-auto mb-5">
                <Check className="w-6 h-6 text-[#2A9D8F]" />
              </div>
              {/* The wording MUST follow the route actually taken. Until a
                  backend exists, all that has happened is that a mail draft was
                  opened, which the visitor still has to send — and on a machine
                  with no mail client configured, nothing happens at all. Saying
                  "on its way" in that case is simply untrue, and it is the one
                  respect in which this would be worse than the plain mailto
                  link it replaced. */}
              <h2
                id="contact-dialog-title"
                className="font-serif text-[26px] text-[#15171A] mb-3"
              >
                {route === "stored" ? "Thank you" : "One last step"}
              </h2>
              {route === "stored" ? (
                <p className="text-[15px] text-gray-600 leading-[1.7] max-w-[380px] mx-auto">
                  Your enquiry is on its way to the Epiphiny Flow team. We aim to
                  come back to you within a few working days.
                </p>
              ) : (
                <div className="text-[15px] text-gray-600 leading-[1.7] max-w-[420px] mx-auto">
                  <p>
                    We have opened your email app with your enquiry ready to go.{" "}
                    <strong className="text-[#15171A]">
                      Please press send there to reach us.
                    </strong>
                  </p>
                  <p className="mt-4 text-[14px]">
                    Nothing happened? Your device may not have an email app set
                    up. You can{" "}
                    <a
                      href={buildMailto(form)}
                      className="underline font-medium text-[#2A9D8F] hover:text-[#15171A]"
                    >
                      try again
                    </a>{" "}
                    or email us directly at{" "}
                    <a
                      href="mailto:info@epiphinyflow.com"
                      className="underline font-medium text-[#2A9D8F] hover:text-[#15171A]"
                    >
                      info@epiphinyflow.com
                    </a>
                    .
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                className="mt-7 inline-flex items-center gap-2 bg-[#15171A] text-white text-[15px] font-medium px-6 py-3 rounded-full hover:bg-[#2A9D8F] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-[2px] bg-[#00E7C3]" />
                <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                  Contact us
                </span>
              </div>
              <h2
                id="contact-dialog-title"
                className="font-serif text-[clamp(1.6rem,4vw,2.1rem)] text-[#15171A] leading-[1.2] mb-3"
              >
                How can we help?
              </h2>
              <p className="text-[15px] text-gray-600 leading-[1.7] mb-7">
                Tell us a little about you and what you are looking for, and the
                right person will come back to you.
              </p>

              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Field
                    id="firstName"
                    label="First name"
                    value={form.firstName}
                    onChange={set("firstName")}
                    error={errors.firstName}
                    inputRef={firstFieldRef}
                    autoComplete="given-name"
                  />
                  <Field
                    id="lastName"
                    label="Surname"
                    value={form.lastName}
                    onChange={set("lastName")}
                    error={errors.lastName}
                    autoComplete="family-name"
                  />
                </div>

                <div className="mb-4">
                  <Field
                    id="company"
                    label="Company name"
                    optional
                    value={form.company}
                    onChange={set("company")}
                    autoComplete="organization"
                  />
                </div>

                <div className="mb-4">
                  <Field
                    id="email"
                    label="Email address"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                    autoComplete="email"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="question" className={LABEL}>
                    Your question
                  </label>
                  <textarea
                    id="question"
                    rows={5}
                    value={form.question}
                    onChange={(e) => set("question")(e.target.value)}
                    aria-invalid={!!errors.question}
                    aria-describedby={errors.question ? "question-error" : undefined}
                    className={`${FIELD} resize-y min-h-[120px] ${
                      errors.question ? "border-red-400" : ""
                    }`}
                  />
                  {errors.question && (
                    <p id="question-error" className="mt-2 text-[13px] text-red-600">
                      {errors.question}
                    </p>
                  )}
                </div>

                {/* Honeypot: off-screen, not display:none, and hidden from AT. */}
                <div
                  aria-hidden="true"
                  className="absolute w-px h-px overflow-hidden -left-[9999px]"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {status === "error" && (
                  <p className="mt-4 text-[14px] text-red-600 leading-[1.6]">
                    Something went wrong sending that. Please email{" "}
                    <a
                      href="mailto:info@epiphinyflow.com"
                      className="underline font-medium"
                    >
                      info@epiphinyflow.com
                    </a>{" "}
                    and we will pick it up.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#15171A] text-white text-[15px] font-medium px-7 py-3.5 rounded-full hover:bg-[#2A9D8F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>

                <p className="mt-5 text-[13px] text-gray-500 leading-[1.6]">
                  We use your details only to answer your enquiry. See our{" "}
                  <a href="/privacy" className="underline hover:text-[#15171A]">
                    privacy policy
                  </a>
                  .
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  optional,
  inputRef,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoComplete?: string;
}) => (
  <div>
    <label htmlFor={id} className={LABEL}>
      {label}
      {optional && <span className="normal-case tracking-normal font-normal text-gray-400"> (optional)</span>}
    </label>
    <input
      id={id}
      ref={inputRef}
      type={type}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${FIELD} ${error ? "border-red-400" : ""}`}
    />
    {error && (
      <p id={`${id}-error`} className="mt-2 text-[13px] text-red-600">
        {error}
      </p>
    )}
  </div>
);

export default ContactDialog;
