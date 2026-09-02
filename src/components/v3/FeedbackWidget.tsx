import { useState, useEffect, useRef } from "react";
import { MessageSquarePlus, X, Send, Check } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * Persistent site-wide feedback widget.
 * A subtle tab (bottom-left, to avoid the AI chatbot bottom-right) that lets
 * the client leave detailed feedback from any page. Captures the current page
 * automatically so there's no ambiguity about what a note refers to.
 *
 * Backend: submits to the `site_feedback` Supabase table (insert-only RLS).
 * NOTE: that table + an auto-email notifier still need to be provisioned on the
 * epiphinyflow Supabase project (pending account access). Until then, submits
 * will error and the catch below surfaces a friendly toast.
 */
const FeedbackWidget = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = async () => {
    if (!message.trim()) {
      toast({
        title: "Add a note first",
        description: "Tell us what you'd like changed and we'll take a look.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from("site_feedback").insert({
        page_path: location.pathname,
        page_url: typeof window !== "undefined" ? window.location.href : location.pathname,
        name: name.trim() || null,
        message: message.trim(),
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
      if (error) throw error;
      setSent(true);
      setMessage("");
      setName("");
      toast({
        title: "Thanks, feedback sent",
        description: "We've logged it against this page and will review it.",
      });
      setTimeout(() => {
        setSent(false);
        setOpen(false);
      }, 1400);
    } catch (err: any) {
      toast({
        title: "Couldn't send that",
        description: "Please try again in a moment, or email info@epiphinyflow.com.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-[90] print:hidden">
      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="mb-3 w-[320px] max-w-[calc(100vw-40px)] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
          role="dialog"
          aria-label="Send feedback"
        >
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#00E7C3]/15 flex items-center justify-center">
                <MessageSquarePlus className="w-4 h-4 text-[#0aa58c]" />
              </span>
              <span className="font-semibold text-[14px] text-[#15171A]">Share feedback</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close feedback"
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-5 py-4">
            <p className="text-[12.5px] text-gray-500 leading-[1.6] mb-3">
              Spotted something to change on this page? Tell us in as much detail as you like.
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full mb-2.5 rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-[#15171A] placeholder:text-gray-400 focus:outline-none focus:border-[#00E7C3] focus:ring-1 focus:ring-[#00E7C3]/40"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What would you like changed?"
              rows={4}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-[#15171A] placeholder:text-gray-400 leading-[1.6] resize-none focus:outline-none focus:border-[#00E7C3] focus:ring-1 focus:ring-[#00E7C3]/40"
            />
            <div className="mt-1.5 text-[10.5px] text-gray-400 truncate">
              On: {location.pathname}
            </div>
            <button
              type="button"
              onClick={submit}
              disabled={sending || sent}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#15171A] text-white py-2.5 text-[13px] font-semibold hover:bg-[#2a2d32] disabled:opacity-60 transition-colors"
            >
              {sent ? (
                <>
                  <Check className="w-4 h-4 text-[#00E7C3]" /> Sent
                </>
              ) : sending ? (
                "Sending..."
              ) : (
                <>
                  Send feedback <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Trigger tab */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Send feedback"
        className="inline-flex items-center gap-2 rounded-full bg-[#15171A] text-white pl-4 pr-5 py-2.5 text-[13px] font-semibold shadow-lg hover:bg-[#2a2d32] transition-colors"
      >
        <MessageSquarePlus className="w-4 h-4 text-[#00E7C3]" />
        Feedback
      </button>
    </div>
  );
};

export default FeedbackWidget;
