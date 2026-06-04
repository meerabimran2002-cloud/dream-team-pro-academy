import { useT } from "@/lib/i18n";
import { SectionHead } from "./Curriculum";

const steps = [
  { n: "01", t: "Apply & Reserve", d: "Submit the registration form to reserve your seat in the limited cohort." },
  { n: "02", t: "Onboard", d: "Get welcomed to the private group, tools setup, and pre-course materials." },
  { n: "03", t: "Live Classes", d: "Attend interactive sessions from 10 July — practice, build, and ask anything." },
  { n: "04", t: "Build Projects", d: "Ship real prompt-engineered deliverables for your portfolio." },
  { n: "05", t: "Get Certified", d: "Receive your Dream Team certificate and launch on Fiverr / Upwork." },
];

export function Journey() {
  const t = useT();
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHead kicker="Journey" title={t.journey_title} body="" />
        <div className="mt-12 relative">
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          {steps.map((s, i) => (
            <div
              key={i}
              className={`relative grid sm:grid-cols-2 gap-6 mb-8 sm:mb-12 ${i % 2 === 1 ? "sm:[direction:rtl]" : ""}`}
            >
              <div className={`pl-14 sm:pl-0 sm:px-8 [direction:ltr]`}>
                <div className="glass rounded-2xl p-6 hover:-translate-y-1 transition">
                  <div className="text-sm font-mono text-primary">{s.n}</div>
                  <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
              <div className="hidden sm:block" />
              <div className="absolute left-0 sm:left-1/2 top-3 -translate-x-1/2 h-10 w-10 rounded-full btn-3d grid place-items-center font-bold text-sm">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
