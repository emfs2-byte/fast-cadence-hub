import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Workshop } from "@/data/mocks";
import { listarColaboradores } from "@/services/colaboradoresService";
import {
  buscarWorkshop,
  listarWorkshops as listarWorkshopsResumo,
  registrarPresenca,
  removerPresenca,
} from "@/services/workshopsService";

/**
 * O resto da aplicação (WorkshopList, WorkshopDetailPanel, gráficos do
 * Dashboard) foi construído sobre o formato antigo de Workshop, com
 * `participantes` como array de IDs. Para não precisar alterar esses
 * componentes, buscamos o detalhe completo de cada workshop (que já traz os
 * participantes reais vindos do banco) e adaptamos aqui, na borda entre a
 * API e a UI — o resto do app nem percebe a diferença.
 */
async function buscarWorkshopsCompletos(): Promise<Workshop[]> {
  const resumos = await listarWorkshopsResumo();
  const detalhes = await Promise.all(resumos.map((resumo) => buscarWorkshop(resumo.id)));

  return detalhes.map((detalhe) => ({
    id: detalhe.id,
    nome: detalhe.nome,
    dataRealizacao: detalhe.dataRealizacao,
    descricao: detalhe.descricao,
    participantes: detalhe.participantes.map((colaborador) => colaborador.id),
  }));
}

export function useColaboradores() {
  return useQuery({
    queryKey: ["colaboradores"],
    queryFn: listarColaboradores,
    retry: false,
  });
}

export function useWorkshops() {
  return useQuery({
    queryKey: ["workshops"],
    queryFn: buscarWorkshopsCompletos,
    retry: false,
  });
}

export function useAlternarPresenca() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      workshop,
      colaboradorId,
    }: {
      workshop: Workshop;
      colaboradorId: number;
    }) => {
      const jaPresente = workshop.participantes.includes(colaboradorId);

      if (jaPresente) {
        await removerPresenca(workshop.id, colaboradorId);

        return workshop.participantes.filter((id) => id !== colaboradorId);
      }

      await registrarPresenca(workshop.id, colaboradorId);

      return [...workshop.participantes, colaboradorId].sort((a, b) => a - b);
    },

    onSuccess: (participantes, { workshop, colaboradorId }) => {
      const estavaPresente = workshop.participantes.includes(colaboradorId);

      queryClient.setQueryData<Workshop[]>(["workshops"], (anterior) =>
        anterior?.map((item) => (item.id === workshop.id ? { ...item, participantes } : item)),
      );

      toast.success(
        estavaPresente ? "Presença removida com sucesso." : "Presença registrada com sucesso.",
      );
    },

    onError: (erro) => {
      toast.error(erro instanceof Error ? erro.message : "Não foi possível atualizar a presença.");

      queryClient.invalidateQueries({
        queryKey: ["workshops"],
      });
    },
  });
}
