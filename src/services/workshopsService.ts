import { workshopsMock, type Workshop } from "@/data/mocks";
import { ApiError, simulateRequest } from "./api";

export async function listarWorkshops(): Promise<Workshop[]> {
  return simulateRequest(workshopsMock, { resource: "os workshops" });
}

export async function buscarWorkshop(id: number): Promise<Workshop> {
  const workshops = await listarWorkshops();
  const workshop = workshops.find((item) => item.id === id);
  if (!workshop) throw new ApiError(`Workshop ${id} não encontrado.`);
  return workshop;
}
