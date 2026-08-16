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

O **FAST Cadence Hub** centraliza o acompanhamento dos workshops trimestrais de desenvolvimento de software da FAST Soluções.

A aplicação permite ao comitê organizador visualizar colaboradores, consultar os workshops realizados, registrar presença em tempo real por meio de uma ata digital e acompanhar métricas de participação ao longo do tempo.

O projeto é dividido em dois serviços independentes que se comunicam via **API REST**:

* um **backend em C# / ASP.NET Core**, responsável pelos dados, persistência, autenticação e regras de negócio;
* um **frontend em React + TypeScript**, responsável pela experiência do usuário e visualização dos dados.

---

## 🖼️ Demonstração

### 📊 Dashboard

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/31595b70-e858-44a6-95b5-6134b93b1607"
    alt="Dashboard do FAST Cadence Hub"
    width="900"
  />
</p>

### 🗓️ Workshops

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/e2d89b15-18da-402e-b841-e0f63f9633e0"
    alt="Tela de workshops do FAST Cadence Hub"
    width="900"
  />
</p>

### 👥 Colaboradores

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/e0c57d83-6df3-4181-bd1b-7afbb0692ad2"
    alt="Tela de colaboradores do FAST Cadence Hub"
    width="900"
  />
</p>

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/9e6c2a8c-86cc-4580-a29d-e90fc5d68972"
    alt="Gestão de colaboradores do FAST Cadence Hub"
    width="900"
  />
</p>

### 📖 Swagger / API

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/b9c4d41e-928b-44ab-802e-9abaf16f883a"
    alt="Documentação Swagger da API FAST Cadence Hub"
    width="900"
  />
</p>

---

## 🚀 Funcionalidades Principais

* 👥 **Cadastro de Colaboradores** — CRUD completo, com contagem automática de workshops participados por pessoa.
* 🗓️ **Agenda de Workshops** — lista ordenável por nome, data ou número de presentes, com painel de detalhes.
* ✅ **Check-in de Presença (Ata Digital)** — registra e remove presença de colaboradores com persistência no banco de dados.
* 📊 **Dashboard de Participação** — cards de métricas, linha do tempo de cadência trimestral e gráficos de participação.
* 🖨️ **Exportação de Ata em PDF** — gera um documento com os dados e participantes de cada workshop.
* 🔐 **Autenticação JWT** — protege operações de criação, edição, exclusão e gerenciamento de presença.
* 🌐 **Leitura Pública** — consultas de colaboradores e workshops podem ser realizadas sem autenticação.
* 📖 **Documentação Interativa (Swagger)** — endpoints documentados e testáveis diretamente pelo navegador.

---

## 🛠️ Tecnologias e Linguagens

| Camada         | Tecnologia                    | Função                                    |
| -------------- | ----------------------------- | ----------------------------------------- |
| Frontend       | React + TypeScript + Vite     | Interface web                             |
| Roteamento     | TanStack Router               | Navegação da aplicação                    |
| Estado & dados | TanStack Query                | Cache, loading e sincronização com a API  |
| Estilo         | Tailwind CSS + shadcn/ui      | Componentes e identidade visual           |
| Gráficos       | Recharts                      | Dashboard de participação                 |
| PDF            | jsPDF                         | Exportação da ata dos workshops           |
| Backend        | ASP.NET Core Web API (.NET 8) | API REST                                  |
| ORM            | Entity Framework Core         | Mapeamento objeto-relacional e migrations |
| Banco de Dados | SQL Server LocalDB            | Persistência relacional                   |
| Autenticação   | JWT Bearer                    | Proteção dos endpoints de escrita         |
| Documentação   | Swagger / Swashbuckle         | Exploração e teste dos endpoints          |

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, tenha instalado:

* [.NET SDK 8.0+](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js 18+](https://nodejs.org)
* SQL Server Express **LocalDB**

> O projeto utiliza **SQL Server LocalDB** como banco de desenvolvimento local. Não é necessário instalar ou executar Docker Desktop.

A ferramenta `dotnet-ef` é necessária apenas caso seja necessário criar ou gerenciar migrations manualmente:

```powershell
dotnet tool install --global dotnet-ef --version 8.0.8
```

---

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/emfs2-byte/fast-cadence-hub.git
cd fast-cadence-hub
```

---

### 2. Verificar o SQL Server LocalDB

No PowerShell:

```powershell
sqllocaldb info
```

Se aparecer:

```text
MSSQLLocalDB
```

a instância já existe.

Caso a instância ainda não tenha sido criada:

```powershell
sqllocaldb create MSSQLLocalDB -s
```

Caso exista, mas esteja parada:

```powershell
sqllocaldb start MSSQLLocalDB
```

---

### 3. Executar o backend

Entre na pasta da API:

```bash
cd backend/FastWorkshopsApi
```

Restaure as dependências:

```bash
dotnet restore
```

Execute a aplicação:

```bash
dotnet run
```

A API ficará disponível em:

```text
http://localhost:5000
```

O backend aplica automaticamente as migrations existentes durante a inicialização e cria/atualiza o banco:

```text
FastWorkshopsDb
```

A documentação Swagger pode ser acessada em:

```text
http://localhost:5000/swagger
```

> Mantenha esse terminal aberto enquanto estiver utilizando o frontend.

---

### 4. Configurar o frontend

Na raiz do projeto, crie um arquivo:

```text
.env
```

com:

```env
VITE_API_URL=http://localhost:5000/api
```

O `.env` está incluído no `.gitignore` e não deve ser versionado.

---

### 5. Executar o frontend

Abra outro terminal e volte para a raiz do projeto:

```bash
cd ../..
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Acesse a URL exibida pelo Vite no terminal.

Exemplo:

```text
http://localhost:8080
```

---

## 📖 Instruções de Uso

1. Inicie o **backend** e o **frontend**.
2. Acesse a aplicação pelo endereço exibido pelo Vite.
3. Explore as páginas de **Dashboard**, **Colaboradores** e **Workshops**.
4. Abra um workshop para visualizar sua descrição e a lista de participantes.
5. Para executar ações protegidas, autentique-se utilizando as credenciais de demonstração.
6. Registre ou remova participantes através da ata digital.
7. Utilize o Dashboard para acompanhar as métricas de participação.
8. Exporte a ata de um workshop em PDF quando necessário.

### Credenciais de demonstração

```text
Usuário: comite.workshops
Senha: fast@2025
```

> As credenciais existem exclusivamente para demonstração local do desafio técnico.

---

## 📂 Estrutura do Projeto

```text
fast-cadence-hub/
├── backend/
│   └── FastWorkshopsApi/
│       ├── Auth/              # Configuração e geração do JWT
│       ├── Controllers/       # Endpoints da API
│       ├── Data/              # DbContext e configuração do EF Core
│       ├── Dtos/              # Contratos de entrada e saída
│       ├── Migrations/        # Histórico de migrations
│       ├── Models/            # Entidades de domínio
│       ├── Repositories/      # Acesso aos dados
│       ├── Program.cs         # Configuração da aplicação
│       ├── appsettings.json   # Banco, JWT e configurações
│       └── FastWorkshopsApi.csproj
│
├── src/
│   ├── components/
│   │   ├── colaboradores/     # Gestão de colaboradores
│   │   ├── workshops/         # Workshops e ata de presença
│   │   ├── dashboard/         # Métricas e gráficos
│   │   ├── auth/              # Autenticação
│   │   ├── feedback/          # Loading, erros e estados vazios
│   │   └── layout/            # Estrutura visual
│   ├── hooks/                 # Hooks de dados e autenticação
│   ├── services/              # Comunicação com a API
│   ├── data/                  # Tipos e estruturas compartilhadas
│   └── routes/                # Rotas da aplicação
│
├── package.json
└── README.md
```

---

## 🔌 Rotas Principais da API

### 🔐 Auth

| Método | Rota              | Auth | Descrição                                 |
| ------ | ----------------- | ---- | ----------------------------------------- |
| POST   | `/api/auth/login` | Não  | Autentica o comitê e retorna um token JWT |

### 👥 Colaboradores

| Método | Rota                      | Auth | Descrição                    |
| ------ | ------------------------- | ---- | ---------------------------- |
| GET    | `/api/colaboradores`      | Não  | Lista todos os colaboradores |
| GET    | `/api/colaboradores/{id}` | Não  | Detalha um colaborador       |
| POST   | `/api/colaboradores`      | Sim  | Cria um colaborador          |
| PUT    | `/api/colaboradores/{id}` | Sim  | Atualiza um colaborador      |
| DELETE | `/api/colaboradores/{id}` | Sim  | Remove um colaborador        |

### 🗓️ Workshops

| Método | Rota                                            | Auth | Descrição                                 |
| ------ | ----------------------------------------------- | ---- | ----------------------------------------- |
| GET    | `/api/workshops`                                | Não  | Lista todos os workshops                  |
| GET    | `/api/workshops/{id}`                           | Não  | Detalha um workshop e sua ata de presença |
| POST   | `/api/workshops`                                | Sim  | Cria um workshop                          |
| PUT    | `/api/workshops/{id}`                           | Sim  | Atualiza um workshop                      |
| DELETE | `/api/workshops/{id}`                           | Sim  | Remove um workshop                        |
| POST   | `/api/workshops/{id}/presencas`                 | Sim  | Registra presença de um colaborador       |
| DELETE | `/api/workshops/{id}/presencas/{colaboradorId}` | Sim  | Remove a presença de um colaborador       |

---

## 🔐 Autenticação JWT

O login é realizado através de:

```http
POST /api/auth/login
```

Exemplo de credenciais:

```text
Usuário: comite.workshops
Senha: fast@2025
```

Após a autenticação, a API retorna um **JSON Web Token (JWT)**.

O token deve ser enviado nos endpoints protegidos:

```http
Authorization: Bearer <token>
```

As operações de leitura são públicas.

As operações de criação, edição, exclusão e gerenciamento de presença exigem autenticação.

---

## 📖 Testando a API com Swagger

Com o backend em execução, acesse:

```text
http://localhost:5000/swagger
```

Para testar uma rota protegida:

1. Execute `POST /api/auth/login`.
2. Informe as credenciais de demonstração.
3. Copie o token retornado.
4. Clique no botão **Authorize** no topo do Swagger.
5. Cole o token JWT.
6. Execute normalmente os endpoints protegidos.

O Swagger permite testar diretamente operações como:

```text
GET
POST
PUT
DELETE
```

sem necessidade de uma ferramenta externa.

---

## 📐 Decisões de Arquitetura

* **SQL Server LocalDB via Entity Framework Core** — mantém a persistência relacional utilizando SQL Server e reduz a quantidade de serviços necessários para executar o projeto localmente.

* **Migrations automáticas** — o backend executa `Database.Migrate()` durante a inicialização, mantendo o banco compatível com as migrations versionadas no projeto.

* **Repository Pattern** — o acesso ao banco é separado dos controllers através de repositories.

* **DTOs** — os contratos da API são separados das entidades persistidas pelo Entity Framework.

* **Entidade `Presenca`** — representa a relação muitos-para-muitos entre `Workshop` e `Colaborador`, permitindo registrar e remover participantes individualmente.

* **Camada de serviços no frontend** — a comunicação HTTP fica centralizada em `services`, evitando chamadas à API diretamente nos componentes.

* **JWT Bearer** — utilizado para autenticação stateless e proteção das operações de escrita.

* **Leitura pública** — endpoints `GET` permanecem acessíveis sem autenticação para facilitar a consulta das informações.

* **Retornos HTTP adequados** — a API utiliza códigos como:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
404 Not Found
```

de acordo com o resultado de cada operação.

---

## 🧪 Dados de Demonstração

Na primeira execução, o banco recebe dados iniciais para facilitar a avaliação da aplicação.

Os dados permitem testar imediatamente:

* listagem de colaboradores;
* listagem de workshops;
* detalhes dos workshops;
* participantes;
* check-in e remoção de presença;
* métricas de participação;
* dashboard.

---

## 🤖 Uso de Inteligência Artificial

Ferramentas de Inteligência Artificial foram utilizadas como apoio durante o desenvolvimento do projeto.

O uso de IA auxiliou principalmente em:

* discussão e revisão de decisões de arquitetura;
* análise de alternativas de persistência e ambiente local;
* debugging de erros durante a integração;
* revisão da comunicação entre frontend e backend;
* planejamento e execução de testes da API;
* análise de códigos HTTP e comportamento dos endpoints;
* revisão da documentação e preparação da entrega.

As sugestões geradas pelas ferramentas foram validadas durante o desenvolvimento através da execução local da aplicação, testes dos endpoints, Swagger e builds do frontend e backend.

Os registros e conversas relevantes de uso de IA podem ser disponibilizados juntamente com a entrega do desafio.

---

## ✅ Validações Realizadas

Durante o desenvolvimento foram validados manualmente os principais fluxos da aplicação:

* ✅ Build do backend com `dotnet build`;
* ✅ Build do frontend com `npm run build`;
* ✅ Criação de colaboradores (`201 Created`);
* ✅ Consulta de colaboradores (`200 OK`);
* ✅ Atualização de workshops (`204 No Content`);
* ✅ Exclusão de workshops (`204 No Content`);
* ✅ Consulta de recurso inexistente (`404 Not Found`);
* ✅ Requisição protegida sem autenticação (`401 Unauthorized`);
* ✅ Autenticação JWT;
* ✅ Registro de presença;
* ✅ Consulta da ata de presença;
* ✅ Remoção de presença;
* ✅ Persistência no SQL Server LocalDB;
* ✅ Documentação e testes através do Swagger.

---

## 📄 Licença

Uso educacional — desenvolvido como desafio técnico.

Uso não comercial.

---

## 👤 Autor

**Erlon Matheus** — Desenvolvedor Full Stack

---

<div align="center">

*FAST Cadence Hub — desenvolvido para o desafio técnico da FAST Soluções.*

</div>
