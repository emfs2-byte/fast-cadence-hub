import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Colaborador, Workshop } from "@/data/mocks";
import { colaboradoresPorWorkshop, workshopsPorColaborador } from "@/lib/participacao";
import { ChartTooltip } from "./ChartTooltip";

const PIE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const axisStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fill: "var(--muted-foreground)",
};

function ChartCard({
  titulo,
  legenda,
  children,
}: {
  titulo: string;
  legenda: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card p-5">
      <p className="mono-tag text-primary">{legenda}</p>
      <h2 className="mt-1 text-base font-semibold text-foreground">{titulo}</h2>
      <div className="mt-5 h-72">{children}</div>
    </section>
  );
}

export function WorkshopsPorColaboradorChart({
  colaboradores,
  workshops,
}: {
  colaboradores: Colaborador[];
  workshops: Workshop[];
}) {
  const dados = workshopsPorColaborador(colaboradores, workshops);

  return (
    <ChartCard titulo="Workshops por colaborador" legenda="bar_chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados} margin={{ top: 8, right: 8, bottom: 8, left: -18 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="primeiroNome"
            tick={axisStyle}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            interval={0}
          />
          <YAxis
            allowDecimals={false}
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            cursor={{ fill: "var(--accent)" }}
            content={<ChartTooltip sufixo="workshops" titleKey="nome" />}
          />
          <Legend
            formatter={() => (
              <span className="mono-tag text-muted-foreground">workshops participados</span>
            )}
          />
          <Bar
            dataKey="total"
            name="workshops participados"
            fill="var(--chart-1)"
            radius={[6, 6, 0, 0]}
            maxBarSize={44}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ColaboradoresPorWorkshopChart({ workshops }: { workshops: Workshop[] }) {
  const dados = colaboradoresPorWorkshop(workshops);

  return (
    <ChartCard titulo="Colaboradores por workshop" legenda="pie_chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dados}
            dataKey="total"
            nameKey="curto"
            innerRadius={50}
            outerRadius={85}
            paddingAngle={3}
            stroke="var(--card)"
            strokeWidth={2}
          >
            {dados.map((_, index) => (
              <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip sufixo="colaboradores" titleKey="nome" />} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value: string) => (
              <span className="font-mono text-[11px] text-muted-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
