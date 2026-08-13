import { Presentation } from "lucide-react";
import type { Colaborador } from "@/data/mocks";
import { formatarId, iniciais } from "@/lib/format";

interface ColaboradorCardProps {
  colaborador: Colaborador;
  participacoes: number;
}

export function ColaboradorCard({ colaborador, participacoes }: ColaboradorCardProps) {
  return (
    <article className="surface-card group flex items-start gap-4 p-5 transition-colors hover:border-primary/40 hover:bg-accent/40">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-navy-foreground">
        {iniciais(colaborador.nome)}
      </span>
      <div className="min-w-0 flex-1">
        <span className="mono-tag inline-block rounded border border-border bg-muted px-1.5 py-0.5 text-muted-foreground">
          id {formatarId(colaborador.id)}
        </span>
        <h3 className="mt-2 truncate text-base font-semibold text-foreground">
          {colaborador.nome}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Presentation className="size-3.5 text-primary" />
          {participacoes === 1 ? "1 workshop" : `${participacoes} workshops`}
        </p>
      </div>
    </article>
  );
}
