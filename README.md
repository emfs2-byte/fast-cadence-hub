<div align="center">

# 🧩 FAST Cadence Hub

**Sistema completo para acompanhar os workshops trimestrais da FAST Soluções — cadastro de colaboradores, agenda de workshops, ata de presença digital e métricas de participação em tempo real.**

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat-square&logo=dotnet)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-2022-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-OAS_3.0-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)
![License](https://img.shields.io/badge/Licença-Educacional-blue?style=flat-square)

</div>

---

## 📋 Descrição do Projeto

O **FAST Cadence Hub** centraliza o acompanhamento dos workshops trimestrais de desenvolvimento de software da FAST Soluções. Antes, a participação era controlada manualmente; agora o comitê organizador tem uma interface única para visualizar colaboradores, consultar os workshops realizados, registrar presença em tempo real (check-in) e enxergar métricas de engajamento ao longo do tempo.

O projeto é dividido em dois serviços independentes que conversam via API REST: um **backend em C#/.NET** responsável pelos dados e regras de negócio, e um **frontend em React** responsável pela experiência do comitê organizador.

## 🚀 Funcionalidades Principais

- 👥 **Cadastro de Colaboradores** — CRUD completo, com contagem automática de workshops concluídos por pessoa.
- 🗓️ **Agenda de Workshops** — lista ordenável por nome, data ou número de presentes, com painel de detalhes ao clicar.
- ✅ **Check-in de Presença (Ata Digital)** — registra e remove presença de colaboradores em tempo real, persistido no banco (não mais em mock ou localStorage).
- 📊 **Dashboard de Participação** — cards de métricas, linha do tempo de cadência trimestral (estilo grafo de commits) e gráficos de barra/pizza de engajamento.
- 🖨️ **Exportação de Ata em PDF** — gera o comprovante de presença de cada workshop com um clique.
- 🔐 **Autenticação JWT** — login do comitê organizador protege as ações de escrita (criar, editar, excluir, check-in); leitura permanece pública.
- 📖 **Documentação Interativa (Swagger)** — todos os endpoints documentados e testáveis direto no navegador.

## 🛠️ Tecnologias e Linguagens

| Camada | Tecnologia | Função |
|---|---|---|
| Frontend | React + TypeScript + Vite | SPA com roteamento via TanStack Router |
| Estado & dados | TanStack Query | Cache, loading e sincronização com a API |
| Estilo | Tailwind CSS + shadcn/ui | Componentes acessíveis e identidade visual azul/branco da FAST |
| Gráficos | Recharts | Dashboard de participação |
| Backend | ASP.NET Core Web API (.NET 8) | API REST — CRUD de colaboradores, workshops e presenças |
| ORM | Entity Framework Core | Mapeamento objeto-relacional e migrations |
| Banco de Dados | SQL Server 2022 | Persistência relacional, via Docker |
| Autenticação | JWT Bearer | Protege endpoints de escrita |
| Documentação | Swagger / Swashbuckle | Exploração e teste dos endpoints |
| Infraestrutura | Docker Compose | Sobe o banco de dados com um comando |

## ⚙️ Pré-requisitos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Ferramenta `dotnet-ef`: `dotnet tool install --global dotnet-ef --version 8.0.8`

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/<seu-usuario>/fast-cadence-hub.git
cd fast-cadence-hub
```

### 2. Subir o backend

```bash
cd backend/FastWorkshopsApi
docker compose up -d
dotnet restore
dotnet ef migrations add InitialCreate
dotnet run
```

A API sobe em `http://localhost:5000` (modo desenvolvimento habilita o Swagger em `/swagger`) e aplica as migrations automaticamente, já populando dados de exemplo.

### 3. Subir o frontend

Em outro terminal:

```bash
cd ../..    # volta para a raiz do projeto
npm install
npm run dev
```

Acesse `http://localhost:8080` (ou a porta indicada no terminal).

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

No backend, ajuste `backend/FastWorkshopsApi/appsettings.json` se precisar trocar a connection string ou as credenciais do banco.

> ⚠️ Nunca suba credenciais reais para o repositório — as que estão no `appsettings.json` são apenas para desenvolvimento local.

## 📖 Instruções de Uso

1. Acesse o frontend e explore a lista de **Colaboradores** e **Workshops** — leitura é pública, não exige login.
2. Para registrar presença, editar ou excluir, clique em **Entrar** e use as credenciais de demonstração do comitê: `comite.workshops` / `fast@2025`.
3. Abra um workshop na lista para ver a descrição completa e fazer o check-in de cada colaborador.
4. No **Dashboard**, acompanhe a cadência trimestral e os gráficos de participação.
5. Exporte a ata de presença em PDF direto do painel de detalhes do workshop.

## 📂 Estrutura do Projeto

```
fast-cadence-hub/
├── backend/
│   └── FastWorkshopsApi/
│       ├── Auth/              # Geração e validação de token JWT
│       ├── Controllers/       # Endpoints REST (Colaboradores, Workshops, Auth)
│       ├── Data/               # DbContext e configuração do modelo (EF Core)
│       ├── Dtos/                # Contratos de entrada/saída da API
│       ├── Models/             # Entidades do domínio
│       ├── Repositories/       # Acesso a dados por entidade
│       ├── docker-compose.yml # Sobe o SQL Server local
│       └── Program.cs
│
├── src/
│   ├── components/
│   │   ├── colaboradores/     # Cards e listagem de colaboradores
│   │   ├── workshops/          # Lista e painel de detalhes/presença
│   │   ├── dashboard/          # Timeline de cadência e gráficos
│   │   ├── auth/                # Modal de login e botão de sessão
│   │   ├── feedback/            # Loading, empty e error states
│   │   └── layout/               # Cabeçalho e navegação
│   ├── hooks/                   # useWorkshopsData, useAuth
│   ├── services/                # Chamadas à API (colaboradores, workshops, auth)
│   ├── data/                     # Tipos compartilhados
│   └── routes/                   # Rotas do TanStack Router
│
└── README.md
```

## 🔌 Rotas Principais da API

### Auth

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/auth/login` | não | Autentica o comitê organizador e retorna um token JWT |

### Colaboradores

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/colaboradores` | não | Lista todos os colaboradores |
| GET | `/api/colaboradores/{id}` | não | Detalha um colaborador |
| POST | `/api/colaboradores` | sim | Cria um colaborador |
| PUT | `/api/colaboradores/{id}` | sim | Atualiza um colaborador |
| DELETE | `/api/colaboradores/{id}` | sim | Remove um colaborador |

### Workshops

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/workshops` | não | Lista todos os workshops |
| GET | `/api/workshops/{id}` | não | Detalha um workshop, com a ata de presença |
| POST | `/api/workshops` | sim | Cria um workshop |
| PUT | `/api/workshops/{id}` | sim | Atualiza um workshop |
| DELETE | `/api/workshops/{id}` | sim | Remove um workshop |
| POST | `/api/workshops/{id}/presencas` | sim | Registra a presença de um colaborador (check-in) |
| DELETE | `/api/workshops/{id}/presencas/{colaboradorId}` | sim | Remove a presença de um colaborador |

## 📐 Decisões de Arquitetura

- **SQL Server via EF Core** — banco relacional sugerido pelo desafio, com suporte nativo no ecossistema .NET; a troca para MySQL exige apenas alterar o provider do EF Core.
- **Camada de serviço isolada no frontend** — componentes nunca acessam `fetch` diretamente, o que tornou a migração de dados mockados para a API real transparente para a interface.
- **DTOs em vez de expor entidades do EF diretamente** — evita acoplar o contrato da API ao schema do banco.
- **Presença como entidade própria (`Presenca`)** — relação muitos-para-muitos entre `Workshop` e `Colaborador`, permitindo consultar a ata de cada evento de forma independente.

## 📄 Licença

Uso educacional — desenvolvido como desafio técnico. Uso não comercial.

## 👤 Autor

**Erlon Matheus** — Desenvolvedor Full-Stack

---

*FAST Cadence Hub — desenvolvido para o desafio técnico da FAST Soluções.*
