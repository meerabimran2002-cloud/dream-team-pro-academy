import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Quote, Star, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";
import { SectionHead } from "./Curriculum";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(5).max(800),
});

const FIELD =
  "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition placeholder:text-muted-foreground";

type PublicFeedback = {
  id: string;
  name: string;
  rating: number;
  message: string;
};

export function Feedback() {
  const t = useT();
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<PublicFeedback[]>([]);

  useEffect(() => {
    supabase
      .from("feedback")
      .select("id,name,rating,message")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setReviews(data ?? []));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      rating,
      message: String(fd.get("message") || ""),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    setLoading(true);
    const payload = { ...parsed.data, email: parsed.data.email || null };
    const { error } = await supabase.from("feedback").insert(payload);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Thank you! Your feedback will appear after approval.");
    (e.target as HTMLFormElement).reset();
    setRating(5);
  }

  return (
    <section id="feedback" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Feedback" title={t.feedback_title} body={t.feedback_sub} />
        {reviews.length > 0 && (
          <div className="review-marquee mt-10" aria-label="Student feedback">
            <div className="review-track">
              {[...reviews, ...reviews].map((review, index) => (
                <article key={`${review.id}-${index}`} className="review-card glass">
                  <Quote className="h-5 w-5 text-primary" />
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/90">{review.message}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-semibold">{review.name}</span>
                    <span className="flex" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                      ))}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
        <form onSubmit={onSubmit} className="mt-10 mx-auto max-w-3xl glass rounded-2xl p-6 sm:p-10 grid gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <input name="name" className={FIELD} placeholder="Your name" required />
            <input name="email" type="email" className={FIELD} placeholder="Email (optional)" />
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                aria-label={`${n} stars`}
                className="p-1 hover:scale-110 transition"
              >
                <Star className={`h-7 w-7 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <textarea name="message" rows={4} className={FIELD} placeholder="Share your thoughts..." required />
          <button
            type="submit"
            disabled={loading}
            className="btn-3d btn-3d-hover px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Send Feedback
          </button>
        </form>
      </div>
    </section>
  );
}
