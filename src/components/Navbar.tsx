import { Link } from "@tanstack/react-router";
import { Award, Languages, Shield } from "lucide-react";
import { useState } from "react";
import { useTheme, type Lang } from "@/lib/theme-context";
import { useT } from "@/lib/i18n";

export function Navbar() {
  const { lang, setLang } = useTheme();
  const t = useT();
  const [openLang, setOpenLang] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto max-w-7xl glass rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 md:flex md:justify-between">
        <Link to="/" className="flex min-w-0 items-center">
          <div className="leading-tight min-w-0">
            <div className="font-display font-bold text-base sm:text-lg text-primary truncate">Dream Team Academy</div>
          </div>
        </Link>


        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition">{t.nav_about}</a>
          <a href="#curriculum" className="hover:text-foreground transition">{t.nav_curriculum}</a>
          <a href="#faq" className="hover:text-foreground transition">{t.nav_faq}</a>
          <Link to="/certificates" className="hover:text-foreground transition">Certificates</Link>
          <a href="#register" className="hover:text-foreground transition">{t.nav_register}</a>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenLang(v => !v)}
              aria-label="Language"
              className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl glass flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:scale-105 transition"
            >
              <Languages className="h-4 w-4" />
              <span className="uppercase">{lang}</span>
            </button>
            {openLang && (
              <div className="absolute right-0 mt-2 glass-strong rounded-xl p-2 min-w-[140px] animate-fade-up">
                {(["en", "ur"] as Lang[]).map(l => (
                  <button
                    type="button"
                    key={l}
                    onClick={() => { setLang(l); setOpenLang(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-secondary/60 transition ${lang === l ? "bg-secondary/60" : ""}`}
                  >
                    {l === "en" ? "English" : "اردو"}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/certificates"
            aria-label="Batch 1 certificates"
            className="md:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-xl glass grid place-items-center hover:scale-105 transition"
          >
            <Award className="h-4 w-4" />
          </Link>

          <Link
            to="/admin"
            aria-label={t.nav_admin}
            className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl glass flex items-center gap-2 text-xs sm:text-sm hover:scale-105 transition"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{t.nav_admin}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
