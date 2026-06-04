import { useT } from "@/lib/i18n";
import { BookOpen, MessageSquareCode, Wand2, Briefcase, Brain, Rocket, ShieldCheck, Star } from "lucide-react";

const modules = [
  { icon: Brain, title: "Foundations of AI & LLMs", body: "How GPT, Claude, and Gemini actually work — context, tokens, temperature." },
  { icon: MessageSquareCode, title: "Prompt Patterns", body: "Role, context, examples, chain-of-thought, ReAct, structured output." },
  { icon: Wand2, title: "Advanced Prompting", body: "Multi-turn workflows, system prompts, prompt chaining, guardrails." },
  { icon: BookOpen, title: "AI for Content & Study", body: "Writing, research, summarization, study assistants, language learning." },
  { icon: Briefcase, title: "Freelancing with AI", body: "Real client offers — Fiverr, Upwork, LinkedIn. Pricing, niches, delivery." },
  { icon: Rocket, title: "Build Your AI Portfolio", body: "Ship 3 mini-projects. Custom GPTs, automations, branded prompt packs." },
];

const benefits = [
  { icon: ShieldCheck, t: "Certificate of Completion", d: "Verified PDF certificate after final project." },
  { icon: Star, t: "Lifetime Access", d: "All recordings, prompt library, templates — forever." },
  { icon: Brain, t: "1-on-1 Mentorship", d: "Direct WhatsApp + Zoom support during cohort." },
  { icon: Rocket, t: "Career Launchpad", d: "Resume + Fiverr gig review by mentors." },
];

export function Curriculum() {
  const t = useT();
  return (
    <section id="curriculum" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Curriculum" title={t.curriculum_title} body={t.why_body} />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:-translate-y-2 transition group">
              <div className="h-11 w-11 rounded-xl btn-3d grid place-items-center">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.body}</p>
              <div className="mt-4 text-xs uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition">
                Module 0{i + 1}
              </div>
            </div>
          ))}
        </div>

        <div id="benefits" className="mt-24">
          <SectionHead kicker="Benefits" title={t.benefits_title} body="" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="glass-strong rounded-2xl p-6">
                <b.icon className="h-6 w-6 text-primary" />
                <h4 className="mt-3 font-semibold">{b.t}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-flex px-3 py-1 rounded-full glass text-[11px] uppercase tracking-widest text-primary">
        {kicker}
      </div>
      <h2 className="mt-4 text-3xl sm:text-5xl font-bold gradient-text">{title}</h2>
      {body && <p className="mt-4 text-muted-foreground">{body}</p>}
    </div>
  );
}
