import { useEffect, useRef, useState } from "react";
import { Palette, Languages } from "lucide-react";
import { useTheme, THEMES, type ThemeName, type Lang } from "@/lib/theme-context";

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, lang, setLang } = useTheme();
  const [openTheme, setOpenTheme] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpenTheme(false);
        setOpenLang(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={wrapRef} className="flex items-center gap-2">
      <div className="relative">
        <button
          type="button"
          onClick={() => { setOpenTheme(v => !v); setOpenLang(false); }}
          aria-label="Theme"
          className="h-10 w-10 rounded-xl glass grid place-items-center hover:scale-105 transition"
        >
          <Palette className="h-4 w-4" />
        </button>
        {openTheme && (
          <div className="absolute right-0 mt-2 glass-strong rounded-xl p-2 min-w-[180px] animate-fade-up z-50">
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

      {!compact && (
        <div className="relative">
          <button
            type="button"
            onClick={() => { setOpenLang(v => !v); setOpenTheme(false); }}
            aria-label="Language"
            className="h-10 px-3 rounded-xl glass flex items-center gap-2 text-sm hover:scale-105 transition"
          >
            <Languages className="h-4 w-4" />
            <span className="uppercase">{lang}</span>
          </button>
          {openLang && (
            <div className="absolute right-0 mt-2 glass-strong rounded-xl p-2 min-w-[140px] animate-fade-up z-50">
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
      )}
    </div>
  );
}
