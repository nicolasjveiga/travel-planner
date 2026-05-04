# Travel Planner

🚧 **Status:** Em desenvolvimento (branch: develop)

👤 **Autor:** Nicolas Veiga

🔗 [Protótipo](https://stitch.withgoogle.com/projects/14788849580947901087)

------------------------------------------------------------------------

## 1. Visão Geral

Aplicação Full-Cycle para planejamento de viagens, permitindo que
usuários criem roteiros personalizados organizados por dias e
atividades. O sistema auxilia na organização de pontos turísticos dentro
de uma viagem, simulando um guia inteligente. A proposta vai além de um
simples catálogo, focando na criação de itinerários completos.

------------------------------------------------------------------------

## 2. Documentação (Docs as Code)

Toda a especificação do sistema está versionada na pasta `/docs`:

-   PRD (Product Requirements Document): visão do produto, regras de
    negócio e user stories\
-   SDD (Software Design Document): arquitetura, diagrama ER (Mermaid),
    DTOs e fluxos\
-   Checklist: controle dos IDs e RAs da disciplina

------------------------------------------------------------------------

## 3. Stack Tecnológica

-   Arquitetura: Monorepo (Backend + Frontend)
-   Backend: NestJS, TypeScript, JWT
-   Banco de Dados: PostgreSQL com Prisma ORM
-   Frontend: React (Vite)
-   Testes: Jest (TDD guiado por IA)
-   CI/CD: GitHub Actions (em configuração)

------------------------------------------------------------------------

## 4. Quick Start

### 1. Clonar o repositório

git clone https://github.com/nicolasjveiga/travel-planner.git cd
travel-planner

------------------------------------------------------------------------

### 2. Instalar dependências

# Backend

cd apps/api npm install npm run start:dev

# Frontend

cd apps/web npm install npm run dev

------------------------------------------------------------------------

### 3. Variáveis de ambiente

Crie um arquivo `.env` em `apps/api` baseado no `.env.example`:

DATABASE_URL="sua_url_do_postgresql" JWT_SECRET="seu_segredo"

------------------------------------------------------------------------

## 5. Funcionalidades principais

-   Criar e gerenciar viagens\
-   Organizar roteiros por dias\
-   Adicionar atividades (pontos turísticos)\
-   Autenticação com JWT\
-   Controle de acesso por usuário

------------------------------------------------------------------------

## 6. Fluxo de desenvolvimento

-   main: produção\
-   develop: desenvolvimento\
-   feature/\*: novas funcionalidades

Todas as alterações são feitas via Pull Request.
