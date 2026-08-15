import { apiFetch } from "./api";

export interface Colaborador {
  id: number;
  nome: string;
  totalWorkshops: number;
}

export interface ColaboradorInput {
  nome: string;
}

export async function listarColaboradores(): Promise<Colaborador[]> {
  return apiFetch<Colaborador[]>("/colaboradores");
}

export async function buscarColaborador(id: number): Promise<Colaborador> {
  return apiFetch<Colaborador>(`/colaboradores/${id}`);
}

export async function criarColaborador(dados: ColaboradorInput): Promise<Colaborador> {
  return apiFetch<Colaborador>("/colaboradores", {
    method: "POST",
    body: JSON.stringify(dados),
    auth: true,
  });
}

export async function atualizarColaborador(
  id: number,
  dados: ColaboradorInput
): Promise<void> {
  await apiFetch<void>(`/colaboradores/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
    auth: true,
  });
}

export async function removerColaborador(id: number): Promise<void> {
  await apiFetch<void>(`/colaboradores/${id}`, {
    method: "DELETE",
    auth: true,
  });
}