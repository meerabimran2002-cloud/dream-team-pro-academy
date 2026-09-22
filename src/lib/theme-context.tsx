import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ur";
const LANG_IDS = new Set<Lang>(["en", "ur"]);

function getStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  const l = window.localStorage.getItem("dt-lang") as Lang | null;
  return l && LANG_IDS.has(l) ? l : "en";
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLang);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "academy");
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    localStorage.setItem("dt-lang", lang);
  }, [lang]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "dt-lang" && e.newValue && LANG_IDS.has(e.newValue as Lang)) {
        setLangState(e.newValue as Lang);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <ThemeCtx.Provider value={{ lang, setLang: setLangState }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("ThemeProvider missing");
  return c;
}
