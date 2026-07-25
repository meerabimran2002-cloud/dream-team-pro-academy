import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeName =
  | "purple"
  | "blue"
  | "emerald"
  | "rose"
  | "gold"
  | "snow"
  | "cream"
  | "mist";
export type Lang = "en" | "ur";

export const THEMES: { id: ThemeName; label: string; swatch: string; tone: "dark" | "light" }[] = [
  { id: "purple", label: "Purple Night", swatch: "linear-gradient(135deg,#a855f7,#ec4899)", tone: "dark" },
  { id: "blue", label: "Deep Ocean", swatch: "linear-gradient(135deg,#3b82f6,#06b6d4)", tone: "dark" },
  { id: "emerald", label: "Emerald", swatch: "linear-gradient(135deg,#10b981,#22d3ee)", tone: "dark" },
  { id: "rose", label: "Rose", swatch: "linear-gradient(135deg,#f43f5e,#ec4899)", tone: "dark" },
  { id: "gold", label: "Royal Gold", swatch: "linear-gradient(135deg,#f59e0b,#fbbf24)", tone: "dark" },
  { id: "snow", label: "Snow Light", swatch: "linear-gradient(135deg,#e2e8f0,#3b82f6)", tone: "light" },
  { id: "cream", label: "Cream Light", swatch: "linear-gradient(135deg,#fef3c7,#f59e0b)", tone: "light" },
  { id: "mist", label: "Mist Light", swatch: "linear-gradient(135deg,#dbeafe,#a855f7)", tone: "light" },
];

const THEME_IDS = new Set(THEMES.map(t => t.id));
const LANG_IDS = new Set<Lang>(["en", "ur"]);

function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") return "snow";
  const t = window.localStorage.getItem("dt-theme") as ThemeName | null;
  return t && THEME_IDS.has(t) ? t : "snow";
}

function getStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  const l = window.localStorage.getItem("dt-lang") as Lang | null;
  return l && LANG_IDS.has(l) ? l : "en";
}

type Ctx = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(getStoredTheme);
  const [lang, setLangState] = useState<Lang>(getStoredLang);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dt-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    localStorage.setItem("dt-lang", lang);
  }, [lang]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "dt-theme" && e.newValue && THEME_IDS.has(e.newValue as ThemeName)) {
        setThemeState(e.newValue as ThemeName);
      }
      if (e.key === "dt-lang" && e.newValue && LANG_IDS.has(e.newValue as Lang)) {
        setLangState(e.newValue as Lang);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme: setThemeState, lang, setLang: setLangState }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("ThemeProvider missing");
  return c;
}
