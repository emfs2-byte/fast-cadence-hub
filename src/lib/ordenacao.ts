import type { Workshop } from "@/data/mocks";

export type CampoOrdem = "nome" | "data" | "presentes";
export type DirecaoOrdem = "asc" | "desc";

export function ordenarWorkshops(
  workshops: Workshop[],
  campo: CampoOrdem,
  direcao: DirecaoOrdem,
): Workshop[] {
  const fator = direcao === "asc" ? 1 : -1;
  return [...workshops].sort((a, b) => {
    if (campo === "nome") return a.nome.localeCompare(b.nome, "pt-BR") * fator;
    if (campo === "presentes") {
      return (a.participantes.length - b.participantes.length) * fator;
    }
    return (new Date(a.dataRealizacao).getTime() - new Date(b.dataRealizacao).getTime()) * fator;
  });
}

export function filtrarPorNome<T extends { nome: string }>(itens: T[], termo: string): T[] {
  const busca = termo.trim().toLowerCase();
  if (!busca) return itens;
  return itens.filter((item) => item.nome.toLowerCase().includes(busca));
}
