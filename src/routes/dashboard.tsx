import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CalendarCheck, Percent, Users } from "lucide-react";
import { CadenceTimeline } from "@/components/dashboard/CadenceTimeline";
import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  ColaboradoresPorWorkshopChart,
  WorkshopsPorColaboradorChart,
} from "@/components/dashboard/ParticipacaoCharts";
import { EmptyState, ErrorState, LoadingState } from "@/components/feedback/StateViews";
import { PageHeader } from "@/components/layout/PageHeader";
import { useColaboradores, useWorkshops } from "@/hooks/useWorkshopsData";
import { taxaMediaPresenca } from "@/lib/participacao";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard de participação | FAST Soluções" },
      {
        name: "description",
        content:
          "Métricas de participação nos workshops trimestrais da FAST Soluções: cadência, presença por colaborador e por evento.",
      },
      { property: "og:title", content: "Dashboard de participação | FAST Soluções" },
      {
        property: "og:description",
        content: "Cadência trimestral e métricas de presença nos workshops da FAST Soluções.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const colaboradoresQuery = useColaboradores();
  const workshopsQuery = useWorkshops();

  const carregando = colaboradoresQuery.isLoading || workshopsQuery.isLoading;
  const erro = colaboradoresQuery.error ?? workshopsQuery.error;
  const colaboradores = colaboradoresQuery.data ?? [];
  const workshops = workshopsQuery.data ?? [];

  const totalPresencas = workshops.reduce((acc, w) => acc + w.participantes.length, 0);
  const taxa = taxaMediaPresenca(workshops, colaboradores.length);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="métricas de participação"
        title="Dashboard"
        description="Visão consolidada da cadência trimestral e do engajamento da equipe nos workshops."
      />

      {carregando ? (
        <LoadingState label="calculando métricas" />
      ) : erro ? (
        <ErrorState
          message={erro.message}
          onRetry={() => {
            colaboradoresQuery.refetch();
            workshopsQuery.refetch();
          }}
        />
      ) : workshops.length === 0 || colaboradores.length === 0 ? (
        <EmptyState
          icon={<BarChart3 className="size-5" />}
          title="Sem dados para gerar métricas"
          description="É preciso ter ao menos um workshop e um colaborador registrados para exibir os gráficos."
        />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="workshops"
              valor={workshops.length}
              detalhe="encontros trimestrais realizados"
              icon={CalendarCheck}
            />
            <MetricCard
              label="colaboradores"
              valor={colaboradores.length}
              detalhe="pessoas no programa"
              icon={Users}
            />
            <MetricCard
              label="presenças"
              valor={totalPresencas}
              detalhe="soma de participações"
              icon={BarChart3}
            />
            <MetricCard
              label="taxa média"
              valor={`${taxa}%`}
              detalhe="presença média por workshop"
              icon={Percent}
            />
          </div>

          <CadenceTimeline workshops={workshops} />

          <div className="grid gap-6 xl:grid-cols-2">
            <WorkshopsPorColaboradorChart colaboradores={colaboradores} workshops={workshops} />
            <ColaboradoresPorWorkshopChart workshops={workshops} />
          </div>
        </div>
      )}
    </div>
  );
}
