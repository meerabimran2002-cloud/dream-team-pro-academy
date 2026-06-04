import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeName = "purple" | "blue" | "emerald" | "rose" | "gold";
export type Lang = "en" | "ur";

export const THEMES: { id: ThemeName; label: string; swatch: string }[] = [
  { id: "purple", label: "Purple", swatch: "linear-gradient(135deg,#a855f7,#ec4899)" },
  { id: "blue", label: "Blue", swatch: "linear-gradient(135deg,#3b82f6,#06b6d4)" },
  { id: "emerald", label: "Emerald", swatch: "linear-gradient(135deg,#10b981,#22d3ee)" },
  { id: "rose", label: "Rose", swatch: "linear-gradient(135deg,#f43f5e,#ec4899)" },
  { id: "gold", label: "Gold", swatch: "linear-gradient(135deg,#f59e0b,#fbbf24)" },
];

type Ctx = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("purple");
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const t = (typeof window !== "undefined" && localStorage.getItem("dt-theme")) as ThemeName | null;
    const l = (typeof window !== "undefined" && localStorage.getItem("dt-lang")) as Lang | null;
    if (t) setThemeState(t);
    if (l) setLangState(l);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dt-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    localStorage.setItem("dt-lang", lang);
  }, [lang]);

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
