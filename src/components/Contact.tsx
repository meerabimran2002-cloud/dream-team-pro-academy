import { Mail, MessageCircle, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionHead } from "./Curriculum";

export function Contact() {
  const t = useT();
  return (
    <section id="contact" className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHead kicker="Contact" title={t.contact_title} body="" />
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          <a
            href="#register"
            className="glass rounded-2xl p-8 hover:-translate-y-1 transition group"
          >
            <Sparkles className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Enroll Today</h3>
            <p className="mt-2 text-sm text-muted-foreground">Reserve your seat for the Prompt Engineering cohort starting 10 July.</p>
            <div className="mt-4 text-sm text-primary group-hover:underline">Go to registration →</div>
          </a>
          <a
            href="#feedback"
            className="glass rounded-2xl p-8 hover:-translate-y-1 transition group"
          >
            <MessageCircle className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-xl font-semibold">Send Feedback</h3>
            <p className="mt-2 text-sm text-muted-foreground">Already a student or browsing? Drop us your thoughts.</p>
            <div className="mt-4 text-sm text-primary group-hover:underline">Share feedback →</div>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pt-10 pb-8">
      <div className="mx-auto max-w-7xl glass rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl btn-3d grid place-items-center">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <div className="font-display font-bold gradient-text">Dream Team</div>
            <div className="text-xs text-muted-foreground">Premium AI Academy · Est. 2026</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center sm:text-right">
          © {new Date().getFullYear()} Dream Team Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
