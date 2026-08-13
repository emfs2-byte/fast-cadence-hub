import type { Colaborador, Workshop } from "@/data/mocks";

export function contarParticipacoes(colaboradorId: number, workshops: Workshop[]): number {
  return workshops.filter((workshop) => workshop.participantes.includes(colaboradorId)).length;
}

export function participantesDoWorkshop(
  workshop: Workshop,
  colaboradores: Colaborador[],
): Colaborador[] {
  return workshop.participantes
    .map((id) => colaboradores.find((colaborador) => colaborador.id === id))
    .filter((colaborador): colaborador is Colaborador => Boolean(colaborador));
}

export function workshopsPorColaborador(colaboradores: Colaborador[], workshops: Workshop[]) {
  return colaboradores
    .map((colaborador) => ({
      nome: colaborador.nome,
      primeiroNome: colaborador.nome.split(" ")[0] ?? colaborador.nome,
      total: contarParticipacoes(colaborador.id, workshops),
    }))
    .sort((a, b) => b.total - a.total);
}

export function colaboradoresPorWorkshop(workshops: Workshop[]) {
  return workshops.map((workshop) => ({
    nome: workshop.nome,
    curto: workshop.nome.length > 26 ? `${workshop.nome.slice(0, 26)}…` : workshop.nome,
    total: workshop.participantes.length,
  }));
}

export function ordenarPorData(workshops: Workshop[]): Workshop[] {
  return [...workshops].sort(
    (a, b) => new Date(a.dataRealizacao).getTime() - new Date(b.dataRealizacao).getTime(),
  );
}

export function taxaMediaPresenca(workshops: Workshop[], totalColaboradores: number): number {
  if (!workshops.length || !totalColaboradores) return 0;
  const soma = workshops.reduce((acc, workshop) => acc + workshop.participantes.length, 0);
  return Math.round((soma / (workshops.length * totalColaboradores)) * 100);
}
