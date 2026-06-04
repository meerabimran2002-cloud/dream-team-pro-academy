import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionHead } from "./Curriculum";

const faqs = [
  { q: "Do I need any prior experience?", a: "No. The course is beginner-friendly and we cover everything from zero up to advanced workflows." },
  { q: "Are classes recorded?", a: "Yes, all live sessions are recorded and uploaded to your private dashboard for lifetime access." },
  { q: "Will I get a certificate?", a: "Yes — every student who completes the final project gets a verified Dream Team certificate." },
  { q: "What's the schedule?", a: "Classes start 10 July with multiple live sessions per week. Exact timings will be shared after enrollment." },
  { q: "Can I get a refund?", a: "We offer a 3-day no-questions refund window after the first class." },
  { q: "Is there mentorship?", a: "Yes — direct mentor access via WhatsApp + group Q&A during the cohort." },
];

export function FAQ() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHead kicker="FAQ" title={t.faq_title} body="" />
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={`h-5 w-5 transition ${open === i ? "rotate-180 text-primary" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground animate-fade-up">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
