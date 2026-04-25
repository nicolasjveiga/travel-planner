const fs = require('fs');

const token = "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";
const repo = "nicolasjveiga/travel-planner";

const stories = [
  {
    code: "AUTH-01",
    title: "Registro de Usuário",
    description: "**História:** Como usuário, quero me registrar no sistema para acessar minhas viagens.",
    criteria: [
      "Criar endpoint de registro (POST /auth/register).",
      "Validar formato do e-mail e força da senha.",
      "Salvar usuário no banco de dados com senha criptografada.",
      "Retornar mensagem de sucesso."
    ]
  },
  {
    code: "AUTH-02",
    title: "Login de Usuário",
    description: "**História:** Como usuário, quero fazer login para acessar minhas informações de forma segura.",
    criteria: [
      "Criar endpoint de login (POST /auth/login).",
      "Validar credenciais do usuário.",
      "Gerar e retornar token JWT.",
      "Impedir acesso com credenciais inválidas."
    ]
  },
  {
    code: "AUTH-03",
    title: "Isolamento de Dados",
    description: "**História:** Como usuário, quero acessar apenas meus dados.",
    criteria: [
      "Garantir que endpoints autenticados identifiquem o usuário logado via JWT.",
      "Restringir consultas ao banco para retornar apenas registros pertencentes ao usuário logado."
    ]
  },
  {
    code: "TRIP-01",
    title: "Criação de Viagem",
    description: "**História:** Como usuário, quero criar uma nova viagem informando destino e período.",
    criteria: [
      "Criar endpoint de criação de viagem (POST /trips).",
      "Receber título, data de início e data de término.",
      "Associar a viagem ao usuário autenticado.",
      "Validar que a data de término seja maior ou igual à data de início."
    ]
  },
  {
    code: "TRIP-02",
    title: "Listagem de Viagens",
    description: "**História:** Como usuário, quero visualizar minhas viagens cadastradas.",
    criteria: [
      "Criar endpoint de listagem de viagens (GET /trips).",
      "Retornar apenas as viagens do usuário logado."
    ]
  },
  {
    code: "TRIP-03",
    title: "Edição e Exclusão de Viagens",
    description: "**História:** Como usuário, quero editar ou excluir minhas viagens.",
    criteria: [
      "Criar endpoint para editar viagem (PUT/PATCH /trips/:id).",
      "Criar endpoint para excluir viagem (DELETE /trips/:id).",
      "Garantir que a exclusão apague também os dias e atividades associadas."
    ]
  },
  {
    code: "PLAN-01",
    title: "Gestão de Dias da Viagem",
    description: "**História:** Como usuário, quero dividir minha viagem em dias.",
    criteria: [
      "Criar endpoint para adicionar dias à viagem (POST /trips/:id/days).",
      "Validar que a data do dia esteja dentro do período da viagem."
    ]
  },
  {
    code: "PLAN-02",
    title: "Adição de Atividades",
    description: "**História:** Como usuário, quero adicionar atividades (pontos turísticos) em cada dia.",
    criteria: [
      "Criar endpoint para adicionar atividade a um dia (POST /days/:id/activities).",
      "Receber nome da atividade e opcionalmente uma descrição.",
      "Validar que não existam atividades duplicadas no mesmo dia."
    ]
  },
  {
    code: "PLAN-03",
    title: "Reordenação de Atividades",
    description: "**História:** Como usuário, quero reordenar atividades dentro de um dia.",
    criteria: [
      "Criar lógica/endpoint para atualizar a ordem (campo 'order') das atividades de um dia.",
      "Refletir a nova ordem na listagem de atividades do dia."
    ]
  },
  {
    code: "SYS-01",
    title: "Controle de Acesso em Viagens",
    description: "**História:** Como sistema, devo garantir que um usuário só acesse suas próprias viagens.",
    criteria: [
      "Implementar Guards/Middlewares para verificar permissão do usuário na manipulação (Editar/Excluir).",
      "Retornar status 403 (Forbidden) caso haja tentativa de acesso não autorizado a viagem de terceiros."
    ]
  },
  {
    code: "SYS-02",
    title: "Validação de Dados de Entrada",
    description: "**História:** Como sistema, devo validar entradas de dados antes de persistir.",
    criteria: [
      "Utilizar DTOs em todos os endpoints de escrita (POST, PUT, PATCH).",
      "Utilizar ValidationPipe para rejeitar payload com formatos inválidos ou faltando campos obrigatórios.",
      "Retornar mensagens claras de erro de validação (400 Bad Request)."
    ]
  }
];

async function createIssues() {
  for (const story of stories) {
    const title = `[${story.code}] ${story.title}`;
    const checklist = story.criteria.map(c => `- [ ] ${c}`).join('\n');
    const body = `${story.description}\n\n**Critérios de Aceitação:**\n${checklist}`;

    const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body, labels: ["enhancement"] })
    });
    
    if (res.ok) {
      console.log(`Created: ${title}`);
    } else {
      console.error(`Failed to create: ${title}`, await res.text());
    }
    // delay slightly to prevent rate limits or abuse mechanisms
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

createIssues();
