import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const show = progress > 0.08;
  const pct = Math.round(progress * 100);
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);

  return (
    <>
      {/* Top page progress bar */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, var(--primary), var(--accent), var(--primary-glow))",
          transition: "transform 120ms linear",
          boxShadow: "0 0 12px color-mix(in oklab, var(--primary) 60%, transparent)",
        }}
      />

      {/* Floating scroll-to-top with progress ring */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={`Scroll to top — ${pct}% read`}
        className={`fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full grid place-items-center transition-all duration-300 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 60 60">
          <circle
            cx="30" cy="30" r={r}
            fill="none"
            stroke="color-mix(in oklab, var(--foreground) 12%, transparent)"
            strokeWidth="3"
          />
          <circle
            cx="30" cy="30" r={r}
            fill="none"
            stroke="url(#scrollGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
          <defs>
            <linearGradient id="scrollGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="h-10 w-10 rounded-full btn-3d grid place-items-center">
          <ArrowUp className="h-4 w-4" />
        </span>
      </button>
    </>
  );
}
