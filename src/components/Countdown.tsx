import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

const TARGET = new Date("2026-07-10T09:00:00").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(diff());
  const i18n = useT();
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: t.d, l: i18n.cd_days },
    { v: t.h, l: i18n.cd_hours },
    { v: t.m, l: i18n.cd_minutes },
    { v: t.s, l: i18n.cd_seconds },
  ];

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-center gap-2 mb-5 text-xs uppercase tracking-widest text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span>{i18n.cd_title}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {items.map((it, i) => (
            <div key={i} className="glass rounded-xl px-2 py-4 sm:py-6 text-center">
              <div className="text-3xl sm:text-5xl font-bold gradient-text tabular-nums">
                {String(it.v).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
                {it.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
