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
