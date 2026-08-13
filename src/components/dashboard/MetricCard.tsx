import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  valor: string | number;
  detalhe: string;
  icon: LucideIcon;
}

export function MetricCard({ label, valor, detalhe, icon: Icon }: MetricCardProps) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <p className="mono-tag text-muted-foreground">{label}</p>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-foreground">{valor}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detalhe}</p>
    </div>
  );
}
