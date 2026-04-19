# SDD - Travel Planner

## 1. Arquitetura

A aplicação será estruturada em formato Monorepo, contendo:

-   Backend: API REST com NestJS
-   Frontend: aplicação SPA (React/Angular/Vue)

O backend seguirá a arquitetura em camadas:

-   Controllers: recebem requisições HTTP
-   Services: implementam regras de negócio
-   Modules: organizam os domínios da aplicação

------------------------------------------------------------------------

## 2. Modelo de Dados (ER Diagram)

``` mermaid
erDiagram
    USER ||--o{ TRIP : owns
    TRIP ||--o{ DAY : contains
    DAY ||--o{ ACTIVITY : includes

    USER {
        int id
        string email
        string password
    }

    TRIP {
        int id
        string title
        date startDate
        date endDate
        int userId
    }

    DAY {
        int id
        int tripId
        date date
    }

    ACTIVITY {
        int id
        int dayId
        string name
        string description
        int order
    }
```

------------------------------------------------------------------------

## 3. Dicionário de Entidades

### User

-   id
-   email
-   password

### Trip

-   id
-   title
-   startDate
-   endDate
-   userId (FK)

### Day

-   id
-   date
-   tripId (FK)

### Activity

-   id
-   name
-   description
-   order
-   dayId (FK)

------------------------------------------------------------------------

## 4. Contratos da API

### Autenticação

#### POST /auth/register

Entrada:

``` json
{
  "email": "string",
  "password": "string"
}
```

#### POST /auth/login

Saída:

``` json
{
  "access_token": "jwt"
}
```

------------------------------------------------------------------------

### Trips

#### GET /trips

Retorna todas as viagens do usuário autenticado

#### POST /trips

``` json
{
  "title": "Viagem",
  "startDate": "2026-05-01",
  "endDate": "2026-05-05"
}
```

------------------------------------------------------------------------

### Days

#### POST /trips/:tripId/days

------------------------------------------------------------------------

### Activities

#### POST /days/:dayId/activities

------------------------------------------------------------------------

## 5. Segurança

-   Autenticação via JWT
-   Uso de Guards para proteção de rotas
-   Validação com DTOs e ValidationPipe

------------------------------------------------------------------------

## 6. Padrões Técnicos

-   Interceptors para padronização de respostas (ID9)
-   Exception Filters para tratamento global de erros (ID9)
-   Swagger para documentação da API (ID12)