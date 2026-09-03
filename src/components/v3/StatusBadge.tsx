/**
 * The site's development-state language, as a component rather than small print.
 *
 * The challenger's third ranked fix: "Introduce a visible status language
 * sitewide: what exists, what is in development, what is prospective. Make
 * development state part of the design rather than legalistic small print."
 * Its diagnosis was that the site "gives facts, ambitions, processes and
 * nonexistent products the same visual treatment", which makes everything look
 * equally credible and therefore nothing credible.
 *
 * Three states only. If a fourth is ever needed, it is probably a wording
 * problem rather than a missing state.
 */
export type Status = "live" | "development" | "prospective";

const STATES: Record<Status, { label: string; dot: string; text: string; ring: string }> = {
  live: {
    label: "Live",
    dot: "#00E7C3",
    text: "#0F8F79",
    ring: "rgba(0, 231, 195, 0.35)",
  },
  development: {
    label: "In development",
    dot: "#8B5CF6",
    text: "#6D3FD4",
    ring: "rgba(139, 92, 246, 0.32)",
  },
  prospective: {
    label: "Prospective, not yet live",
    dot: "#8B5CF6",
    text: "#6D3FD4",
    ring: "rgba(139, 92, 246, 0.32)",
  },
};

const StatusBadge = ({
  status,
  label,
  className = "",
}: {
  status: Status;
  /** Override the default wording where a page needs to be more specific. */
  label?: string;
  className?: string;
}) => {
  const s = STATES[status];
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border pl-3 pr-4 py-1.5 text-[10px] font-semibold tracking-[2px] uppercase ${className}`}
      style={{ borderColor: s.ring, color: s.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: s.dot }}
      />
      {label ?? s.label}
    </span>
  );
};

export default StatusBadge;
