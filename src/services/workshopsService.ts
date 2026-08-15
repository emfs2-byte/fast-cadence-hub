import { apiFetch } from "./api";
import type { Colaborador } from "./colaboradoresService";

/** Forma resumida, usada na listagem (GET /api/workshops). */
export interface WorkshopResumo {
  id: number;
  nome: string;
  dataRealizacao: string;
  totalPresentes: number;
}

/** Forma completa, usada na tela de detalhes (GET /api/workshops/{id}). */
export interface WorkshopDetalhe {
  id: number;
  nome: string;
  dataRealizacao: string;
  descricao: string;
  participantes: Colaborador[];
}

export interface WorkshopInput {
  nome: string;
  dataRealizacao: string; // ISO 8601, ex: "2026-03-12T16:00:00Z"
  descricao: string;
}

export async function listarWorkshops(): Promise<WorkshopResumo[]> {
  return apiFetch<WorkshopResumo[]>("/workshops");
}

export async function buscarWorkshop(id: number): Promise<WorkshopDetalhe> {
  return apiFetch<WorkshopDetalhe>(`/workshops/${id}`);
}

export async function criarWorkshop(dados: WorkshopInput): Promise<WorkshopResumo> {
  return apiFetch<WorkshopResumo>("/workshops", {
    method: "POST",
    body: JSON.stringify(dados),
    auth: true,
  });
}

export async function atualizarWorkshop(id: number, dados: WorkshopInput): Promise<void> {
  await apiFetch<void>(`/workshops/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
    auth: true,
  });
}

export async function removerWorkshop(id: number): Promise<void> {
  await apiFetch<void>(`/workshops/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

/** Registra a presença (check-in) de um colaborador na ata do workshop. */
export async function registrarPresenca(
  workshopId: number,
  colaboradorId: number
): Promise<void> {
  await apiFetch<void>(`/workshops/${workshopId}/presencas`, {
    method: "POST",
    body: JSON.stringify({ colaboradorId }),
    auth: true,
  });
}

/** Remove a presença de um colaborador da ata do workshop. */
export async function removerPresenca(
  workshopId: number,
  colaboradorId: number
): Promise<void> {
  await apiFetch<void>(`/workshops/${workshopId}/presencas/${colaboradorId}`, {
    method: "DELETE",
    auth: true,
  });
}