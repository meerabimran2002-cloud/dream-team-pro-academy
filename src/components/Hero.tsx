import { Sparkles, Calendar, Award, Users, Zap, GraduationCap, CheckCircle2 } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="glow-orb h-[420px] w-[420px] -top-32 -left-20" style={{ background: "var(--primary)" }} />
      <div className="glow-orb h-[380px] w-[380px] top-20 -right-24" style={{ background: "var(--accent)", animationDelay: "2s" }} />

      <div className="mx-auto max-w-6xl text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium tracking-wider uppercase animate-fade-up">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>{t.hero_kicker}</span>
        </div>

        <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] animate-fade-up">
          <span className="gradient-text">{t.hero_title}</span>
        </h1>

        <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground animate-fade-up">
          {t.hero_sub}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap animate-fade-up">
          <a
            href="#register"
            className="btn-3d btn-3d-hover px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide"
          >
            {t.hero_cta}
          </a>
          <a
            href="#curriculum"
            className="glass px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:scale-105 transition"
          >
            {t.hero_cta_2}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {[
            { icon: Calendar, label: t.start_date },
            { icon: Zap, label: t.live_online },
            { icon: Award, label: t.certificate },
            { icon: GraduationCap, label: t.practical },
            { icon: CheckCircle2, label: t.beginner },
            { icon: Users, label: t.limited },
          ].map((h, i) => (
            <div
              key={i}
              className="glass rounded-xl px-3 py-3 flex items-center gap-2 text-xs sm:text-sm justify-center hover:-translate-y-1 transition"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <h.icon className="h-4 w-4 text-primary shrink-0" />
              <span className="truncate">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
