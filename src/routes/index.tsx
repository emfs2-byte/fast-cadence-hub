import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ColaboradorCard } from "@/components/colaboradores/ColaboradorCard";
import { EmptyState, ErrorState, SkeletonGrid } from "@/components/feedback/StateViews";
import { PageHeader } from "@/components/layout/PageHeader";
import { useColaboradores, useWorkshops } from "@/hooks/useWorkshopsData";
import { contarParticipacoes } from "@/lib/participacao";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Colaboradores | FAST Soluções Workshops" },
      {
        name: "description",
        content:
          "Equipe da FAST Soluções e a participação de cada colaborador nos workshops trimestrais de engenharia.",
      },
      { property: "og:title", content: "Colaboradores | FAST Soluções Workshops" },
      {
        property: "og:description",
        content: "Equipe da FAST Soluções e a participação nos workshops trimestrais.",
      },
    ],
  }),
  component: ColaboradoresPage,
});

function ColaboradoresPage() {
  const colaboradoresQuery = useColaboradores();
  const workshopsQuery = useWorkshops();

  const carregando = colaboradoresQuery.isLoading || workshopsQuery.isLoading;
  const erro = colaboradoresQuery.error ?? workshopsQuery.error;
  const colaboradores = colaboradoresQuery.data ?? [];
  const workshops = workshopsQuery.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="equipe · fast soluções"
        title="Colaboradores"
        description="Todas as pessoas registradas no programa de workshops trimestrais, com o histórico de participação de cada uma."
        actions={
          !carregando && !erro ? (
            <span className="mono-tag rounded-md border border-border bg-muted px-3 py-2 text-muted-foreground">
              {colaboradores.length} registros
            </span>
          ) : null
        }
      />

      {carregando ? (
        <SkeletonGrid count={6} />
      ) : erro ? (
        <ErrorState
          message={erro.message}
          onRetry={() => {
            colaboradoresQuery.refetch();
            workshopsQuery.refetch();
          }}
        />
      ) : colaboradores.length === 0 ? (
        <EmptyState
          icon={<Users className="size-5" />}
          title="Nenhum colaborador cadastrado"
          description="Assim que a equipe for registrada, os cards de participação aparecem aqui."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {colaboradores.map((colaborador) => (
            <ColaboradorCard
              key={colaborador.id}
              colaborador={colaborador}
              participacoes={contarParticipacoes(colaborador.id, workshops)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
