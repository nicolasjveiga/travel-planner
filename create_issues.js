const fs = require('fs');

const token = "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";
const repo = "nicolasjveiga/travel-planner";

const stories = [
  {
    code: "US01",
    title: "Login Institucional Integrado",
    description: "**Ator:** Usuário Genérico (Aluno ou Professor) | **História:** Como usuário, quero me autenticar no sistema com um único clique utilizando a minha conta do Google, para que eu não precise decorar novas senhas e o acesso seja rápido.",
    criteria: [
      "O sistema deve exibir um botão central de login com a identidade visual do Google.",
      "Após a aprovação do Google, o sistema deve registrar e exibir adequadamente o Nome, E-mail e a Foto de Perfil do usuário logado."
    ]
  },
  {
    code: "US02a",
    title: "Gestão de Professores e Disciplinas (Must Have)",
    description: "**Ator:** Administrador | **História:** Como administrador do sistema, quero cadastrar os professores e vinculá-los às suas respectivas disciplinas ofertadas no semestre para que o sistema organize os acessos corretos.",
    criteria: [
      "Devem existir telas de gestão (CRUD) restritas apenas a Administradores para gerenciar a base acadêmica.",
      "Deve ser possível vincular o perfil de um Professor a uma ou mais Disciplinas.",
      "O sistema não deve permitir a exclusão de uma Disciplina que já possua histórico de sessões de presença registradas."
    ]
  },
  {
    code: "US02b",
    title: "Importação de Pauta Oficial (Must Have)",
    description: "**Ator:** Professor | **História:** Como professor, quero importar a lista de alunos (contendo Nome, RA e E-mail) extraída do portal da UTFPR, para que o sistema saiba previamente quem está autorizado a registrar presença na minha disciplina.",
    criteria: [
      "O sistema deve permitir a colagem de texto ou upload de um arquivo com os dados da pauta.",
      "O sistema deve extrair e vincular automaticamente os RAs aos respectivos E-mails informados na lista.",
      "Alunos importados devem ser pré-cadastrados na disciplina, aguardando apenas o seu primeiro login via Google para ativar a conta."
    ]
  },
  {
    code: "US03",
    title: "Abertura de Sessão de Presença (Must Have)",
    description: "**Ator:** Professor | **História:** Como professor, quero selecionar uma disciplina e iniciar uma Sessão de Presença para que os alunos possam começar o check-in.",
    criteria: [
      "O professor só deve visualizar as disciplinas às quais está oficialmente vinculado.",
      "Ao iniciar, o sistema deve registrar o horário exato de abertura da sessão.",
      "O sistema deve impedir que o mesmo professor abra duas sessões ativas simultaneamente."
    ]
  },
  {
    code: "US04",
    title: "Motor de QR Code Dinâmico (Must Have)",
    description: "**Ator:** Professor | **História:** Como professor, quero projetar um QR Code que se regenera a cada 15 segundos para que se evite a fraude por compartilhamento de fotos.",
    criteria: [
      "O QR Code projetado na tela deve conter um código de segurança criptografado vinculado à sessão atual.",
      "A validade exata do código gerado no QR deve ser de estritos 15 segundos.",
      "O painel do professor deve atualizar o QR Code visualmente de forma automática antes que o anterior expire, sem a necessidade de recarregar a página."
    ]
  },
  {
    code: "US05",
    title: "Check-in do Aluno (Must Have)",
    description: "**Ator:** Aluno | **História:** Como aluno, quero escanear o QR com a câmera do Web App e receber feedback imediato para que eu saiba se minha presença foi registrada.",
    criteria: [
      "O aplicativo web deve ser capaz de abrir a câmera traseira do smartphone do aluno.",
      "O sistema deve rejeitar instantaneamente a leitura de códigos que já passaram do limite de 15 segundos de validade ou que possuam assinaturas inválidas.",
      "O sistema deve rejeitar tentativas de check-in duplicados para o mesmo aluno na mesma sessão.",
      "A tela do aluno deve exibir um alerta visual inconfundível de Sucesso (Verde) ou Falha (Vermelho), explicando o motivo do erro."
    ]
  },
  {
    code: "US06",
    title: "Encerramento Manual de Sessão (Must Have)",
    description: "**Ator:** Professor | **História:** Como professor, quero encerrar a sessão manualmente para que a lista de presença seja consolidada e fechada.",
    criteria: [
      "O painel da sessão ativa deve ter um botão de destaque para \"Encerrar Chamada\".",
      "A ação deve registrar o horário exato do encerramento.",
      "Qualquer tentativa de check-in de aluno processada após este evento deve ser categoricamente negada."
    ]
  },
  {
    code: "US07",
    title: "Integração via Extensão Bridge (Should Have)",
    description: "**Ator:** Professor | **História:** Como professor, quero usar a Extensão Bridge para pré-preencher a chamada no portal acadêmico e revisá-la para que eu automatize o lançamento final.",
    criteria: [
      "A extensão do navegador deve ser capaz de importar a lista final de alunos presentes gerada pelo sistema \"Tô Aqui!\".",
      "A extensão deve identificar e preencher automaticamente as caixas de seleção correspondentes aos RAs na página oficial do portal acadêmico da instituição.",
      "Por segurança, a extensão **não deve** salvar ou submeter o formulário final automaticamente; a revisão e o clique final são de responsabilidade do professor."
    ]
  },
  {
    code: "US08",
    title: "Inclusão Manual de Presença (Should Have)",
    description: "**Ator:** Professor | **História:** Como professor, quero registrar manualmente a presença de um aluno pelo sistema para que eu resolva imprevistos (ex: aluno sem bateria no celular).",
    criteria: [
      "Durante uma sessão ativa, o professor deve ter um campo de busca para encontrar um aluno matriculado pelo nome ou RA.",
      "Ao confirmar a presença manual, o sistema deve registrar esse check-in no histórico com um indicativo claro de que foi uma \"inserção manual\", diferenciando-o da leitura via QR."
    ]
  },
  {
    code: "US09",
    title: "Painel de Acompanhamento em Tempo Real (Could Have)",
    description: "**Ator:** Professor | **História:** Como professor, quero visualizar em tempo real os nomes dos alunos que já fizeram check-in para que eu acompanhe o progresso visualmente.",
    criteria: [
      "Assim que um aluno receber a mensagem de sucesso no seu celular, o nome dele deve surgir instantaneamente na lista projetada na tela do professor.",
      "A atualização dessa lista deve ocorrer de forma fluida, sem exigir a atualização da página."
    ]
  },
  {
    code: "US10",
    title: "Encerramento Automático por Quórum (Could Have)",
    description: "**Ator:** Sistema | **História:** Como sistema, quero encerrar a sessão automaticamente quando 100% dos alunos matriculados fizerem check-in para que o professor não precise intervir.",
    criteria: [
      "A cada novo check-in, o sistema deve cruzar o número de presenças confirmadas com o total de alunos na pauta oficial da referida disciplina.",
      "Se o quórum atingir 100%, o sistema deve acionar a rotina de encerramento da sessão automaticamente e exibir um aviso de conclusão no painel do professor."
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
      body: JSON.stringify({ title, body })
    });
    
    if (res.ok) {
      console.log(`Created: ${title}`);
    } else {
      console.error(`Failed to create: ${title}`, await res.text());
    }
  }
}

createIssues();
