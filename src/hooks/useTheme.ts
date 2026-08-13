import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "fast:tema";
export type Tema = "light" | "dark";

function aplicar(tema: Tema) {
  document.documentElement.classList.toggle("dark", tema === "dark");
}

export function useTheme() {
  const [tema, setTema] = useState<Tema>("light");

  useEffect(() => {
    const salvo = window.localStorage.getItem(STORAGE_KEY) as Tema | null;
    const inicial: Tema =
      salvo ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTema(inicial);
    aplicar(inicial);
  }, []);

  const alternar = useCallback(() => {
    setTema((anterior) => {
      const proximo: Tema = anterior === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, proximo);
      aplicar(proximo);
      return proximo;
    });
  }, []);

  return { tema, alternar };
}
