import { useMemo, useState } from "react";
import { Check, Copy, Cpu, Sparkles, Wand2 } from "lucide-react";
import { useT } from "@/lib/i18n";

const GOALS = ["Freelancing", "Study plan", "Content ideas", "Business growth"];
const TONES = ["Clear", "Professional", "Creative", "Simple"];

export function PromptStudio() {
  const t = useT();
  const [goal, setGoal] = useState(GOALS[0]);
  const [tone, setTone] = useState(TONES[1]);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(
    () =>
      `Act as a senior AI mentor. Create a ${tone.toLowerCase()} ${goal.toLowerCase()} prompt for a beginner student. Include the goal, context, step-by-step tasks, output format, and one improvement tip.`,
    [goal, tone],
  );

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[0.9fr_1.1fr] gap-5 items-stretch">
        <div className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: "radial-gradient(circle at 18% 12%, color-mix(in oklab, var(--primary) 24%, transparent), transparent 38%)" }} />
          <div className="relative">
            <div className="h-12 w-12 rounded-xl btn-3d grid place-items-center">
              <Wand2 className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold gradient-text">{t.studio_title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{t.studio_sub}</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Feature icon={Cpu} label={t.studio_ai} />
              <Feature icon={Sparkles} label={t.studio_live} />
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-4 sm:p-6 [perspective:1200px]">
          <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4 sm:p-5 [transform:rotateX(2deg)_rotateY(-3deg)] shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Prompt Studio</div>
                <div className="font-display text-xl font-bold">{t.studio_builder}</div>
              </div>
              <button type="button" onClick={copyPrompt} className="btn-3d btn-3d-hover rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? t.studio_copied : t.studio_copy}
              </button>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <ChoiceGroup label={t.studio_goal} options={GOALS} value={goal} onChange={setGoal} />
              <ChoiceGroup label={t.studio_tone} options={TONES} value={tone} onChange={setTone} />
            </div>

            <div className="mt-5 rounded-xl bg-background/55 border border-border p-4 min-h-[152px] text-sm leading-7 text-foreground/90">
              {prompt}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="rounded-xl bg-secondary/45 p-4 flex items-center gap-3">
      <div className="h-9 w-9 rounded-lg btn-3d grid place-items-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function ChoiceGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="grid grid-cols-2 gap-2">
        {options.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-xl px-3 py-2.5 text-sm transition ${value === option ? "btn-3d" : "bg-secondary/55 hover:bg-secondary"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}