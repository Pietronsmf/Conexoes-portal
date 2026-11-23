/* =====================================================================
   Dados do protótipo.
   Os módulos e os temas vêm de informações públicas do programa.
   Os DESAFIOS são ILUSTRATIVOS: títulos inspirados em temas públicos,
   prazos relativos à data de hoje para o protótipo parecer sempre vivo.
   Na versão final, esta lista viria da API do portal.
   ===================================================================== */
(function () {
  "use strict";

  var CI = (window.CI = window.CI || {});

  /*
    Conteúdo da página do desafio, por módulo (estrutura vinda do benchmark de portais de desafios):
    recebe     o que quem é selecionado recebe            [ícone, título, texto]
    checagem   perguntas de sim ou não da checagem rápida  { q, nao (dica se a resposta for não), alt (módulo sugerido) }
    cedo       dica quando a solução ainda não tem a maturidade pedida  [texto, módulo sugerido]
    proposta   o que a proposta precisa ter (padrão em CI.propostaPadrao) [item, detalhe]
    caminho    o que acontece depois da seleção            [ícone, etapa, quando ({duracao} = prazo do desafio), texto]
    pi         propriedade intelectual em linguagem simples [ícone, título, texto]
    perguntas  perguntas já respondidas, públicas para todos [pergunta, resposta]
    fato       número real do programa, com fonte
    Textos de startups seguem o edital de 2024 divulgado pela Agência Sebrae; os demais são ilustrativos.
  */
  CI.modulos = {
    startups: {
      nome: "Startups",
      icone: "lightbulb-filament",
      publico: "Startups e pequenas empresas",
      formato: "Projeto de desenvolvimento com o Sebrae",
      descricao: "Editais em parceria com o Sebrae, com recursos para desenvolver a solução, mentoria técnica da Petrobras e consultoria de negócios.",
      avaliadores: "Especialistas da Petrobras e do Sebrae.",
      recebe: [
        ["coins", "Recursos para desenvolver", "Até R$ 1 milhão em desafios de software e até R$ 2 milhões em hardware e materiais."],
        ["users-three", "Apoio técnico da Petrobras", "Especialistas acompanham o projeto e apoiam o teste e a qualificação da solução."],
        ["factory", "Teste em ambiente real", "Acesso a instalações da indústria de óleo, gás e energia para validar a solução."],
        ["chart-line-up", "Gestão e mercado com o Sebrae", "Consultoria em gestão e ações de acesso a mercado durante o projeto."],
      ],
      checagem: [
        { q: "A empresa tem até 10 anos de CNPJ?", nao: "Pelo Marco Legal das Startups, startup tem até 10 anos de CNPJ. Empresas mais antigas podem olhar Aquisição de Soluções.", alt: "aquisicao" },
        { q: "A receita bruta do ano passado foi de até R$ 16 milhões?", nao: "Esse é o limite de receita do Marco Legal das Startups. Empresas maiores podem olhar Encomendas Tecnológicas.", alt: "encomendas" },
      ],
      cedo: ["Ideias em fase inicial podem começar com uma universidade ou ICT, em Parcerias Tecnológicas.", "parcerias"],
      caminho: [
        ["signature", "Contrato", "até 45 dias após o resultado final", "Assinatura do contrato de P&D com o plano de trabalho aprovado."],
        ["kanban", "Projeto", "{duracao}", "Marcos e entregas acompanhados por um especialista da Petrobras, com apoio do Sebrae em gestão."],
        ["factory", "Teste e qualificação", "nas etapas finais do projeto", "A solução é testada em ambiente real com a equipe técnica da Petrobras."],
        ["rocket-launch", "O que pode vir depois", "", "Implantação, fornecimento, novos projetos ou investimento."],
      ],
      pi: [
        ["lock-key", "O que você já tinha", "Tecnologia e conhecimento anteriores ao projeto continuam sendo seus."],
        ["handshake", "O que for criado no projeto", "Os resultados têm cotitularidade entre a startup e a Petrobras."],
        ["storefront", "Depois do projeto", "A solução pode ser levada ao mercado e vendida a outros clientes, nas condições do edital."],
      ],
      perguntas: [
        ["Posso inscrever uma solução que já uso em outro setor?", "Sim. Tecnologias de outras indústrias são bem-vindas, desde que atendam aos requisitos do desafio."],
        ["Posso enviar propostas para mais de um desafio?", "Sim, uma proposta por desafio. Cada uma é avaliada separadamente."],
        ["Uma ICT pode participar com a startup?", "Sim. ICTs também podem participar da seleção, sozinhas ou em parceria, conforme o edital."],
      ],
      fato: {
        texto: "No Módulo Startups, 30% dos projetos tiveram continuidade, com novos contratos de P&D, fornecimento ou investimento.",
        fonte: "Agência Sebrae, setembro de 2024",
        url: "https://agenciasebrae.com.br/inovacao-e-tecnologia/petrobras-lanca-edital-de-r16-milhoes-para-startups/",
      },
    },
    parcerias: {
      nome: "Parcerias Tecnológicas",
      icone: "flask",
      publico: "Universidades e ICTs",
      formato: "Projeto de pesquisa em cooperação",
      descricao: "Pesquisa em cooperação com o CENPES, o centro de pesquisas da Petrobras.",
      avaliadores: "Pesquisadores do CENPES, o centro de pesquisas da Petrobras.",
      recebe: [
        ["coins", "Recursos para a pesquisa", "Bolsas, equipamentos e custeio previstos no plano de trabalho."],
        ["users-three", "Pesquisa com o CENPES", "Trabalho conjunto com pesquisadores do centro de pesquisas da Petrobras."],
        ["flask", "Laboratórios e infraestrutura", "Acesso a laboratórios e instalações da Petrobras, conforme o projeto."],
        ["graduation-cap", "Formação de pessoas", "Estudantes e pesquisadores ganham experiência em problemas reais da indústria."],
      ],
      checagem: [
        { q: "A proponente é uma universidade ou ICT?", nao: "Este módulo é para universidades e ICTs. Empresas podem participar em parceria com uma ICT ou olhar o Módulo Startups.", alt: "startups" },
        { q: "A instituição é credenciada na ANP para projetos de PD&I?", nao: "O credenciamento na ANP é exigido para usar recursos da cláusula de PD&I. A instituição pode pedi-lo antes da contratação." },
      ],
      cedo: ["Acompanhe as próximas chamadas: novas linhas de pesquisa abrem ao longo do ano."],
      proposta: [
        ["Resumo do projeto", "até 1.500 caracteres"],
        ["Plano de trabalho", "objetivos, etapas, entregas e prazos"],
        ["Orçamento", "bolsas, equipamentos e custeio"],
        ["Equipe de pesquisa", "com o link do currículo Lattes de cada pessoa"],
        ["Credenciamento na ANP", "número do credenciamento da instituição"],
        ["Anexos", "até 5 arquivos em PDF, 20 MB no total"],
      ],
      caminho: [
        ["signature", "Termo de cooperação", "até 45 dias após o resultado final", "Assinatura do termo com o plano de trabalho aprovado."],
        ["kanban", "Pesquisa", "{duracao}", "Execução com pesquisadores do CENPES e relatórios a cada etapa."],
        ["flask", "Validação dos resultados", "ao fim de cada etapa", "Ensaios e modelos validados com a equipe técnica da Petrobras."],
        ["rocket-launch", "O que pode vir depois", "", "Novos projetos, patentes ou transferência do conhecimento para a indústria."],
      ],
      pi: [
        ["lock-key", "O que a instituição já tinha", "O conhecimento anterior ao projeto continua sendo da instituição."],
        ["handshake", "O que for criado no projeto", "Os resultados são compartilhados entre a instituição e a Petrobras, como define o termo de cooperação."],
        ["book-open", "Publicações", "Artigos e teses são possíveis, depois da revisão de sigilo prevista no termo."],
      ],
      perguntas: [
        ["Preciso de credenciamento na ANP?", "Para usar recursos da cláusula de PD&I, sim. A instituição pode pedir o credenciamento antes da contratação."],
        ["Podemos publicar os resultados?", "Sim, depois da revisão de sigilo prevista no termo de cooperação."],
        ["O pesquisador pode trabalhar no CENPES?", "Sim. Há formatos com pesquisador residente, presencial ou híbrido, quando o plano prevê."],
      ],
    },
    encomendas: {
      nome: "Encomendas Tecnológicas",
      icone: "target",
      publico: "Empresas e ICTs com capacidade de P&D",
      formato: "Encomenda tecnológica",
      descricao: "Desafios estratégicos, sem solução no mercado, que precisam de pesquisa e desenvolvimento.",
      avaliadores: "Um comitê técnico da Petrobras, com especialistas da área que fez a encomenda.",
      recebe: [
        ["coins", "Contrato de desenvolvimento", "Pagamento proporcional às etapas executadas, conforme o plano aprovado."],
        ["scales", "Risco tecnológico compartilhado", "A encomenda admite que o resultado final não seja alcançado."],
        ["factory", "Teste em ambiente real", "Validação do protótipo nas instalações da Petrobras."],
        ["truck", "Fornecimento depois do sucesso", "A Lei de Inovação permite contratar o fornecimento sem nova licitação."],
      ],
      checagem: [
        { q: "A equipe tem experiência comprovada em P&D no tema?", nao: "Encomendas pedem equipe com histórico no tema. Uma parceria com uma universidade ou ICT pode reforçar a proposta.", alt: "parcerias" },
      ],
      cedo: ["Pesquisas em fase inicial cabem em Parcerias Tecnológicas, com uma universidade ou ICT.", "parcerias"],
      caminho: [
        ["signature", "Contrato de encomenda", "até 45 dias após o resultado final", "Plano com marcos, critérios de decisão e pagamento por etapa."],
        ["kanban", "Desenvolvimento", "{duracao}", "Cada marco é avaliado antes de liberar a etapa seguinte."],
        ["flask", "Validação do protótipo", "nos marcos finais", "O protótipo passa pelos critérios de decisão definidos no plano."],
        ["rocket-launch", "O que pode vir depois", "", "Fornecimento da solução, sem nova licitação, quando o desenvolvimento dá certo."],
      ],
      pi: [
        ["lock-key", "O que cada parte já tinha", "O conhecimento anterior ao projeto continua de quem o trouxe."],
        ["handshake", "O que for criado no projeto", "A titularidade dos resultados é definida no contrato de encomenda."],
        ["truck", "Depois do projeto", "A Petrobras pode contratar o fornecimento da solução desenvolvida."],
      ],
      perguntas: [
        ["E se o resultado final não for alcançado?", "A encomenda admite risco tecnológico: as etapas executadas conforme o plano são pagas."],
        ["Depois do desenvolvimento, a Petrobras compra a solução?", "Pode comprar. A Lei de Inovação permite contratar o fornecimento do que foi desenvolvido sem nova licitação."],
        ["Posso participar em consórcio?", "Sim. Empresas e ICTs podem se unir na mesma proposta, nas regras do edital."],
      ],
    },
    aquisicao: {
      nome: "Aquisição de Soluções",
      icone: "package",
      publico: "Empresas com solução pronta",
      formato: "Contratação de solução",
      descricao: "Soluções que já existem, contratadas para demandas da Petrobras.",
      avaliadores: "Especialistas da área da Petrobras que vai usar a solução.",
      recebe: [
        ["coins", "Contrato de teste", "O teste da solução em ambiente real é pago pela Petrobras."],
        ["factory", "Teste em operação", "A solução é avaliada nos processos e nas instalações da Petrobras."],
        ["rocket-launch", "Caminho para escala", "Soluções que atingem as metas podem ser contratadas em escala."],
        ["seal-check", "Referência de mercado", "Um caso validado com a Petrobras ajuda a vender para outras empresas do setor."],
      ],
      checagem: [
        { q: "A empresa pode ser fornecedora da Petrobras, com a documentação em dia?", nao: "Para contratar, a empresa precisa cumprir os requisitos de fornecedor. Veja o passo a passo no Canal Fornecedor.", url: "https://canalfornecedor.petrobras.com.br/", rotulo: "Abrir o Canal Fornecedor" },
      ],
      cedo: ["Soluções ainda em desenvolvimento podem participar do Módulo Startups ou de Encomendas Tecnológicas.", "startups"],
      proposta: [
        ["Descrição da solução", "o que faz e onde já está em uso"],
        ["Casos de uso", "resultados comprovados, com contatos de referência"],
        ["Plano de teste", "metas, prazo e local sugeridos"],
        ["Proposta comercial", "preço do teste e da contratação em escala"],
        ["Equipe", "quem acompanha o teste"],
        ["Anexos", "até 5 arquivos em PDF, 20 MB no total"],
      ],
      caminho: [
        ["signature", "Contrato de teste", "até 45 dias após o resultado final", "Metas, local e prazo do teste definidos em contrato."],
        ["factory", "Teste em operação", "{duracao}", "A solução é avaliada nos processos da Petrobras, com acompanhamento técnico."],
        ["chart-line-up", "Avaliação das metas", "ao fim do teste", "Os resultados são comparados com as metas do contrato."],
        ["rocket-launch", "O que pode vir depois", "", "Contratação em escala, quando o teste atinge as metas."],
      ],
      pi: [
        ["lock-key", "A sua solução", "A solução e a propriedade intelectual continuam sendo da empresa."],
        ["file-text", "O que a Petrobras contrata", "O teste e o uso da solução, nas condições do contrato."],
        ["wrench", "Ajustes durante o teste", "Melhorias feitas para a Petrobras seguem as regras do contrato."],
      ],
      perguntas: [
        ["A solução precisa estar pronta?", "Sim. Este módulo testa soluções que já existem, em ambiente real de operação."],
        ["Quanto tempo dura o teste?", "Até 12 meses, com possível prorrogação por mais 12."],
        ["Se o teste der certo, há contratação em escala?", "Pode haver. O módulo busca soluções com alto potencial de implantação."],
      ],
    },
    transferencia: {
      nome: "Transferência de Tecnologias",
      icone: "key",
      publico: "Empresas interessadas em licenciar",
      formato: "Licenciamento de tecnologia",
      descricao: "Licenciamento de tecnologias desenvolvidas pela Petrobras, para levá-las ao mercado.",
      rotuloValor: "Pagamento",
      tecnologiaPetrobras: true,
      avaliadores: "Especialistas em tecnologia e negócios da Petrobras.",
      recebe: [
        ["key", "Licença da tecnologia", "Direito de produzir e vender a tecnologia, nas condições do contrato."],
        ["chalkboard-teacher", "Apoio de quem desenvolveu", "Pesquisadores da Petrobras apoiam a transferência do conhecimento."],
        ["lock-key", "Patentes protegidas", "Uso da propriedade intelectual da Petrobras, conforme a licença."],
        ["storefront", "Produto pronto para o mercado", "Uma tecnologia já validada, para chegar ao mercado mais rápido."],
      ],
      checagem: [
        { q: "A empresa tem como produzir ou oferecer a tecnologia?", nao: "A licença pede capacidade de fabricação ou de prestação do serviço. Uma parceria com um fabricante pode suprir essa parte." },
        { q: "A empresa aceita pagar royalties sobre as vendas?", nao: "A licença envolve pagamento à Petrobras, em geral por royalties. As condições estão no edital." },
      ],
      proposta: [
        ["Apresentação da empresa", "capacidade de produção e distribuição"],
        ["Plano de negócios", "mercado, preço e metas de venda"],
        ["Proposta de licença", "royalties, prazo e territórios"],
        ["Equipe", "quem conduz a produção e a venda"],
        ["Anexos", "até 5 arquivos em PDF, 20 MB no total"],
      ],
      caminho: [
        ["signature", "Contrato de licença", "até 45 dias após o resultado final", "Condições de uso, royalties e metas de venda."],
        ["chalkboard-teacher", "Transferência de conhecimento", "nos primeiros meses", "A equipe da Petrobras apoia a produção e a primeira venda."],
        ["storefront", "Produção e venda", "{duracao}", "A empresa leva a tecnologia ao mercado e informa as vendas."],
        ["rocket-launch", "O que pode vir depois", "", "Renovação da licença e acesso a novas tecnologias."],
      ],
      pi: [
        ["lock-key", "A tecnologia", "A tecnologia e as patentes continuam sendo da Petrobras."],
        ["key", "O que a empresa recebe", "Uma licença para produzir e vender, com pagamento definido em contrato."],
        ["wrench", "Melhorias", "Aperfeiçoamentos feitos pela empresa seguem as regras da licença."],
      ],
      perguntas: [
        ["Como funciona o licenciamento?", "A empresa recebe o direito de produzir e vender a tecnologia, com pagamentos definidos no contrato, como royalties."],
        ["Recebo apoio técnico?", "Sim. A equipe que desenvolveu a tecnologia apoia a transferência, conforme o plano."],
        ["Posso propor melhorias na tecnologia?", "Sim. O módulo também busca aprimorar a tecnologia para viabilizar o licenciamento."],
      ],
    },
  };

  /* O que a proposta precisa ter, quando o módulo não define a própria lista */
  CI.propostaPadrao = [
    ["Resumo da solução", "até 1.500 caracteres"],
    ["Descrição técnica", "como funciona e a maturidade atual (TRL)"],
    ["Plano de trabalho", "etapas, entregas e prazos"],
    ["Orçamento", "por etapa, no modelo do edital"],
    ["Equipe", "experiência e dedicação de cada pessoa"],
    ["Anexos", "até 5 arquivos em PDF, 20 MB no total"],
  ];

  /* Maturidade tecnológica (TRL) em palavras simples: nome do nível e pergunta da checagem rápida */
  CI.trl = [
    null,
    ["princípios básicos", "O grupo já domina os princípios científicos do tema"],
    ["conceito formulado", "Já existe um conceito formulado para a solução"],
    ["prova de conceito", "Já existe uma prova de conceito"],
    ["validação em laboratório", "A solução já foi validada em laboratório"],
    ["validação em ambiente relevante", "A solução já foi validada em ambiente relevante"],
    ["demonstração em ambiente relevante", "A solução já foi demonstrada em ambiente relevante"],
    ["demonstração em operação", "A solução já foi demonstrada em operação"],
    ["sistema completo e qualificado", "O sistema já está completo e qualificado"],
    ["sistema comprovado em operação", "O sistema já é usado em operação comercial"],
  ];

  /* Regras de nota (ilustrativas): mínima para seguir e mínima para o banco de soluções qualificadas */
  CI.notas = { minima: 6, qualificada: 8 };

  CI.ordemModulos = ["startups", "parcerias", "encomendas", "aquisicao", "transferencia"];

  CI.temas = [
    { nome: "Tecnologias digitais", icone: "cpu" },
    { nome: "Robótica", icone: "robot" },
    { nome: "Inspeção", icone: "scan" },
    { nome: "Armazenamento e geração de energia", icone: "battery-charging" },
    { nome: "Redução de carbono", icone: "leaf" },
    { nome: "Modelagem geológica", icone: "mountains" },
    { nome: "Corrosão", icone: "drop-half-bottom" },
  ];

  /* Critérios de avaliação usados no detalhe (texto genérico do protótipo) */
  CI.criterios = [
    { icone: "target", titulo: "Aderência ao desafio", peso: 30, texto: "Quanto a proposta responde ao problema descrito e aos requisitos técnicos." },
    { icone: "flask", titulo: "Maturidade e inovação", peso: 25, texto: "Estágio atual da solução e o avanço que ela representa frente ao que existe." },
    { icone: "users", titulo: "Equipe e execução", peso: 20, texto: "Experiência da equipe e capacidade de entregar o plano de trabalho." },
    { icone: "calendar-check", titulo: "Plano e orçamento", peso: 25, texto: "Clareza de etapas, entregas, prazos e coerência dos custos previstos." },
  ];

  /*
    prazoDias: dias até o fim das inscrições (negativo = encerrado)
    publicadoDias: há quantos dias a chamada foi publicada
    foco: posição horizontal (%) do assunto na foto, para recortes estreitos
    foto: assets/media/desafios/<id>.webp (créditos no README)
  */
  CI.desafios = [
    {
      id: "inspecao-autonoma-cascos-fpso",
      foco: 30,
      modulo: "startups",
      titulo: "Inspeção autônoma de cascos de FPSO com robôs submarinos",
      resumo: "Robôs ou sistemas embarcados que inspecionem cascos de unidades flutuantes sem parar a produção e sem depender de mergulho.",
      area: "Exploração e Produção",
      tema: "Robótica",
      prazoDias: 26,
      publicadoDias: 34,
      valor: "Até R$ 2 milhões",
      duracao: "Até 24 meses",
      trl: [4, 6],
      contexto: "As unidades flutuantes de produção passam por inspeções periódicas de casco. Hoje, boa parte delas depende de mergulho ou de docagem, o que aumenta custo, risco e tempo de parada.",
      buscamos: [
        "Veículos ou robôs capazes de operar junto ao casco com a unidade em produção.",
        "Detecção e registro georreferenciado de corrosão, trincas e incrustação.",
        "Relatórios que se integrem aos sistemas de integridade já usados nas unidades.",
        "Protótipo funcional validado em ambiente relevante.",
      ],
    },
    {
      id: "polimeros-integridade-nao-metalicos",
      foco: 29,
      modulo: "parcerias",
      titulo: "Materiais poliméricos para integridade de estruturas não metálicas",
      resumo: "Cooperação com universidades e ICTs para entender envelhecimento e falha de polímeros em sistemas submarinos, poços e transição energética.",
      area: "Submarino e Poços",
      tema: "Materiais",
      prazoDias: 41,
      publicadoDias: 20,
      valor: "Até R$ 4 milhões",
      duracao: "Até 36 meses",
      trl: [2, 4],
      contexto: "Estruturas não metálicas ganham espaço em sistemas submarinos e em poços. Entender como os polímeros envelhecem em serviço é essencial para prever vida útil e reduzir intervenções.",
      buscamos: [
        "Grupos de pesquisa com laboratório de caracterização de polímeros.",
        "Modelos de envelhecimento e previsão de falha validados em ensaio.",
        "Plano de trabalho com pesquisador residente no CENPES em formato híbrido.",
        "Formação de pessoas e transferência de conhecimento para a equipe técnica.",
      ],
    },
    {
      id: "monitoramento-corrosao-tempo-real",
      foco: 33,
      modulo: "startups",
      titulo: "Monitoramento de corrosão em tempo real em linhas de processo",
      resumo: "Sensores e análise de dados para acompanhar a taxa de corrosão em tubulações de refinarias sem interromper a operação.",
      area: "Refino",
      tema: "Corrosão",
      prazoDias: 9,
      publicadoDias: 52,
      valor: "Até R$ 2 milhões",
      duracao: "Até 18 meses",
      trl: [4, 6],
      contexto: "A corrosão interna em linhas de processo é acompanhada por inspeções periódicas. Medições contínuas permitiriam agir antes que o desgaste vire parada não programada.",
      buscamos: [
        "Sensores instaláveis em linhas existentes, sem necessidade de parada.",
        "Transmissão de dados segura e compatível com redes industriais.",
        "Modelos que convertam leituras em taxa de corrosão e alertas.",
        "Plano de teste piloto em uma unidade de refino.",
      ],
    },
    {
      id: "umbilicais-intervencao-pocos",
      foco: 18,
      modulo: "parcerias",
      titulo: "Inspeção de umbilicais de serviço para intervenção em poços submarinos",
      resumo: "Métodos para avaliar a integridade de umbilicais usados em intervenções, antes e depois de cada operação.",
      area: "Submarino e Poços",
      tema: "Inspeção",
      prazoDias: 4,
      publicadoDias: 61,
      valor: "Até R$ 3 milhões",
      duracao: "Até 30 meses",
      trl: [3, 5],
      contexto: "Umbilicais de serviço são reutilizados em várias intervenções. Avaliar sua integridade com rapidez reduz o risco operacional e o tempo de preparação entre campanhas.",
      buscamos: [
        "Técnicas não destrutivas aplicáveis em base de apoio ou a bordo.",
        "Critérios de aceitação para reuso baseados em dados de ensaio.",
        "Protocolo de inspeção que caiba na janela entre operações.",
      ],
    },
    {
      id: "metano-sensoriamento-remoto",
      foco: 50,
      modulo: "aquisicao",
      titulo: "Detecção e quantificação de emissões de metano por sensoriamento remoto",
      resumo: "Soluções prontas, com satélite, drone ou sensores fixos, para medir emissões de metano em ativos de produção.",
      area: "Sustentabilidade",
      tema: "Redução de carbono",
      prazoDias: 33,
      publicadoDias: 15,
      valor: "Até R$ 1,5 milhão",
      duracao: "Até 12 meses",
      trl: [8, 9],
      contexto: "Medir emissões de metano com precisão é o primeiro passo para reduzi-las. Buscamos soluções já disponíveis no mercado que possam ser aplicadas em ativos de produção.",
      buscamos: [
        "Tecnologia em operação comercial, com casos de uso comprovados.",
        "Quantificação por fonte, com incerteza declarada.",
        "Painel ou integração para acompanhamento contínuo das medições.",
      ],
    },
    {
      id: "armazenamento-energia-plataformas",
      foco: 18,
      modulo: "startups",
      titulo: "Armazenamento de energia para plataformas desabitadas",
      resumo: "Baterias ou outras tecnologias que garantam energia estável em instalações offshore não tripuladas.",
      area: "Transição energética",
      tema: "Armazenamento e geração de energia",
      prazoDias: 58,
      publicadoDias: 9,
      valor: "Até R$ 2 milhões",
      duracao: "Até 24 meses",
      trl: [4, 6],
      contexto: "Instalações offshore não tripuladas precisam de energia confiável para sensores, válvulas e comunicação, com o mínimo de manutenção possível.",
      buscamos: [
        "Sistemas de armazenamento adequados a ambiente marinho e áreas classificadas.",
        "Gestão remota de carga, saúde e segurança do sistema.",
        "Integração com geração renovável local, quando houver.",
        "Estimativa de vida útil e de intervalos de manutenção.",
      ],
    },
    {
      id: "modelagem-geologica-ia",
      foco: 50,
      modulo: "aquisicao",
      titulo: "Modelagem geológica assistida por IA para reservatórios do pré-sal",
      resumo: "Ferramentas de interpretação sísmica e modelagem que reduzam o tempo de construção de modelos de reservatório.",
      area: "Exploração e Produção",
      tema: "Modelagem geológica",
      prazoDias: 71,
      publicadoDias: 6,
      valor: "Até R$ 1,5 milhão",
      duracao: "Até 12 meses",
      trl: [8, 9],
      contexto: "A construção de modelos geológicos dos reservatórios do pré-sal envolve grande volume de dados sísmicos e de poço. Ferramentas que acelerem a interpretação liberam os especialistas para as decisões que importam.",
      buscamos: [
        "Ferramentas em uso comercial para interpretação sísmica assistida.",
        "Compatibilidade com formatos e fluxos de trabalho padrão da indústria.",
        "Transparência sobre os modelos e possibilidade de validação pelos geocientistas.",
      ],
    },
    {
      id: "captura-co2-baixa-pressao",
      foco: 50,
      modulo: "encomendas",
      titulo: "Captura de CO₂ em correntes de baixa pressão",
      resumo: "Desenvolvimento de rota tecnológica para capturar CO₂ em correntes diluídas, sem solução comercial disponível hoje.",
      area: "Refino",
      tema: "Redução de carbono",
      prazoDias: 88,
      publicadoDias: 3,
      valor: "Até R$ 8 milhões",
      duracao: "Até 36 meses",
      trl: [3, 6],
      contexto: "Correntes diluídas e de baixa pressão concentram parte relevante das emissões do refino. As tecnologias comerciais atuais não atendem esse cenário com custo e eficiência adequados.",
      buscamos: [
        "Rota tecnológica com evidências de laboratório e plano de escalonamento.",
        "Estimativa de consumo energético e de custo por tonelada capturada.",
        "Equipe com experiência em desenvolvimento de processos.",
        "Plano de P&D com marcos e critérios de decisão claros.",
      ],
    },
    {
      id: "drones-inspecao-tochas",
      foco: 76,
      modulo: "startups",
      titulo: "Drones para inspeção de tochas e chaminés em operação",
      resumo: "Inspeção visual e térmica de estruturas altas sem andaimes e sem parar a unidade.",
      area: "Refino",
      tema: "Inspeção",
      prazoDias: 17,
      publicadoDias: 40,
      valor: "Até R$ 2 milhões",
      duracao: "Até 18 meses",
      trl: [5, 7],
      contexto: "Tochas e chaminés são inspecionadas com andaimes ou em paradas programadas. Drones podem antecipar problemas e reduzir a exposição de pessoas ao risco.",
      buscamos: [
        "Drones aptos a voar perto de fontes de calor e em áreas classificadas.",
        "Imagens visuais e térmicas com registro de posição.",
        "Análise automática de anomalias com revisão por especialista.",
      ],
    },
    {
      id: "catalisadores-alquilacao-aromaticos",
      foco: 71,
      modulo: "encomendas",
      titulo: "Catalisadores para alquilação de aromáticos",
      resumo: "Encomenda tecnológica para catalisador com maior seletividade e vida útil no processo de alquilação.",
      area: "Refino",
      tema: "Materiais",
      prazoDias: -40,
      publicadoDias: 160,
      valor: "Até R$ 10 milhões",
      duracao: "Até 48 meses",
      trl: [3, 6],
      contexto: "O processo de alquilação de aromáticos depende de catalisadores com boa seletividade e longa vida útil. A chamada buscou novas formulações com desempenho superior.",
      buscamos: [
        "Formulações com ganho de seletividade comprovado em bancada.",
        "Plano de escalonamento até teste em unidade piloto.",
      ],
    },
    {
      id: "gemeo-digital-compressores",
      foco: 7,
      modulo: "startups",
      titulo: "Gêmeo digital para manutenção preditiva de compressores",
      resumo: "Modelos que combinem física e dados de operação para prever falhas em compressores.",
      area: "Gás e Energia",
      tema: "Tecnologias digitais",
      prazoDias: -22,
      publicadoDias: 120,
      valor: "Até R$ 1 milhão",
      duracao: "Até 18 meses",
      trl: [4, 6],
      contexto: "Falhas em compressores geram paradas caras. Modelos que unem física e dados de operação podem prever desgastes e orientar a manutenção.",
      buscamos: [
        "Modelos híbridos, físicos e de dados, para equipamentos rotativos.",
        "Integração com dados históricos e de tempo real.",
      ],
    },
    {
      id: "licenciamento-sensor-fibra-optica",
      foco: 50,
      modulo: "transferencia",
      titulo: "Licenciamento de tecnologia de sensoriamento por fibra óptica",
      resumo: "Oferta de licença de tecnologia desenvolvida pela Petrobras para monitoramento por fibra óptica.",
      area: "Exploração e Produção",
      tema: "Inspeção",
      prazoDias: -15,
      publicadoDias: 95,
      valor: "Royalties sobre as vendas",
      duracao: "Licença de 10 anos",
      trl: [7, 7],
      contexto: "A Petrobras desenvolveu uma tecnologia de sensoriamento distribuído por fibra óptica e buscou empresas interessadas em produzi-la e comercializá-la.",
      buscamos: [
        "Empresas com capacidade de fabricação e distribuição.",
        "Plano de negócios para o mercado nacional.",
      ],
    },
  ];

  /*
    Projetos de chamadas anteriores: mostram o retorno de quem participou.
    ILUSTRATIVOS: empresas, grupos de pesquisa, valores e resultados são fictícios.
    Na versão final, viriam de casos reais autorizados pelos participantes.
    etapa: onde o projeto está hoje (rótulos em CI.etapas)
    impacto: { petrobras, empresa }, cada um com [número, o que ele mede]; o primeiro de cada lado aparece no card
    caminho: marcos do projeto, do aceite ao resultado
  */
  CI.etapas = {
    contrato: "Virou contrato",
    operacao: "Em operação",
    escala: "Em expansão",
    licenca: "Tecnologia licenciada",
    qualificacao: "Em teste de campo",
  };

  CI.projetos = [
    {
      id: "drones-faixa-dutos",
      modulo: "startups",
      ano: 2023,
      titulo: "Inspeção de faixas de dutos com drones e visão computacional",
      empresa: "Voa Inspeções",
      perfil: "Startup de Natal (RN)",
      area: "Exploração e Produção",
      tema: "Inspeção",
      etapa: "contrato",
      aporte: "R$ 1,4 milhão",
      duracao: "12 meses",
      resumo: "Drones com câmera térmica e um modelo de visão computacional que aponta vazamentos, erosão e obras irregulares na faixa dos dutos.",
      impacto: {
        petrobras: [
          ["−42%", "no tempo de inspeção por quilômetro"],
          ["2×", "mais inspeções nos trechos críticos"],
        ],
        empresa: [
          ["R$ 3,8 mi", "em contrato de serviço por três anos"],
          ["11 → 34", "pessoas na equipe"],
        ],
      },
      desafio: "As faixas de dutos terrestres eram percorridas a pé ou de carro, com relatórios em papel e semanas entre uma visita e outra.",
      solucao: "A startup adaptou drones de longo alcance e treinou um modelo que encontra manchas de vazamento, erosão e obras na faixa, com cada ponto georreferenciado no relatório.",
      caminho: [
        ["Proposta selecionada no edital com o Sebrae", "mês 0"],
        ["Primeiro voo em faixa real, com a equipe da Petrobras", "mês 4"],
        ["Piloto em 120 km de dutos", "mês 9"],
        ["Contrato de serviço assinado", "mês 14"],
      ],
      retornoEmpresa: [
        "Contrato de serviço de três anos com a Petrobras.",
        "Resultados de campo que ajudaram a captar uma rodada de investimento.",
        "Dois novos clientes do setor de saneamento no ano seguinte.",
      ],
      retornoPetrobras: [
        "Inspeção quinzenal, e não mensal, nos trechos críticos.",
        "Menos pessoas expostas a deslocamentos em áreas remotas.",
      ],
      depoimento: ["Ter a Petrobras como primeiro cliente mudou a conversa com os investidores. Saímos do piloto com contrato e com dados reais de campo.", "Cofundadora e diretora de operações"],
    },
    {
      id: "preditiva-bombas-ia",
      modulo: "startups",
      ano: 2024,
      titulo: "Manutenção preditiva de bombas com inteligência artificial",
      empresa: "Preditiva Labs",
      perfil: "Startup de Recife (PE)",
      area: "Gás e Energia",
      tema: "Tecnologias digitais",
      etapa: "escala",
      aporte: "R$ 900 mil",
      duracao: "10 meses",
      resumo: "Modelos que cruzam vibração, temperatura e dados de operação para avisar, com dias de antecedência, quando uma bomba vai falhar.",
      impacto: {
        petrobras: [
          ["3", "falhas de bombas evitadas no piloto"],
          ["120", "bombas monitoradas na expansão"],
        ],
        empresa: [
          ["R$ 1,6 mi", "no contrato de expansão"],
          ["R$ 5 mi", "captados em rodada seed depois do piloto"],
        ],
      },
      desafio: "Paradas inesperadas de bombas centrífugas interrompiam o escoamento e geravam reparos caros e urgentes.",
      solucao: "A startup integrou dados históricos e de tempo real e criou alertas que chegam à equipe de manutenção com a causa provável da falha.",
      caminho: [
        ["Proposta selecionada no edital com o Sebrae", "mês 0"],
        ["Integração com os dados históricos", "mês 3"],
        ["Piloto em 18 bombas", "mês 6"],
        ["Contrato de expansão para 120 bombas", "mês 12"],
      ],
      retornoEmpresa: [
        "Contrato para levar a solução a mais 120 bombas.",
        "Rodada de investimento puxada pelos resultados do piloto.",
        "Mentoria técnica da Petrobras e consultoria de negócios do Sebrae.",
      ],
      retornoPetrobras: [
        "Manutenção planejada no lugar de reparos de emergência.",
        "Menos horas de escoamento perdidas.",
      ],
      depoimento: ["O piloto nos deu dados que nenhum laboratório daria. Foi isso que convenceu os investidores.", "CEO"],
    },
    {
      id: "revestimento-reparo-dutos",
      modulo: "parcerias",
      ano: 2022,
      titulo: "Revestimento polimérico para reparo de dutos sem parada",
      empresa: "Laboratório de Polímeros Aplicados",
      perfil: "Grupo de pesquisa de universidade federal (RJ)",
      area: "Submarino e Poços",
      tema: "Materiais",
      etapa: "qualificacao",
      aporte: "R$ 3,2 milhões",
      duracao: "30 meses",
      resumo: "Um revestimento compósito aplicado com a linha em operação, para reparar trechos com perda de espessura sem parar a produção.",
      impacto: {
        petrobras: [
          ["+60%", "de vida útil do reparo no ensaio acelerado"],
          ["0", "paradas de produção para aplicar o reparo"],
        ],
        empresa: [
          ["2", "patentes depositadas em cotitularidade"],
          ["14", "pesquisadores e bolsistas no projeto"],
        ],
      },
      desafio: "Reparar dutos com perda de espessura exigia parar a linha ou instalar abraçadeiras metálicas pesadas.",
      solucao: "O grupo desenvolveu uma formulação polimérica e um método de aplicação em campo, testados em ensaios acelerados de pressão e temperatura.",
      caminho: [
        ["Termo de cooperação assinado com o CENPES", "mês 0"],
        ["Formulação aprovada em bancada", "mês 12"],
        ["Ensaios acelerados em escala real", "mês 24"],
        ["Teste de campo programado", "mês 30"],
      ],
      retornoEmpresa: [
        "Laboratório de ensaios acelerados, que segue em uso pelo grupo.",
        "Duas patentes em cotitularidade com a Petrobras.",
        "Bolsas para nove alunos de mestrado e doutorado.",
      ],
      retornoPetrobras: [
        "Reparo aplicado com a linha em operação, sem parada de produção.",
        "Material pronto para os testes de campo.",
      ],
      depoimento: ["O projeto deu ao grupo uma estrutura de ensaios que não teríamos sozinhos, e colocou os alunos para resolver um problema real.", "Coordenador do laboratório"],
    },
    {
      id: "ia-interpretacao-sismica",
      modulo: "parcerias",
      ano: 2023,
      titulo: "Inteligência artificial para interpretação sísmica do pré-sal",
      empresa: "Grupo de Geofísica Computacional",
      perfil: "Grupo de pesquisa de universidade estadual (SP)",
      area: "Exploração e Produção",
      tema: "Modelagem geológica",
      etapa: "operacao",
      aporte: "R$ 4,8 milhões",
      duracao: "36 meses",
      resumo: "Redes neurais treinadas com dados da Petrobras que sugerem horizontes e falhas sísmicas para o intérprete revisar.",
      impacto: {
        petrobras: [
          ["5×", "mais rápido para mapear horizontes sísmicos"],
        ],
        empresa: [
          ["9", "artigos em revistas internacionais"],
          ["22", "alunos formados no projeto"],
        ],
      },
      desafio: "Interpretar os dados sísmicos do pré-sal exigia semanas de trabalho manual em cada bloco.",
      solucao: "O grupo treinou modelos com dados reais e entregou uma ferramenta que propõe a interpretação inicial, com a decisão final sempre do intérprete.",
      caminho: [
        ["Termo de cooperação assinado com o CENPES", "mês 0"],
        ["Primeiros modelos treinados", "mês 10"],
        ["Testes com a equipe de interpretação", "mês 24"],
        ["Ferramenta em uso interno", "mês 36"],
      ],
      retornoEmpresa: [
        "Infraestrutura de computação de alto desempenho para o grupo.",
        "Acesso a dados reais para pesquisa e formação de alunos.",
        "Publicações em revistas internacionais.",
      ],
      retornoPetrobras: [
        "Interpretação mais rápida nas fases iniciais dos projetos.",
        "Ferramenta mantida pela equipe interna.",
      ],
      depoimento: ["Trabalhar com dados reais do pré-sal levou o grupo a outro patamar de pesquisa.", "Coordenadora do grupo"],
    },
    {
      id: "sensor-espessura-sem-fio",
      modulo: "encomendas",
      ano: 2021,
      titulo: "Sensor sem fio de espessura de parede para tubulações",
      empresa: "Sonda Sensores Industriais",
      perfil: "Empresa de base tecnológica de Campinas (SP)",
      area: "Refino",
      tema: "Corrosão",
      etapa: "operacao",
      aporte: "R$ 6,5 milhões",
      duracao: "24 meses",
      resumo: "Um sensor ultrassônico a bateria que mede a espessura da tubulação todos os dias e envia os dados para o sistema de integridade.",
      impacto: {
        petrobras: [
          ["−70%", "de inspeções manuais nos pontos monitorados"],
          ["3", "refinarias com o sensor em operação"],
        ],
        empresa: [
          ["R$ 9 mi", "em vendas para outros clientes"],
          ["12 → 30", "pessoas na engenharia"],
        ],
      },
      desafio: "Medir a perda de espessura dependia de inspeções manuais, com andaimes, trabalho em altura e paradas programadas.",
      solucao: "A empresa desenvolveu o sensor, o rádio de baixo consumo e a integração com o sistema de integridade, até a homologação do produto.",
      caminho: [
        ["Encomenda tecnológica contratada", "mês 0"],
        ["Protótipo aprovado em bancada", "mês 8"],
        ["Teste em unidade de destilação", "mês 16"],
        ["Produto homologado e em operação", "mês 24"],
      ],
      retornoEmpresa: [
        "Produto homologado, que virou a principal linha da empresa.",
        "Vendas para outras indústrias de processo.",
        "Equipe de engenharia ampliada de 12 para 30 pessoas.",
      ],
      retornoPetrobras: [
        "Monitoramento contínuo nos pontos com maior risco de corrosão.",
        "Menos andaimes e menos horas de trabalho em altura.",
      ],
      depoimento: ["A encomenda pagou um desenvolvimento que o mercado ainda não pedia. Hoje é o produto que mais vendemos.", "Diretor de tecnologia"],
    },
    {
      id: "gestao-emissoes-fugitivas",
      modulo: "aquisicao",
      ano: 2024,
      titulo: "Plataforma de gestão de emissões fugitivas",
      empresa: "Tera Clima Digital",
      perfil: "Empresa de software de São Paulo (SP)",
      area: "Sustentabilidade",
      tema: "Redução de carbono",
      etapa: "contrato",
      aporte: "R$ 2,1 milhões em contrato",
      duracao: "8 meses do edital ao contrato",
      resumo: "Um software que reúne as detecções de vazamento, prioriza os reparos e gera o inventário de emissões no formato exigido pelos órgãos reguladores.",
      impacto: {
        petrobras: [
          ["5", "unidades com inventário de emissões no primeiro ano"],
        ],
        empresa: [
          ["R$ 2,1 mi", "no primeiro contrato"],
          ["8 meses", "da publicação do edital à assinatura"],
        ],
      },
      desafio: "Os vazamentos detectados em campo ficavam espalhados em planilhas, o que atrasava os reparos e os relatórios de emissões.",
      solucao: "Como a solução já existia, a empresa fez uma prova de conceito com dados reais e adaptou os relatórios ao padrão da Petrobras.",
      caminho: [
        ["Edital de Aquisição de Soluções publicado", "mês 0"],
        ["Prova de conceito com dados reais", "mês 3"],
        ["Avaliação técnica e comercial", "mês 6"],
        ["Contrato assinado", "mês 8"],
      ],
      retornoEmpresa: [
        "Contrato de licença de uso e suporte com a Petrobras.",
        "Uma referência que abriu negociações com outras operadoras.",
      ],
      retornoPetrobras: [
        "Reparos priorizados pelo volume estimado de gás.",
        "Inventário de emissões pronto em dias, e não em semanas.",
      ],
      depoimento: ["Com a solução pronta, o caminho foi direto: prova de conceito, avaliação e contrato em menos de um ano.", "Gerente de contas"],
    },
    {
      id: "separador-agua-oleo",
      modulo: "transferencia",
      ano: 2022,
      titulo: "Separador compacto de água e óleo, licenciado para produção em série",
      empresa: "Fluxa Equipamentos",
      perfil: "Fabricante de equipamentos de Joinville (SC)",
      area: "Exploração e Produção",
      tema: "Inspeção",
      etapa: "licenca",
      aporte: "Licença com pagamento de royalties",
      duracao: "18 meses até a primeira venda",
      resumo: "A fabricante licenciou um separador desenvolvido pela Petrobras, adaptou o projeto para produção em série e passou a vendê-lo a outras empresas.",
      impacto: {
        petrobras: [
          ["40", "unidades instaladas no Brasil e no exterior"],
        ],
        empresa: [
          ["R$ 12 mi", "em vendas no segundo ano"],
          ["18 meses", "da licença à primeira venda"],
        ],
      },
      desafio: "A Petrobras desenvolveu um separador compacto de água e óleo e buscou uma empresa para produzi-lo e vendê-lo.",
      solucao: "A fabricante licenciou a tecnologia, recebeu o conhecimento da equipe do CENPES e adaptou o projeto para a produção em série.",
      caminho: [
        ["Licença assinada", "mês 0"],
        ["Transferência de conhecimento com o CENPES", "meses 1 a 6"],
        ["Primeiro lote fabricado", "mês 14"],
        ["Primeira venda", "mês 18"],
      ],
      retornoEmpresa: [
        "Nova linha de produtos, com tecnologia já validada.",
        "Acesso ao conhecimento da equipe que criou a tecnologia.",
        "Exportação para dois países da América do Sul.",
      ],
      retornoPetrobras: [
        "Royalties sobre as vendas.",
        "Fornecedor nacional da própria tecnologia.",
      ],
      depoimento: ["Licenciar uma tecnologia validada encurtou anos de desenvolvimento. Em um ano e meio já estávamos vendendo.", "Diretor industrial"],
    },
  ];
})();
