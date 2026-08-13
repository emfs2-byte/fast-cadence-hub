import { colaboradoresMock, type Colaborador } from "@/data/mocks";
import { ApiError, simulateRequest } from "./api";

export async function listarColaboradores(): Promise<Colaborador[]> {
  return simulateRequest(colaboradoresMock, { resource: "os colaboradores" });
}

export async function buscarColaborador(id: number): Promise<Colaborador> {
  const colaboradores = await listarColaboradores();
  const colaborador = colaboradores.find((item) => item.id === id);
  if (!colaborador) throw new ApiError(`Colaborador ${id} não encontrado.`);
  return colaborador;
}
