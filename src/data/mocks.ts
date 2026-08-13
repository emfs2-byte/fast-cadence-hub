export interface Colaborador {
  id: number;
  nome: string;
}

export interface Workshop {
  id: number;
  nome: string;
  dataRealizacao: string; // ISO datetime
  descricao: string;
  participantes: number[];
}

export const colaboradoresMock: Colaborador[] = [
  { id: 1, nome: "Ana Beatriz Moraes" },
  { id: 2, nome: "Carlos Eduardo Lima" },
  { id: 3, nome: "Daniela Prado" },
  { id: 4, nome: "Felipe Nakamura" },
  { id: 5, nome: "Gabriela Torres" },
  { id: 6, nome: "Henrique Vasconcelos" },
  { id: 7, nome: "Isabela Ramos" },
];

export const workshopsMock: Workshop[] = [
  {
    id: 1,
    nome: "Clean Architecture na prática com .NET",
    dataRealizacao: "2026-03-19T16:00:00",
    descricao:
      "Sessão hands-on sobre separação de camadas, inversão de dependência e testabilidade em aplicações corporativas. Refatoramos um módulo legado ao vivo, discutindo trade-offs entre pragmatismo e pureza arquitetural.",
    participantes: [1, 2, 3, 5, 7],
  },
  {
    id: 2,
    nome: "Observabilidade: logs, métricas e tracing distribuído",
    dataRealizacao: "2026-06-18T16:00:00",
    descricao:
      "Do console.log ao OpenTelemetry. Instrumentamos um serviço real, configuramos dashboards de latência e criamos alertas úteis — sem ruído — para o time de plantão.",
    participantes: [2, 4, 6],
  },
  {
    id: 3,
    nome: "React moderno: performance e padrões de composição",
    dataRealizacao: "2026-09-17T16:00:00",
    descricao:
      "Memoização consciente, listas virtualizadas, Suspense e data fetching declarativo. Medimos o antes e depois com o React Profiler em um painel interno da FAST.",
    participantes: [1, 3, 4, 5, 6, 7],
  },
  {
    id: 4,
    nome: "Segurança em APIs: OWASP Top 10 aplicado",
    dataRealizacao: "2026-12-17T16:00:00",
    descricao:
      "Exploramos vulnerabilidades comuns em um ambiente controlado e aplicamos correções: autenticação, autorização por escopo, rate limiting e validação de entrada em todas as bordas.",
    participantes: [2, 3, 5, 6, 7],
  },
];
