# PRD - Travel Planner

## 1. Visão do Produto

O Travel Planner é uma aplicação web que permite aos usuários planejar
viagens de forma estruturada, organizando roteiros por dias e
atividades. Diferente de sistemas tradicionais de catálogo de pontos
turísticos, a aplicação foca na criação de itinerários personalizados,
simulando um guia de viagem inteligente.

O sistema permite que usuários criem viagens, definam períodos,
organizem atividades por dia e gerenciem seus roteiros de forma segura e
autenticada.

------------------------------------------------------------------------

## 2. Atores do Sistema

-   Usuário autenticado
-   Sistema (API)

------------------------------------------------------------------------

## 3. Histórias de Usuário

### Autenticação

-   Como usuário, quero me registrar no sistema para acessar minhas
    viagens.
-   Como usuário, quero fazer login para acessar minhas informações de
    forma segura.
-   Como usuário, quero acessar apenas meus dados.

------------------------------------------------------------------------

### Gestão de Viagens

-   Como usuário, quero criar uma nova viagem informando destino e
    período.
-   Como usuário, quero visualizar minhas viagens cadastradas.
-   Como usuário, quero editar ou excluir minhas viagens.

------------------------------------------------------------------------

### Organização de Roteiro

-   Como usuário, quero dividir minha viagem em dias.
-   Como usuário, quero adicionar atividades (pontos turísticos) em cada
    dia.
-   Como usuário, quero reordenar atividades dentro de um dia.

------------------------------------------------------------------------

### Controle de Acesso

-   Como sistema, devo garantir que um usuário só acesse suas próprias
    viagens.
-   Como sistema, devo validar entradas de dados antes de persistir.

------------------------------------------------------------------------

## 4. Regras de Negócio

-   Uma viagem deve pertencer a um único usuário.
-   Uma viagem pode ter vários dias (1:N).
-   Um dia pode conter várias atividades (1:N).
-   Não é permitido adicionar atividades duplicadas no mesmo dia.
-   Um usuário não pode acessar dados de outro usuário.
-   A criação e edição de dados requer autenticação JWT.
-   Os dados devem ser validados antes de serem persistidos.

------------------------------------------------------------------------

## 5. Escopo Técnico (alinhado aos IDs)

-   Uso de autenticação JWT (ID8)
-   CRUD relacional com Prisma (ID7)
-   Validação com DTOs (ID6)
-   Separação de camadas (ID5)
-   Estrutura pensada para testes automatizados (ID10 e ID11)