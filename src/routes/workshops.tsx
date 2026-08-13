import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Presentation } from "lucide-react";
import { EmptyState, ErrorState, SkeletonRows } from "@/components/feedback/StateViews";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkshopDetailPanel } from "@/components/workshops/WorkshopDetailPanel";
import { WorkshopList } from "@/components/workshops/WorkshopList";
import type { Workshop } from "@/data/mocks";
import { useColaboradores, useWorkshops } from "@/hooks/useWorkshopsData";
import { ordenarPorData } from "@/lib/participacao";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Workshops trimestrais | FAST Soluções" },
      {
        name: "description",
        content:
          "Agenda dos workshops trimestrais de engenharia da FAST Soluções com descrição, data e lista de presentes.",
      },
      { property: "og:title", content: "Workshops trimestrais | FAST Soluções" },
      {
        property: "og:description",
        content: "Agenda, descrição e participantes dos workshops trimestrais da FAST Soluções.",
      },
    ],
  }),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  const [selecionado, setSelecionado] = useState<Workshop | null>(null);
  const workshopsQuery = useWorkshops();
  const colaboradoresQuery = useColaboradores();

  const carregando = workshopsQuery.isLoading || colaboradoresQuery.isLoading;
  const erro = workshopsQuery.error ?? colaboradoresQuery.error;
  const workshops = ordenarPorData(workshopsQuery.data ?? []);

  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-1 space-y-6">
        <PageHeader
          eyebrow="cadência trimestral"
          title="Workshops"
          description="Clique em um workshop para ver a descrição completa, o horário e quem esteve presente."
        />

        {carregando ? (
          <SkeletonRows count={4} />
        ) : erro ? (
          <ErrorState
            message={erro.message}
            onRetry={() => {
              workshopsQuery.refetch();
              colaboradoresQuery.refetch();
            }}
          />
        ) : workshops.length === 0 ? (
          <EmptyState
            icon={<Presentation className="size-5" />}
            title="Nenhum workshop agendado"
            description="Quando o próximo encontro trimestral for registrado, ele aparece nesta lista."
          />
        ) : (
          <WorkshopList
            workshops={workshops}
            selecionadoId={selecionado?.id}
            onSelecionar={setSelecionado}
          />
        )}
      </div>

      <div className={selecionado ? "lg:w-96 lg:shrink-0" : ""}>
        <WorkshopDetailPanel
          workshop={selecionado}
          colaboradores={colaboradoresQuery.data ?? []}
          onFechar={() => setSelecionado(null)}
        />
      </div>
    </div>
  );
}
