<div align="center">

# 🧩 FAST Cadence Hub

**Sistema completo para acompanhar os workshops trimestrais da FAST Soluções — cadastro de colaboradores, agenda de workshops, ata de presença digital e métricas de participação em tempo real.**

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat-square\&logo=dotnet)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square\&logo=typescript\&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-LocalDB-CC2927?style=flat-square\&logo=microsoftsqlserver\&logoColor=white)
![EF Core](https://img.shields.io/badge/Entity_Framework-Core-512BD4?style=flat-square\&logo=dotnet)
![Swagger](https://img.shields.io/badge/Swagger-OAS_3.0-85EA2D?style=flat-square\&logo=swagger\&logoColor=black)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square\&logo=jsonwebtokens)
![License](https://img.shields.io/badge/Licença-Educacional-blue?style=flat-square)

</div>

---

## 📋 Descrição do Projeto

O **FAST Cadence Hub** centraliza o acompanhamento dos workshops trimestrais de desenvolvimento de software da FAST Soluções. Antes, a participação era controlada manualmente; agora o comitê organizador tem uma interface única para visualizar colaboradores, consultar os workshops realizados, registrar presença em tempo real (check-in) e enxergar métricas de engajamento ao longo do tempo.

O projeto é dividido em dois serviços independentes que conversam via API REST: um **backend em C#/.NET** responsável pelos dados e regras de negócio, e um **frontend em React** responsável pela experiência do comitê organizador.

## 🚀 Funcionalidades Principais

* 👥 **Cadastro de Colaboradores** — CRUD completo, com contagem automática de workshops concluídos por pessoa.
* 🗓️ **Agenda de Workshops** — lista ordenável por nome, data ou número de presentes, com painel de detalhes ao clicar.
* ✅ **Check-in de Presença (Ata Digital)** — registra e remove presença de colaboradores em tempo real, persistido no banco (não mais em mock ou localStorage).
* 📊 **Dashboard de Participação** — cards de métricas, linha do tempo de cadência trimestral (estilo grafo de commits) e gráficos de barra/pizza de engajamento.
* 🖨️ **Exportação de Ata em PDF** — gera o comprovante de presença de cada workshop com um clique.
* 🔐 **Autenticação JWT** — login do comitê organizador protege as ações de escrita (criar, editar, excluir e check-in); leitura permanece pública.
* 📖 **Documentação Interativa (Swagger)** — todos os endpoints documentados e testáveis direto no navegador.

## 🛠️ Tecnologias e Linguagens

| Camada         | Tecnologia                    | Função                                                         |
| -------------- | ----------------------------- | -------------------------------------------------------------- |
| Frontend       | React + TypeScript + Vite     | SPA com roteamento via TanStack Router                         |
| Estado & dados | TanStack Query                | Cache, loading e sincronização com a API                       |
| Estilo         | Tailwind CSS + shadcn/ui      | Componentes acessíveis e identidade visual azul/branco da FAST |
| Gráficos       | Recharts                      | Dashboard de participação                                      |
| Backend        | ASP.NET Core Web API (.NET 8) | API REST — CRUD de colaboradores, workshops e presenças        |
| ORM            | Entity Framework Core         | Mapeamento objeto-relacional e migrations                      |
| Banco de Dados | SQL Server LocalDB            | Persistência relacional local sem necessidade de container     |
| Autenticação   | JWT Bearer                    | Protege endpoints de escrita                                   |
| Documentação   | Swagger / Swashbuckle         | Exploração e teste dos endpoints                               |

## ⚙️ Pré-requisitos

* [.NET SDK 8.0+](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js 18+](https://nodejs.org)
* SQL Server Express **LocalDB**
* Ferramenta `dotnet-ef`: `dotnet tool install --global dotnet-ef --version 8.0.8`

> O projeto utiliza **SQL Server LocalDB** para desenvolvimento local. Não é necessário instalar ou executar Docker Desktop.

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/<seu-usuario>/fast-cadence-hub.git
cd fast-cadence-hub
```

### 2. Verificar o SQL Server LocalDB

No PowerShell, execute:

```powershell
sqllocaldb info
```

Se a instância `MSSQLLocalDB` ainda não existir, crie e inicie com:

```powershell
sqllocaldb create MSSQLLocalDB -s
```

Se ela já existir, mas estiver parada:

```powershell
sqllocaldb start MSSQLLocalDB
```

### 3. Subir o backend

```bash
cd backend/FastWorkshopsApi
dotnet restore
dotnet run
```

A API sobe em:

```text
http://localhost:5000
```

O backend aplica automaticamente as migrations existentes ao iniciar e cria/atualiza o banco `FastWorkshopsDb` no SQL Server LocalDB.

A documentação Swagger fica disponível em:

```text
http://localhost:5000/swagger
```

### 4. Subir o frontend

Em outro terminal:

```bash
cd ../..    # volta para a raiz do projeto
npm install
npm run dev
```

Acesse `http://localhost:8080` ou a porta indicada pelo Vite no terminal.

> O terminal do backend deve permanecer aberto enquanto o frontend estiver sendo utilizado.

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

No backend, a conexão com o banco é configurada em:

```text
backend/FastWorkshopsApi/appsettings.json
```

A connection string utilizada no desenvolvimento local é:

```text
Server=(localdb)\MSSQLLocalDB;Database=FastWorkshopsDb;Trusted_Connection=True;TrustServerCertificate=True;
```

> ⚠️ Nunca suba credenciais reais para o repositório — as configurações presentes no projeto são destinadas exclusivamente ao ambiente local de desenvolvimento/demonstração.

## 📖 Instruções de Uso

1. Acesse o frontend e explore a lista de **Colaboradores** e **Workshops** — leitura é pública, não exige login.
2. Para registrar presença, criar, editar ou excluir, clique em **Entrar** e use as credenciais de demonstração do comitê: `comite.workshops` / `fast@2025`.
3. Abra um workshop na lista para ver a descrição completa e fazer o check-in de cada colaborador.
4. No **Dashboard**, acompanhe a cadência trimestral e os gráficos de participação.
5. Exporte a ata de presença em PDF direto do painel de detalhes do workshop.

## 📂 Estrutura do Projeto

```text
fast-cadence-hub/
├── backend/
│   └── FastWorkshopsApi/
│       ├── Auth/              # Geração e validação de token JWT
│       ├── Controllers/       # Endpoints REST (Colaboradores, Workshops, Auth)
│       ├── Data/              # DbContext e configuração do modelo (EF Core)
│       ├── Dtos/              # Contratos de entrada/saída da API
│       ├── Migrations/        # Histórico de migrations do Entity Framework
│       ├── Models/            # Entidades do domínio
│       ├── Repositories/      # Acesso a dados por entidade
│       ├── Program.cs         # Configuração e inicialização da API
│       └── appsettings.json   # Connection string, JWT e configurações
│
├── src/
│   ├── components/
│   │   ├── colaboradores/     # Cards e listagem de colaboradores
│   │   ├── workshops/         # Lista e painel de detalhes/presença
│   │   ├── dashboard/         # Timeline de cadência e gráficos
│   │   ├── auth/              # Modal de login e botão de sessão
│   │   ├── feedback/          # Loading, empty e error states
│   │   └── layout/            # Cabeçalho e navegação
│   ├── hooks/                 # Hooks de dados e autenticação
│   ├── services/              # Chamadas à API
│   ├── data/                  # Tipos compartilhados
│   └── routes/                # Rotas do TanStack Router
│
└── README.md
```

## 🔌 Rotas Principais da API

### Auth

| Método | Rota              | Auth | Descrição                                             |
| ------ | ----------------- | ---- | ----------------------------------------------------- |
| POST   | `/api/auth/login` | não  | Autentica o comitê organizador e retorna um token JWT |

### Colaboradores

| Método | Rota                      | Auth | Descrição                    |
| ------ | ------------------------- | ---- | ---------------------------- |
| GET    | `/api/colaboradores`      | não  | Lista todos os colaboradores |
| GET    | `/api/colaboradores/{id}` | não  | Detalha um colaborador       |
| POST   | `/api/colaboradores`      | sim  | Cria um colaborador          |
| PUT    | `/api/colaboradores/{id}` | sim  | Atualiza um colaborador      |
| DELETE | `/api/colaboradores/{id}` | sim  | Remove um colaborador        |

### Workshops

| Método | Rota                                            | Auth | Descrição                                        |
| ------ | ----------------------------------------------- | ---- | ------------------------------------------------ |
| GET    | `/api/workshops`                                | não  | Lista todos os workshops                         |
| GET    | `/api/workshops/{id}`                           | não  | Detalha um workshop, com a ata de presença       |
| POST   | `/api/workshops`                                | sim  | Cria um workshop                                 |
| PUT    | `/api/workshops/{id}`                           | sim  | Atualiza um workshop                             |
| DELETE | `/api/workshops/{id}`                           | sim  | Remove um workshop                               |
| POST   | `/api/workshops/{id}/presencas`                 | sim  | Registra a presença de um colaborador (check-in) |
| DELETE | `/api/workshops/{id}/presencas/{colaboradorId}` | sim  | Remove a presença de um colaborador              |

## 🔐 Autenticação JWT

O login é realizado através do endpoint:

```text
POST /api/auth/login
```

Credenciais de demonstração:

```text
Usuário: comite.workshops
Senha: fast@2025
```

Após o login, a API retorna um token JWT.

Esse token é enviado nas operações protegidas através do header:

```http
Authorization: Bearer <token>
```

Ações de leitura permanecem públicas, enquanto criação, edição, exclusão e gerenciamento de presença exigem autenticação.

## 📖 Testando a API com Swagger

Com o backend em execução, acesse:

```text
http://localhost:5000/swagger
```

Para testar uma rota protegida:

1. Execute `POST /api/auth/login`.
2. Copie o token JWT retornado.
3. Clique no botão **Authorize** no topo do Swagger.
4. Informe o token.
5. Execute normalmente os endpoints protegidos.

## 📐 Decisões de Arquitetura

* **SQL Server LocalDB via EF Core** — mantém o banco relacional solicitado pelo desafio e elimina a necessidade de executar um container apenas para avaliação local.
* **Migrations automáticas** — o backend executa `Database.Migrate()` na inicialização, garantindo que o banco esteja atualizado ao executar a aplicação.
* **Camada de serviço isolada no frontend** — componentes nunca acessam `fetch` diretamente, o que tornou a migração de dados mockados para a API real transparente para a interface.
* **Repository Pattern no backend** — isola o acesso aos dados da lógica dos controllers e reduz o acoplamento com o Entity Framework.
* **DTOs em vez de expor entidades do EF diretamente** — evita acoplar o contrato da API ao schema do banco.
* **Presença como entidade própria (`Presenca`)** — relação muitos-para-muitos entre `Workshop` e `Colaborador`, permitindo consultar e gerenciar a ata de cada evento de forma independente.
* **JWT Bearer** — autenticação stateless para proteção dos endpoints de escrita, com validação de assinatura, emissor, audiência e validade do token.
* **Retornos HTTP adequados** — a API utiliza códigos como `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `401 Unauthorized` e `404 Not Found` de acordo com o resultado da operação.

## 🧪 Dados de Demonstração

Na primeira execução, o projeto disponibiliza dados iniciais de colaboradores, workshops e participações para facilitar a avaliação das funcionalidades.

Esses dados permitem testar imediatamente:

* listagem de colaboradores;
* listagem de workshops;
* detalhes de workshops;
* ata de presença;
* métricas de participação;
* dashboard.

## 📄 Licença

Uso educacional — desenvolvido como desafio técnico. Uso não comercial.

## 👤 Autor

**Erlon Matheus** — Desenvolvedor Full-Stack

---

*FAST Cadence Hub — desenvolvido para o desafio técnico da FAST Soluções.*
