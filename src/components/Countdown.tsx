import { CheckCircle2, Sparkles, Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Countdown() {
  const t = useT();

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-center gap-2 mb-6 text-xs uppercase tracking-widest text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span>{t.cd_title}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="glass rounded-xl p-5 flex items-start gap-3 opacity-80">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Batch 1</div>
              <div className="mt-1 font-semibold text-sm sm:text-base">{t.batch1_status}</div>
            </div>
          </div>
          <div className="glass rounded-xl p-5 flex items-start gap-3 ring-1 ring-primary/30">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5 animate-pulse" />
            <div>
              <div className="text-xs uppercase tracking-widest text-primary">Batch 2</div>
              <div className="mt-1 font-semibold text-sm sm:text-base gradient-text">{t.batch2_status}</div>
              <a href="#register" className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline">
                Reserve seat →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
