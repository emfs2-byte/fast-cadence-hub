import { CalendarClock } from "lucide-react";
import { useWorkshops } from "@/hooks/useWorkshopsData";
import { formatarData } from "@/lib/format";
import { proximoWorkshop } from "@/lib/proximoWorkshop";

function rotuloContagem(dias: number): string {
  if (dias <= 0) return "é hoje";
  if (dias === 1) return "falta 1 dia";
  return `faltam ${dias} dias`;
}

export function NextWorkshopBanner() {
  const { data } = useWorkshops();
  const proximo = proximoWorkshop(data ?? []);

  if (!proximo) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-primary/25 bg-accent/50 px-4 py-2.5">
      <CalendarClock className="size-4 shrink-0 text-primary" />
      <span className="mono-tag text-primary">próximo workshop · {rotuloContagem(proximo.diasRestantes)}</span>
      <span className="min-w-0 flex-1 truncate text-sm text-foreground">
        {proximo.workshop.nome}
      </span>
      <span className="mono-tag text-muted-foreground">
        {formatarData(proximo.workshop.dataRealizacao)}
      </span>
    </div>
  );
}
