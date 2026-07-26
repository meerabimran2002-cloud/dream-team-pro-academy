import { Link } from "@tanstack/react-router";
import { Palette, Languages, Shield } from "lucide-react";
import { useState } from "react";
import { useTheme, THEMES, type ThemeName, type Lang } from "@/lib/theme-context";
import { useT } from "@/lib/i18n";

export function Navbar() {
  const { theme, setTheme, lang, setLang } = useTheme();
  const t = useT();
  const [openTheme, setOpenTheme] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto max-w-7xl glass rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 md:flex md:justify-between">
        <Link to="/" className="flex min-w-0 items-center">
          <div className="leading-tight min-w-0">
            <div className="font-display font-bold text-base sm:text-lg gradient-text truncate">Dream Team</div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground truncate">AI Academy</div>
          </div>
        </Link>


        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition">{t.nav_about}</a>
          <a href="#curriculum" className="hover:text-foreground transition">{t.nav_curriculum}</a>
          <a href="#faq" className="hover:text-foreground transition">{t.nav_faq}</a>
          <a href="#register" className="hover:text-foreground transition">{t.nav_register}</a>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => { setOpenTheme(v => !v); setOpenLang(false); }}
              aria-label="Theme"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl glass grid place-items-center hover:scale-105 transition"
            >
              <Palette className="h-4 w-4" />
            </button>
            {openTheme && (
              <div className="absolute right-0 mt-2 glass-strong rounded-xl p-2 min-w-[180px] animate-fade-up">
                {THEMES.map(th => (
                  <button
                    type="button"
                    key={th.id}
                    onClick={() => { setTheme(th.id as ThemeName); setOpenTheme(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-secondary/60 transition ${theme === th.id ? "bg-secondary/60" : ""}`}
                  >
                    <span className="h-5 w-5 rounded-full ring-1 ring-white/20" style={{ background: th.swatch }} />
                    <span>{th.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => { setOpenLang(v => !v); setOpenTheme(false); }}
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
