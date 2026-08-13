import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { tema, alternar } = useTheme();
  const escuro = tema === "dark";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={escuro ? "Ativar modo claro" : "Ativar modo escuro"}
      title={escuro ? "Modo claro" : "Modo escuro"}
      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-navy-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
    >
      {escuro ? <Sun className="size-5 shrink-0" /> : <Moon className="size-5 shrink-0" />}
      <span className="mono-tag hidden lg:inline">{escuro ? "modo claro" : "modo escuro"}</span>
    </button>
  );
}
