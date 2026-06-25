import { Users, Star, BookOpen, Trophy } from "lucide-react";
import { useT } from "@/lib/i18n";

export function StatsBar() {
  const t = useT();
  const stats = [
    { icon: Users, v: "500+", l: t.stat_students },
    { icon: BookOpen, v: "20+", l: t.stat_lessons },
    { icon: Star, v: "4.9", l: t.stat_rating },
    { icon: Trophy, v: "100%", l: t.stat_certified },
  ];
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1 transition">
            <div className="h-11 w-11 rounded-xl btn-3d grid place-items-center shrink-0">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
