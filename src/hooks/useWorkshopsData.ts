import { useQuery } from "@tanstack/react-query";
import { listarColaboradores } from "@/services/colaboradoresService";
import { listarWorkshops } from "@/services/workshopsService";

export function useColaboradores() {
  return useQuery({ queryKey: ["colaboradores"], queryFn: listarColaboradores, retry: false });
}

export function useWorkshops() {
  return useQuery({ queryKey: ["workshops"], queryFn: listarWorkshops, retry: false });
}
