import type { Workshop } from "@/data/mocks";
import { formatarData, formatarTrimestre } from "@/lib/format";
import { ordenarPorData } from "@/lib/participacao";

interface CadenceTimelineProps {
  workshops: Workshop[];
}

/**
 * Elemento assinatura: grafo de cadência trimestral no estilo git graph.
 * Cada nó é um workshop posicionado pela data real; o raio é proporcional
 * ao número de participantes.
 */
export function CadenceTimeline({ workshops }: CadenceTimelineProps) {
  const ordenados = ordenarPorData(workshops);
  if (ordenados.length === 0) return null;

  const tempos = ordenados.map((w) => new Date(w.dataRealizacao).getTime());
  const inicio = Math.min(...tempos);
  const fim = Math.max(...tempos);
  const intervalo = fim - inicio || 1;
  const maxParticipantes = Math.max(...ordenados.map((w) => w.participantes.length), 1);

  const nos = ordenados.map((workshop, index) => {
    const t = new Date(workshop.dataRealizacao).getTime();
    const x = ordenados.length === 1 ? 50 : 6 + ((t - inicio) / intervalo) * 88;
    return {
      workshop,
      x,
      raio: 8 + (workshop.participantes.length / maxParticipantes) * 12,
      acima: index % 2 === 0,
    };
  });

  return (
    <section className="surface-card overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
        <div>
          <p className="mono-tag text-primary">git log --workshops</p>
          <h2 className="mt-1 text-base font-semibold text-foreground">
            Linha do tempo de cadência trimestral
          </h2>
        </div>
        <p className="mono-tag text-muted-foreground">nó ∝ nº de participantes</p>
      </header>

      <div className="overflow-x-auto bg-navy px-5 py-8">
        <div className="relative h-64 min-w-[42rem]">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-sidebar-border" />
          {nos.map(({ workshop, x, raio, acima }) => (
            <div
              key={workshop.id}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%` }}
            >
              <span
                className="block rounded-full border-2 border-royal-soft bg-navy transition-transform hover:scale-110"
                style={{
                  width: raio * 2,
                  height: raio * 2,
                  boxShadow: "0 0 0 6px color-mix(in oklab, var(--royal) 18%, transparent)",
                }}
              />
              <div
                className={`absolute left-1/2 w-44 -translate-x-1/2 text-center ${
                  acima ? "bottom-full mb-4" : "top-full mt-4"
                }`}
              >
                <p className="mono-tag text-royal-soft">
                  {formatarTrimestre(workshop.dataRealizacao)} · {formatarData(
                    workshop.dataRealizacao,
                  )}
                </p>
                <p className="mt-1 text-xs font-medium leading-snug text-navy-foreground">
                  {workshop.nome}
                </p>
                <p className="mono-tag mt-1 text-navy-muted">
                  {workshop.participantes.length} presentes
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
