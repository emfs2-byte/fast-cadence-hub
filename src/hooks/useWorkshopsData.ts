import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Workshop } from "@/data/mocks";
import { listarColaboradores } from "@/services/colaboradoresService";
import { alternarPresenca } from "@/services/presencaService";
import { listarWorkshops } from "@/services/workshopsService";

export function useColaboradores() {
  return useQuery({ queryKey: ["colaboradores"], queryFn: listarColaboradores, retry: false });
}

export function useWorkshops() {
  return useQuery({ queryKey: ["workshops"], queryFn: listarWorkshops, retry: false });
}

export function useAlternarPresenca() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ workshop, colaboradorId }: { workshop: Workshop; colaboradorId: number }) =>
      alternarPresenca(workshop, colaboradorId),
    onSuccess: (participantes, { workshop }) => {
      queryClient.setQueryData<Workshop[]>(["workshops"], (anterior) =>
        anterior?.map((item) => (item.id === workshop.id ? { ...item, participantes } : item)),
      );
    },
  });
}
