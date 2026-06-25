import { useRef, type ReactNode } from "react";

/** 3D mouse-tilt card. Lightweight, pointer-aware, no deps. */
export function Tilt3D({ children, className = "", max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100 + 50).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100 + 50).toFixed(1)}%`);
  }
  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`relative [transform-style:preserve-3d] [transform:perspective(900px)_rotateX(var(--rx,0))_rotateY(var(--ry,0))] transition-transform duration-200 ease-out ${className}`}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 28%, transparent), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
