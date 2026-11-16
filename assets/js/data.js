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

  CI.modulos = {
    startups: {
      nome: "Startups",
      icone: "lightbulb-filament",
      publico: "Startups e pequenas empresas",
      formato: "Projeto de desenvolvimento com o Sebrae",
    },
    parcerias: {
      nome: "Parcerias Tecnológicas",
      icone: "flask",
      publico: "Universidades e ICTs",
      formato: "Projeto de pesquisa em cooperação",
    },
    encomendas: {
      nome: "Encomendas Tecnológicas",
      icone: "target",
      publico: "Empresas e ICTs com capacidade de P&D",
      formato: "Encomenda tecnológica",
    },
    aquisicao: {
      nome: "Aquisição de Soluções",
      icone: "package",
      publico: "Empresas com solução pronta",
      formato: "Contratação de solução",
    },
    transferencia: {
      nome: "Transferência de Tecnologias",
      icone: "key",
      publico: "Empresas interessadas em licenciar",
      formato: "Licenciamento de tecnologia",
    },
  };

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
    { icone: "target", titulo: "Aderência ao desafio", texto: "Quanto a proposta responde ao problema descrito e aos requisitos técnicos." },
    { icone: "flask", titulo: "Maturidade e inovação", texto: "Estágio atual da solução e o avanço que ela representa frente ao que existe." },
    { icone: "users", titulo: "Equipe e execução", texto: "Experiência da equipe e capacidade de entregar o plano de trabalho." },
    { icone: "calendar-check", titulo: "Plano e orçamento", texto: "Clareza de etapas, entregas, prazos e coerência dos custos previstos." },
  ];

  /*
    prazoDias: dias até o fim das inscrições (negativo = encerrado)
    publicadoDias: há quantos dias a chamada foi publicada
  */
  CI.desafios = [
    {
      id: "inspecao-autonoma-cascos-fpso",
      modulo: "startups",
      titulo: "Inspeção autônoma de cascos de FPSO com robôs submarinos",
      resumo: "Robôs ou sistemas embarcados que inspecionem cascos de unidades flutuantes sem parar a produção e sem depender de mergulho.",
      area: "Exploração e Produção",
      tema: "Robótica",
      prazoDias: 26,
      publicadoDias: 34,
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
      modulo: "parcerias",
      titulo: "Materiais poliméricos para integridade de estruturas não metálicas",
      resumo: "Cooperação com universidades e ICTs para entender envelhecimento e falha de polímeros em sistemas submarinos, poços e transição energética.",
      area: "Submarino e Poços",
      tema: "Materiais",
      prazoDias: 41,
      publicadoDias: 20,
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
      modulo: "startups",
      titulo: "Monitoramento de corrosão em tempo real em linhas de processo",
      resumo: "Sensores e análise de dados para acompanhar a taxa de corrosão em tubulações de refinarias sem interromper a operação.",
      area: "Refino",
      tema: "Corrosão",
      prazoDias: 9,
      publicadoDias: 52,
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
      modulo: "parcerias",
      titulo: "Inspeção de umbilicais de serviço para intervenção em poços submarinos",
      resumo: "Métodos para avaliar a integridade de umbilicais usados em intervenções, antes e depois de cada operação.",
      area: "Submarino e Poços",
      tema: "Inspeção",
      prazoDias: 4,
      publicadoDias: 61,
      contexto: "Umbilicais de serviço são reutilizados em várias intervenções. Avaliar sua integridade com rapidez reduz o risco operacional e o tempo de preparação entre campanhas.",
      buscamos: [
        "Técnicas não destrutivas aplicáveis em base de apoio ou a bordo.",
        "Critérios de aceitação para reuso baseados em dados de ensaio.",
        "Protocolo de inspeção que caiba na janela entre operações.",
      ],
    },
    {
      id: "metano-sensoriamento-remoto",
      modulo: "aquisicao",
      titulo: "Detecção e quantificação de emissões de metano por sensoriamento remoto",
      resumo: "Soluções prontas, com satélite, drone ou sensores fixos, para medir emissões de metano em ativos de produção.",
      area: "Sustentabilidade",
      tema: "Redução de carbono",
      prazoDias: 33,
      publicadoDias: 15,
      contexto: "Medir emissões de metano com precisão é o primeiro passo para reduzi-las. Buscamos soluções já disponíveis no mercado que possam ser aplicadas em ativos de produção.",
      buscamos: [
        "Tecnologia em operação comercial, com casos de uso comprovados.",
        "Quantificação por fonte, com incerteza declarada.",
        "Painel ou integração para acompanhamento contínuo das medições.",
      ],
    },
    {
      id: "armazenamento-energia-plataformas",
      modulo: "startups",
      titulo: "Armazenamento de energia para plataformas desabitadas",
      resumo: "Baterias ou outras tecnologias que garantam energia estável em instalações offshore não tripuladas.",
      area: "Transição energética",
      tema: "Armazenamento e geração de energia",
      prazoDias: 58,
      publicadoDias: 9,
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
      modulo: "aquisicao",
      titulo: "Modelagem geológica assistida por IA para reservatórios do pré-sal",
      resumo: "Ferramentas de interpretação sísmica e modelagem que reduzam o tempo de construção de modelos de reservatório.",
      area: "Exploração e Produção",
      tema: "Modelagem geológica",
      prazoDias: 71,
      publicadoDias: 6,
      contexto: "A construção de modelos geológicos dos reservatórios do pré-sal envolve grande volume de dados sísmicos e de poço. Ferramentas que acelerem a interpretação liberam os especialistas para as decisões que importam.",
      buscamos: [
        "Ferramentas em uso comercial para interpretação sísmica assistida.",
        "Compatibilidade com formatos e fluxos de trabalho padrão da indústria.",
        "Transparência sobre os modelos e possibilidade de validação pelos geocientistas.",
      ],
    },
    {
      id: "captura-co2-baixa-pressao",
      modulo: "encomendas",
      titulo: "Captura de CO₂ em correntes de baixa pressão",
      resumo: "Desenvolvimento de rota tecnológica para capturar CO₂ em correntes diluídas, sem solução comercial disponível hoje.",
      area: "Refino",
      tema: "Redução de carbono",
      prazoDias: 88,
      publicadoDias: 3,
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
      modulo: "startups",
      titulo: "Drones para inspeção de tochas e chaminés em operação",
      resumo: "Inspeção visual e térmica de estruturas altas sem andaimes e sem parar a unidade.",
      area: "Refino",
      tema: "Inspeção",
      prazoDias: 17,
      publicadoDias: 40,
      contexto: "Tochas e chaminés são inspecionadas com andaimes ou em paradas programadas. Drones podem antecipar problemas e reduzir a exposição de pessoas ao risco.",
      buscamos: [
        "Drones aptos a voar perto de fontes de calor e em áreas classificadas.",
        "Imagens visuais e térmicas com registro de posição.",
        "Análise automática de anomalias com revisão por especialista.",
      ],
    },
    {
      id: "catalisadores-alquilacao-aromaticos",
      modulo: "encomendas",
      titulo: "Catalisadores para alquilação de aromáticos",
      resumo: "Encomenda tecnológica para catalisador com maior seletividade e vida útil no processo de alquilação.",
      area: "Refino",
      tema: "Materiais",
      prazoDias: -40,
      publicadoDias: 160,
      contexto: "O processo de alquilação de aromáticos depende de catalisadores com boa seletividade e longa vida útil. A chamada buscou novas formulações com desempenho superior.",
      buscamos: [
        "Formulações com ganho de seletividade comprovado em bancada.",
        "Plano de escalonamento até teste em unidade piloto.",
      ],
    },
    {
      id: "gemeo-digital-compressores",
      modulo: "startups",
      titulo: "Gêmeo digital para manutenção preditiva de compressores",
      resumo: "Modelos que combinem física e dados de operação para prever falhas em compressores.",
      area: "Gás e Energia",
      tema: "Tecnologias digitais",
      prazoDias: -22,
      publicadoDias: 120,
      contexto: "Falhas em compressores geram paradas caras. Modelos que unem física e dados de operação podem prever desgastes e orientar a manutenção.",
      buscamos: [
        "Modelos híbridos, físicos e de dados, para equipamentos rotativos.",
        "Integração com dados históricos e de tempo real.",
      ],
    },
    {
      id: "licenciamento-sensor-fibra-optica",
      modulo: "transferencia",
      titulo: "Licenciamento de tecnologia de sensoriamento por fibra óptica",
      resumo: "Oferta de licença de tecnologia desenvolvida pela Petrobras para monitoramento por fibra óptica.",
      area: "Exploração e Produção",
      tema: "Inspeção",
      prazoDias: -15,
      publicadoDias: 95,
      contexto: "A Petrobras desenvolveu uma tecnologia de sensoriamento distribuído por fibra óptica e buscou empresas interessadas em produzi-la e comercializá-la.",
      buscamos: [
        "Empresas com capacidade de fabricação e distribuição.",
        "Plano de negócios para o mercado nacional.",
      ],
    },
  ];
})();
