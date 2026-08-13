import type { Workshop } from "@/data/mocks";
import { simulateRequest } from "./api";

/**
 * Persistência local do check-in de presença.
 * Fica na camada de serviço para que a troca por uma API real
 * não exija mudanças nos componentes.
 */
const STORAGE_KEY = "fast:presencas";

export type PresencaOverrides = Record<string, number[]>;

function disponivel(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function lerPresencas(): PresencaOverrides {
  if (!disponivel()) return {};
  try {
    const bruto = window.localStorage.getItem(STORAGE_KEY);
    if (!bruto) return {};
    const dados = JSON.parse(bruto) as PresencaOverrides;
    return typeof dados === "object" && dados !== null ? dados : {};
  } catch {
    return {};
  }
}

function gravar(dados: PresencaOverrides): void {
  if (!disponivel()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

/** Aplica o check-in local sobre a lista vinda da "API". */
export function aplicarPresencas(workshops: Workshop[]): Workshop[] {
  const overrides = lerPresencas();
  return workshops.map((workshop) => {
    const salvo = overrides[String(workshop.id)];
    return salvo ? { ...workshop, participantes: [...salvo].sort((a, b) => a - b) } : workshop;
  });
}

export async function alternarPresenca(
  workshop: Workshop,
  colaboradorId: number,
): Promise<number[]> {
  const overrides = lerPresencas();
  const atual = overrides[String(workshop.id)] ?? workshop.participantes;
  const proximo = atual.includes(colaboradorId)
    ? atual.filter((id) => id !== colaboradorId)
    : [...atual, colaboradorId];

  overrides[String(workshop.id)] = proximo.sort((a, b) => a - b);
  gravar(overrides);
  return simulateRequest(proximo, { delay: 150, resource: "a presença" });
}

export async function limparPresencas(): Promise<void> {
  if (disponivel()) window.localStorage.removeItem(STORAGE_KEY);
}
