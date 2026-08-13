import { CalendarClock, Check, Download, Users, X } from "lucide-react";
import { useState } from "react";
import type { Colaborador, Workshop } from "@/data/mocks";
import { exportarAtaPdf } from "@/lib/ata-pdf";
import { formatarDataHora, formatarId, formatarTrimestre, iniciais } from "@/lib/format";

interface WorkshopDetailPanelProps {
  workshop: Workshop | null;
  colaboradores: Colaborador[];
  onAlternarPresenca: (colaboradorId: number) => void;
  onFechar: () => void;
}

export function WorkshopDetailPanel({
  workshop,
  colaboradores,
  onAlternarPresenca,
  onFechar,
}: WorkshopDetailPanelProps) {
  const [exportando, setExportando] = useState(false);

  if (!workshop) return null;
  const presentes = workshop.participantes.length;

  async function exportar() {
    if (!workshop) return;
    setExportando(true);
    try {
      await exportarAtaPdf(workshop, colaboradores);
    } finally {
      setExportando(false);
    }
  }

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
              check-in de presença ({presentes}/{colaboradores.length})
            </p>
            {colaboradores.length === 0 ? (
              <p className="mt-3 rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Nenhum colaborador cadastrado para registrar presença.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {colaboradores.map((colaborador) => {
                  const presente = workshop.participantes.includes(colaborador.id);
                  return (
                    <li key={colaborador.id}>
                      <button
                        type="button"
                        onClick={() => onAlternarPresenca(colaborador.id)}
                        aria-pressed={presente}
                        className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors ${
                          presente
                            ? "border-primary/40 bg-accent/60"
                            : "border-border bg-muted/30 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                          {iniciais(colaborador.nome)}
                        </span>
                        <span className="flex-1 text-sm text-foreground">{colaborador.nome}</span>
                        <span className="mono-tag text-muted-foreground">
                          {formatarId(colaborador.id)}
                        </span>
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded border ${
                            presente
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          }`}
                        >
                          {presente ? <Check className="size-3.5" /> : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <footer className="border-t border-border p-5">
          <button
            type="button"
            onClick={exportar}
            disabled={exportando}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            <Download className="size-4" />
            {exportando ? "Gerando ata…" : "Exportar ata (PDF)"}
          </button>
        </footer>
      </aside>
    </>
  );
}
