import { ChevronRight, Users } from "lucide-react";
import type { Workshop } from "@/data/mocks";
import { formatarData, formatarTrimestre } from "@/lib/format";

interface WorkshopListProps {
  workshops: Workshop[];
  selecionadoId?: number | undefined;
  onSelecionar: (workshop: Workshop) => void;
}

export function WorkshopList({ workshops, selecionadoId, onSelecionar }: WorkshopListProps) {
  return (
    <ul className="space-y-3">
      {workshops.map((workshop) => {
        const ativo = workshop.id === selecionadoId;
        return (
          <li key={workshop.id}>
            <button
              type="button"
              onClick={() => onSelecionar(workshop)}
              className={`surface-card flex w-full items-center gap-4 p-4 text-left transition-all hover:border-primary/50 hover:bg-accent/40 ${
                ativo ? "border-primary bg-accent/60" : ""
              }`}
            >
              <span className="mono-tag hidden w-20 shrink-0 rounded border border-border bg-muted px-2 py-1 text-center text-muted-foreground sm:block">
                {formatarTrimestre(workshop.dataRealizacao)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground sm:text-base">
                  {workshop.nome}
                </span>
                <span className="mono-tag mt-1 flex items-center gap-3 text-muted-foreground">
                  <span>{formatarData(workshop.dataRealizacao)}</span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3" />
                    {workshop.participantes.length}
                  </span>
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-primary" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
