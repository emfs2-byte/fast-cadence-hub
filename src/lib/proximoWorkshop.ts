import type { Workshop } from "@/data/mocks";

export interface ProximoWorkshopInfo {
  workshop: Workshop;
  diasRestantes: number;
}

export function proximoWorkshop(
  workshops: Workshop[],
  agora: Date = new Date(),
): ProximoWorkshopInfo | null {
  const futuros = workshops
    .filter((workshop) => new Date(workshop.dataRealizacao).getTime() > agora.getTime())
    .sort((a, b) => new Date(a.dataRealizacao).getTime() - new Date(b.dataRealizacao).getTime());

  const alvo = futuros[0];
  if (!alvo) return null;

  const inicioHoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate()).getTime();
  const data = new Date(alvo.dataRealizacao);
  const inicioAlvo = new Date(data.getFullYear(), data.getMonth(), data.getDate()).getTime();
  const diasRestantes = Math.round((inicioAlvo - inicioHoje) / 86_400_000);

  return { workshop: alvo, diasRestantes };
}
