"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "th";
export type Currency = "THB" | "USD" | "EUR";

type Prefs = { language: Language; currency: Currency };
type Ctx = Prefs & {
  setLanguage: (l: Language) => void;
  setCurrency: (c: Currency) => void;
};

const KEY = "travela:preferences:v1";
const DEFAULT: Prefs = { language: "en", currency: "THB" };

const PrefsContext = createContext<Ctx | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT);

  // load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPrefs({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  const value = useMemo<Ctx>(
    () => ({
      ...prefs,
      setLanguage: (language) => setPrefs((p) => ({ ...p, language })),
      setCurrency: (currency) => setPrefs((p) => ({ ...p, currency })),
    }),
    [prefs]
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
