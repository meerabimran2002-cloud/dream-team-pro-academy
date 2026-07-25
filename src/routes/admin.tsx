import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";
import { Loader2, LogOut, Search, Download, Users, Star, Mail, Shield, Trash2, ArrowLeft, Sparkles, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal · Dream Team" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Registration = {
  id: string;
  full_name: string;
  father_name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  phone: string;
  city: string;
  education_level: string;
  profession: string | null;
  ai_experience: boolean;
  motivation: string;
  created_at: string;
  batch: number;
};

type FeedbackRow = {
  id: string;
  name: string;
  email: string | null;
  rating: number;
  message: string;
  created_at: string;
};

function AdminPage() {
  return (
    <>
      <Toaster position="top-center" />
      <AdminInner />
    </>
  );
}

function AdminInner() {
  const [session, setSession] = useState<unknown>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return session ? <Dashboard /> : <AuthPanel />;
}

function AuthPanel() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const fn = mode === "login"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    const { error } = await fn;
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success(mode === "login" ? "Welcome back!" : "Account created. You're in.");
  }

  return (
    <div className="min-h-screen grid place-items-center px-4 py-16 relative">
      <div className="glow-orb h-96 w-96 -top-20 -left-20" style={{ background: "var(--primary)" }} />
      <div className="glow-orb h-96 w-96 bottom-0 -right-20" style={{ background: "var(--accent)", animationDelay: "2s" }} />
      <Link to="/" className="absolute top-6 left-6 glass rounded-xl px-3 py-2 text-sm flex items-center gap-2 hover:scale-105 transition">
        <ArrowLeft className="h-4 w-4" /> Back to site
      </Link>
      <div className="absolute top-6 right-6"><ThemeSwitcher /></div>
      <div className="w-full max-w-md glass-strong rounded-3xl p-8 sm:p-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-2xl btn-3d grid place-items-center">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold gradient-text">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to manage registrations" : "First time? Create your admin account."}
          </p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-3d btn-3d-hover w-full px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "login" ? "Sign In" : "Create Admin Account"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>No account yet? <button type="button" onClick={() => setMode("signup")} className="text-primary hover:underline">Create one</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline">Sign in</button></>
          )}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [tab, setTab] = useState<"registrations" | "feedback">("registrations");
  const [batchTab, setBatchTab] = useState<1 | 2>(2);
  const [regs, setRegs] = useState<Registration[]>([]);
  const [fbs, setFbs] = useState<FeedbackRow[]>([]);
  const [q, setQ] = useState("");
  const [filterEdu, setFilterEdu] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    const [r, f] = await Promise.all([
      supabase.from("registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("feedback").select("*").order("created_at", { ascending: false }),
    ]);
    if (r.error) toast.error(r.error.message);
    if (f.error) toast.error(f.error.message);
    setRegs((r.data ?? []) as Registration[]);
    setFbs((f.data ?? []) as FeedbackRow[]);
    setLoading(false);
  }

  const batchRegs = useMemo(() => regs.filter(r => (r.batch ?? 2) === batchTab), [regs, batchTab]);
  const batch1Count = useMemo(() => regs.filter(r => (r.batch ?? 2) === 1).length, [regs]);
  const batch2Count = useMemo(() => regs.filter(r => (r.batch ?? 2) === 2).length, [regs]);

  const filteredRegs = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return batchRegs.filter(r => {
      const matchQ = !qq || [r.full_name, r.email, r.phone, r.city, r.father_name].some(v => v?.toLowerCase().includes(qq));
      const matchEdu = !filterEdu || r.education_level === filterEdu;
      return matchQ && matchEdu;
    });
  }, [batchRegs, q, filterEdu]);

  const eduOptions = useMemo(() => Array.from(new Set(regs.map(r => r.education_level))).filter(Boolean), [regs]);
  const avgRating = useMemo(() => fbs.length ? (fbs.reduce((a, b) => a + b.rating, 0) / fbs.length).toFixed(1) : "—", [fbs]);
  const weeklyRegs = useMemo(() => regs.filter(r => Date.now() - new Date(r.created_at).getTime() <= 7 * 24 * 60 * 60 * 1000).length, [regs]);
  const topCity = useMemo(() => {
    const counts = new Map<string, number>();
    regs.forEach(r => counts.set(r.city, (counts.get(r.city) ?? 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  }, [regs]);

  function exportCSV() {
    const rows = filteredRegs;
    if (!rows.length) return toast.error("Nothing to export");
    const headers = ["Full Name","Father","Gender","DOB","Email","Phone","City","Education","Profession","AI Experience","Motivation","Submitted"];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [headers.join(",")]
      .concat(rows.map(r => [r.full_name, r.father_name, r.gender, r.date_of_birth, r.email, r.phone, r.city, r.education_level, r.profession, r.ai_experience ? "Yes" : "No", r.motivation, r.created_at].map(escape).join(",")))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dream-team-registrations-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function delReg(id: string) {
    if (!confirm("Delete this registration?")) return;
    const { error } = await supabase.from("registrations").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    setRegs(rs => rs.filter(r => r.id !== id));
  }
  async function delFb(id: string) {
    if (!confirm("Delete this feedback?")) return;
    const { error } = await supabase.from("feedback").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    setFbs(fs => fs.filter(f => f.id !== id));
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="glass rounded-2xl px-4 sm:px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl btn-3d grid place-items-center"><Shield className="h-5 w-5" /></div>
            <div>
              <div className="font-display font-bold gradient-text">Admin Dashboard</div>
              <div className="text-xs text-muted-foreground">Dream Team Academy</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Link to="/" className="glass rounded-xl px-3 py-2 text-sm hover:scale-105 transition">View Site</Link>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="glass rounded-xl px-3 py-2 text-sm flex items-center gap-2 hover:scale-105 transition"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </header>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Stat icon={Users} label="Total Registrations" value={regs.length} />
          <Stat icon={Star} label="Avg Feedback Rating" value={avgRating} />
          <Stat icon={Mail} label="Feedback Messages" value={fbs.length} />
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
          <div className="glass rounded-2xl p-5 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: "radial-gradient(circle at 12% 20%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 34%)" }} />
            <div className="relative flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl btn-3d grid place-items-center"><Sparkles className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Smart Admin Brief</div>
                <div className="font-display text-xl font-bold gradient-text">{weeklyRegs} new leads this week</div>
              </div>
            </div>
            <div className="relative mt-4 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-secondary/45 p-3"><span className="text-muted-foreground">Top city</span><div className="font-semibold">{topCity}</div></div>
              <div className="rounded-xl bg-secondary/45 p-3"><span className="text-muted-foreground">Active filter</span><div className="font-semibold">{filteredRegs.length} visible</div></div>
              <div className="rounded-xl bg-secondary/45 p-3"><span className="text-muted-foreground">Action</span><div className="font-semibold">Export ready</div></div>
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Course Seat Pulse</div>
                <div className="font-display text-xl font-bold">{Math.min(100, Math.round((regs.length / 50) * 100))}% filled</div>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-5 h-3 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.round((regs.length / 50) * 100))}%`, background: "linear-gradient(90deg, var(--primary), var(--accent))" }} />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Live progress toward a 50-student cohort.</div>
          </div>
        </div>

        <div className="mt-6 glass rounded-2xl p-2 inline-flex gap-1">
          {(["registrations","feedback"] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab===t ? "btn-3d" : "hover:bg-secondary/60"}`}
            >
              {t === "registrations" ? "Registrations" : "Feedback"}
            </button>
          ))}
        </div>

        {tab === "registrations" ? (
          <div className="mt-4 glass rounded-2xl p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {([1, 2] as const).map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBatchTab(b)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${batchTab === b ? "btn-3d" : "glass hover:scale-105"}`}
                >
                  <span>Batch {b}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${batchTab === b ? "bg-background/30" : "bg-secondary/70"}`}>
                    {b === 1 ? batch1Count : batch2Count}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest opacity-70">
                    {b === 1 ? "Closed" : "Starts 10 Aug"}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search name, email, city, phone..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none text-sm"
                />
              </div>
              <select value={filterEdu} onChange={e => setFilterEdu(e.target.value)} className="px-3 py-2.5 rounded-xl bg-input border border-border text-sm">
                <option value="">All education</option>
                {eduOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <button type="button" onClick={exportCSV} className="btn-3d btn-3d-hover px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>

            <div className="mt-4 overflow-x-auto -mx-4 sm:mx-0">
              {loading ? (
                <div className="py-16 grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : filteredRegs.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground text-sm">No registrations yet.</div>
              ) : (
                <table className="w-full text-sm min-w-[900px]">
                  <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr>
                      <th className="py-3 px-3">Name</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">Phone</th>
                      <th className="py-3 px-3">City</th>
                      <th className="py-3 px-3">Education</th>
                      <th className="py-3 px-3">AI Exp.</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegs.map(r => (
                      <tr key={r.id} className="border-b border-border/40 hover:bg-secondary/30">
                        <td className="py-3 px-3">
                          <div className="font-medium">{r.full_name}</div>
                          <div className="text-xs text-muted-foreground">s/o {r.father_name}</div>
                        </td>
                        <td className="py-3 px-3">{r.email}</td>
                        <td className="py-3 px-3">{r.phone}</td>
                        <td className="py-3 px-3">{r.city}</td>
                        <td className="py-3 px-3">{r.education_level}</td>
                        <td className="py-3 px-3">{r.ai_experience ? "Yes" : "No"}</td>
                        <td className="py-3 px-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-3">
                          <button type="button" onClick={() => delReg(r.id)} className="text-muted-foreground hover:text-destructive transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-2 py-16 grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : fbs.length === 0 ? (
              <div className="col-span-2 py-16 text-center text-muted-foreground text-sm">No feedback yet.</div>
            ) : fbs.map(f => (
              <div key={f.id} className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{f.name}</div>
                    {f.email && <div className="text-xs text-muted-foreground">{f.email}</div>}
                  </div>
                  <button type="button" onClick={() => delFb(f.id)} className="text-muted-foreground hover:text-destructive transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-0.5">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < f.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                  ))}
                </div>
                <p className="mt-3 text-sm text-foreground/90">{f.message}</p>
                <div className="mt-3 text-xs text-muted-foreground">{new Date(f.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{className?: string}>; label: string; value: number | string }) {
  return (
    <div className="glass rounded-2xl p-5 flex items-center gap-4">
      <div className="h-12 w-12 rounded-xl btn-3d grid place-items-center">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}
