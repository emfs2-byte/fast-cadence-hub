import { ArrowDown, ArrowUp, ChevronRight, Users } from "lucide-react";
import type { Workshop } from "@/data/mocks";
import { formatarData, formatarTrimestre } from "@/lib/format";
import type { DirecaoOrdem, CampoOrdem } from "@/lib/ordenacao";

interface WorkshopListProps {
  workshops: Workshop[];
  selecionadoId?: number | undefined;
  campo: CampoOrdem;
  direcao: DirecaoOrdem;
  onOrdenar: (campo: CampoOrdem) => void;
  onSelecionar: (workshop: Workshop) => void;
}

const colunas: { campo: CampoOrdem; label: string; className: string }[] = [
  { campo: "nome", label: "workshop", className: "flex-1" },
  { campo: "data", label: "data", className: "w-28 hidden sm:block" },
  { campo: "presentes", label: "presentes", className: "w-24 hidden sm:block text-right" },
];

export function WorkshopList({
  workshops,
  selecionadoId,
  campo,
  direcao,
  onOrdenar,
  onSelecionar,
}: WorkshopListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 px-4">
        {colunas.map((coluna) => {
          const ativo = coluna.campo === campo;
          return (
            <button
              key={coluna.campo}
              type="button"
              onClick={() => onOrdenar(coluna.campo)}
              className={`mono-tag flex items-center gap-1 transition-colors hover:text-primary ${
                ativo ? "text-primary" : "text-muted-foreground"
              } ${coluna.className}`}
            >
              <span>{coluna.label}</span>
              {ativo ? (
                direcao === "asc" ? (
                  <ArrowUp className="size-3" />
                ) : (
                  <ArrowDown className="size-3" />
                )
              ) : null}
            </button>
          );
        })}
        <span className="w-4 shrink-0" />
      </div>

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
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground sm:text-base">
                    {workshop.nome}
                  </span>
                  <span className="mono-tag mt-1 flex items-center gap-3 text-muted-foreground">
                    <span>{formatarTrimestre(workshop.dataRealizacao)}</span>
                    <span className="sm:hidden">{formatarData(workshop.dataRealizacao)}</span>
                    <span className="flex items-center gap-1 sm:hidden">
                      <Users className="size-3" />
                      {workshop.participantes.length}
                    </span>
                  </span>
                </span>
                <span className="mono-tag hidden w-28 text-muted-foreground sm:block">
                  {formatarData(workshop.dataRealizacao)}
                </span>
                <span className="mono-tag hidden w-24 items-center justify-end gap-1 text-muted-foreground sm:flex">
                  <Users className="size-3" />
                  {workshop.participantes.length}
                </span>
                <ChevronRight className="size-4 shrink-0 text-primary" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
