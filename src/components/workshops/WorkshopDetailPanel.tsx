import { CalendarClock, Users, X } from "lucide-react";
import type { Colaborador, Workshop } from "@/data/mocks";
import { formatarDataHora, formatarId, formatarTrimestre, iniciais } from "@/lib/format";
import { participantesDoWorkshop } from "@/lib/participacao";

interface WorkshopDetailPanelProps {
  workshop: Workshop | null;
  colaboradores: Colaborador[];
  onFechar: () => void;
}

export function WorkshopDetailPanel({
  workshop,
  colaboradores,
  onFechar,
}: WorkshopDetailPanelProps) {
  if (!workshop) return null;
  const participantes = participantesDoWorkshop(workshop, colaboradores);

  return (
    <>
      <div
        onClick={onFechar}
        className="fixed inset-0 z-30 bg-navy/40 backdrop-blur-[2px] lg:hidden"
        aria-hidden
      />
      <aside className="fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col border-l border-border bg-card shadow-panel lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:max-w-none lg:shadow-none">
        <header className="flex items-start justify-between gap-4 border-b border-border bg-navy p-5 text-navy-foreground">
          <div>
            <p className="mono-tag text-royal-soft">
              detalhe · {formatarTrimestre(workshop.dataRealizacao)}
            </p>
            <h2 className="mt-2 text-lg font-bold">{workshop.nome}</h2>
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar detalhes"
            className="rounded-md p-1.5 text-navy-muted transition-colors hover:bg-sidebar-accent hover:text-navy-foreground"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto p-5">
          <section>
            <p className="mono-tag flex items-center gap-2 text-primary">
              <CalendarClock className="size-3.5" />
              data e hora
            </p>
            <p className="mt-2 font-mono text-sm text-foreground">
              {formatarDataHora(workshop.dataRealizacao)}
            </p>
          </section>

          <section>
            <p className="mono-tag text-primary">descrição</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {workshop.descricao}
            </p>
          </section>

          <section>
            <p className="mono-tag flex items-center gap-2 text-primary">
              <Users className="size-3.5" />
              participantes ({participantes.length})
            </p>
            {participantes.length === 0 ? (
              <p className="mt-3 rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Nenhum colaborador registrado neste workshop.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {participantes.map((colaborador) => (
                  <li
                    key={colaborador.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                      {iniciais(colaborador.nome)}
                    </span>
                    <span className="flex-1 text-sm text-foreground">{colaborador.nome}</span>
                    <span className="mono-tag text-muted-foreground">
                      {formatarId(colaborador.id)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </aside>
    </>
  );
}
