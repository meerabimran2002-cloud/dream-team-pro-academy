import { useT } from "@/lib/i18n";
import { GraduationCap, Sparkles, Trophy } from "lucide-react";

export function Founder() {
  const t = useT();
  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div className="glass rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
              <Sparkles className="h-4 w-4" /> {t.founder_title}
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold gradient-text">Meerab</h2>
            <p className="mt-2 text-muted-foreground">Founder · First-Year Student</p>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground/90">
              {t.founder_body}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="glass-strong rounded-2xl p-5">
                <Trophy className="h-6 w-6 text-primary" />
                <div className="mt-2 text-2xl font-bold">2+ Years</div>
                <div className="text-xs text-muted-foreground">Digital Skills Experience</div>
              </div>
              <div className="glass-strong rounded-2xl p-5">
                <GraduationCap className="h-6 w-6 text-accent" />
                <div className="mt-2 text-2xl font-bold">100%</div>
                <div className="text-xs text-muted-foreground">Practical Curriculum</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-2xl bg-primary relative overflow-hidden grid place-items-center">
            <div className="relative text-center px-8">
              <div className="text-7xl sm:text-9xl font-bold text-primary-foreground">DT</div>
              <div className="mt-2 uppercase tracking-[0.4em] text-xs text-primary-foreground/70">Dream Team Academy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
