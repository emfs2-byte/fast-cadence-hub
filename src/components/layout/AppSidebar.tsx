import { Link } from "@tanstack/react-router";
import { BarChart3, Presentation, Users, Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { to: "/", label: "Colaboradores", icon: Users },
  { to: "/workshops", label: "Workshops", icon: Presentation },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
] as const;

export function AppSidebar() {
  return (
    <aside className="sticky top-0 z-20 flex h-screen w-16 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:w-60">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
          <Terminal className="size-5" />
        </span>
        <div className="hidden lg:block">
          <p className="font-display text-sm font-bold text-sidebar-foreground">FAST Soluções</p>
          <p className="mono-tag text-navy-muted">workshops</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 py-4 lg:px-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            title={label}
            className="group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-navy-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            activeProps={{
              className: "bg-sidebar-accent text-sidebar-foreground font-medium",
            }}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`absolute left-0 h-6 w-0.5 rounded-r bg-sidebar-primary transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Icon className="size-5 shrink-0" />
                <span className="hidden lg:inline">{label}</span>
              </>
            )}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-2 py-2 lg:px-3">
        <ThemeToggle />
      </div>

      <div className="hidden border-t border-sidebar-border px-5 py-4 lg:block">
        <p className="mono-tag text-navy-muted">cadência trimestral</p>
        <p className="mt-1 text-xs text-navy-muted">v1.0.0 · interno</p>
      </div>
    </aside>
  );
}
