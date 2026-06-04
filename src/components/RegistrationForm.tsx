import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";
import { SectionHead } from "./Curriculum";

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  father_name: z.string().trim().min(2).max(100),
  gender: z.enum(["male", "female", "other"]),
  date_of_birth: z.string().min(1),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  city: z.string().trim().min(2).max(80),
  education_level: z.string().min(1),
  profession: z.string().trim().max(120).optional().or(z.literal("")),
  ai_experience: z.boolean(),
  motivation: z.string().trim().min(10).max(1000),
  terms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms." }) }),
});

const FIELD =
  "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition placeholder:text-muted-foreground";

export function RegistrationForm() {
  const t = useT();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      full_name: String(fd.get("full_name") || ""),
      father_name: String(fd.get("father_name") || ""),
      gender: String(fd.get("gender") || ""),
      date_of_birth: String(fd.get("date_of_birth") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      city: String(fd.get("city") || ""),
      education_level: String(fd.get("education_level") || ""),
      profession: String(fd.get("profession") || ""),
      ai_experience: fd.get("ai_experience") === "yes",
      motivation: String(fd.get("motivation") || ""),
      terms: fd.get("terms") === "on",
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    setLoading(true);
    const { terms, ...row } = parsed.data;
    void terms;
    const { error } = await supabase.from("registrations").insert(row);
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Registration submitted! We'll be in touch.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="register" className="px-4 py-20 relative">
      <div className="glow-orb h-80 w-80 -top-20 left-1/2 -translate-x-1/2" style={{ background: "var(--primary)" }} />
      <div className="mx-auto max-w-4xl relative">
        <SectionHead kicker="Register" title={t.register_title} body={t.register_sub} />
        <form onSubmit={onSubmit} className="mt-12 glass rounded-3xl p-6 sm:p-10 grid sm:grid-cols-2 gap-5">
          <Field label="Full Name" required><input name="full_name" className={FIELD} placeholder="Your full name" required /></Field>
          <Field label="Father's Name" required><input name="father_name" className={FIELD} placeholder="Father's name" required /></Field>
          <Field label="Gender" required>
            <select name="gender" className={FIELD} required defaultValue="">
              <option value="" disabled>Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="Date of Birth" required><input type="date" name="date_of_birth" className={FIELD} required /></Field>
          <Field label="Email Address" required><input type="email" name="email" className={FIELD} placeholder="you@email.com" required /></Field>
          <Field label="Phone Number" required><input type="tel" name="phone" className={FIELD} placeholder="+92 ..." required /></Field>
          <Field label="City" required><input name="city" className={FIELD} placeholder="City" required /></Field>
          <Field label="Education Level" required>
            <select name="education_level" className={FIELD} required defaultValue="">
              <option value="" disabled>Select...</option>
              <option>Matric</option>
              <option>Intermediate</option>
              <option>Bachelor's</option>
              <option>Master's</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Current Profession"><input name="profession" className={FIELD} placeholder="Student / Freelancer / etc." /></Field>
          <Field label="Previous AI Experience" required>
            <select name="ai_experience" className={FIELD} required defaultValue="no">
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </Field>
          <Field label="Why do you want to join?" required full>
            <textarea name="motivation" rows={4} className={FIELD} placeholder="Tell us your goals..." required />
          </Field>
          <label className="sm:col-span-2 flex items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" name="terms" className="mt-1 h-4 w-4 rounded accent-[var(--primary)]" required />
            <span>I agree to the Terms & Conditions and to receive course updates from Dream Team.</span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 btn-3d btn-3d-hover px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, required, full, children }: { label: string; required?: boolean; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
