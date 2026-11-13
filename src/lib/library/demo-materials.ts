import type { Material } from "./catalog";
// Dados de referência para os testes. O catálogo público é consultado no Supabase.
export const demoMaterials: Material[] = [
  {
    "id": "demo-01",
    "title": "Algoritmos no dia a dia",
    "description": "Instruções, execução, identificação de erros e repetições.",
    "type": [
      "Sequência de atividades"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EF · 4º e 5º ano",
    "keywords": [
      "algoritmos",
      "sequências",
      "repetições",
      "depuração"
    ],
    "authorship": "EduComp",
    "objectives": "Organizar instruções sequenciais, identificar erros e reconhecer repetições em algoritmos do cotidiano."
  },
  {
    "id": "demo-02",
    "title": "Privacidade e segurança",
    "description": "O que compartilhar e o que manter em segurança na internet?",
    "type": [
      "Aula completa"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EF · 7º ano",
    "keywords": [
      "privacidade",
      "segurança",
      "dados pessoais",
      "internet"
    ],
    "authorship": "EduComp",
    "objectives": "Distinguir informações pessoais e públicas e estabelecer cuidados para compartilhar dados na internet."
  },
  {
    "id": "demo-03",
    "title": "Jogos de lógica",
    "description": "Pistas e desafios para praticar o raciocínio lógico.",
    "type": [
      "Jogo"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EF · 5º ano",
    "keywords": [
      "lógica",
      "raciocínio"
    ],
    "authorship": "EduComp",
    "objectives": "Resolver desafios por dedução e argumentar sobre estratégias de raciocínio lógico."
  },
  {
    "id": "demo-04",
    "title": "Histórias no Scratch",
    "description": "Apresentação para criar histórias interativas no Scratch.",
    "type": [
      "Slides"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Plugada"
    ],
    "year": "EF · 6º ano",
    "keywords": [
      "scratch",
      "programação",
      "histórias"
    ],
    "authorship": "EduComp",
    "objectives": "Planejar personagens, cenas e comandos para uma narrativa interativa no Scratch."
  },
  {
    "id": "demo-05",
    "title": "Redes e conexões",
    "description": "Guia ilustrado sobre redes, dispositivos e internet.",
    "type": [
      "Material de apoio"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Plugada"
    ],
    "year": "EF · 7º ano",
    "keywords": [
      "redes",
      "internet"
    ],
    "authorship": "EduComp",
    "objectives": "Reconhecer redes e dispositivos conectados e explicar trocas de informações na internet."
  },
  {
    "id": "demo-06",
    "title": "Segurança na internet",
    "description": "Aulas sobre senhas, golpes e cuidados no ambiente digital.",
    "type": [
      "Sequência didática"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ],
    "year": "EF · 8º ano",
    "keywords": [
      "senhas",
      "segurança",
      "internet"
    ],
    "authorship": "EduComp",
    "objectives": "Identificar riscos digitais e formular medidas de proteção contra golpes e exposição de dados."
  },
  {
    "id": "demo-07",
    "title": "Padrões e formas",
    "description": "Brincadeiras com cores e formas para reconhecer padrões.",
    "type": [
      "Jogo"
    ],
    "stage": [
      "Educação Infantil"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EI · 5 anos",
    "keywords": [
      "padrões",
      "formas"
    ],
    "authorship": "EduComp",
    "objectives": "Observar, comparar e continuar padrões de cores, formas e sequências."
  },
  {
    "id": "demo-08",
    "title": "Dados e privacidade",
    "description": "Debata a coleta, o uso e a proteção de dados pessoais.",
    "type": [
      "Plano de aula"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ],
    "year": "EM · 1ª série",
    "keywords": [
      "privacidade",
      "dados"
    ],
    "authorship": "EduComp",
    "objectives": "Debater consentimento, coleta de dados e atitudes responsáveis em situações digitais."
  },
  {
    "id": "demo-09",
    "title": "Comandos com blocos",
    "description": "Use blocos e cartões para montar sequências de comandos.",
    "type": [
      "Atividade"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EF · 3º ano",
    "keywords": [
      "comandos",
      "algoritmos"
    ],
    "authorship": "EduComp",
    "objectives": "Organizar blocos de comandos e prever o resultado de uma sequência de instruções."
  },
  {
    "id": "demo-10",
    "title": "Mensagens codificadas",
    "description": "Desafios de criptografia simples com símbolos e códigos.",
    "type": [
      "Atividade"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EF · 9º ano",
    "keywords": [
      "criptografia",
      "códigos"
    ],
    "authorship": "EduComp",
    "objectives": "Representar e decodificar mensagens com regras simples de substituição e símbolos."
  },
  {
    "id": "demo-11",
    "title": "Cidadania digital",
    "description": "Apresentação sobre respeito e convivência nas redes.",
    "type": [
      "Slides"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada"
    ],
    "year": "EM · 2ª série",
    "keywords": [
      "cidadania",
      "convivência"
    ],
    "authorship": "EduComp",
    "objectives": "Reconhecer práticas de respeito, participação e segurança nos espaços digitais."
  },
  {
    "id": "demo-12",
    "title": "Caminhos e movimentos",
    "description": "Percursos com setas e brincadeiras para explorar algoritmos.",
    "type": [
      "Material de apoio"
    ],
    "stage": [
      "Educação Infantil"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EI · 4 anos",
    "keywords": [
      "algoritmos",
      "movimentos"
    ],
    "authorship": "EduComp",
    "objectives": "Representar deslocamentos com comandos, setas e percursos."
  },
  {
    "id": "demo-13",
    "title": "Meu primeiro programa",
    "description": "Explore comandos e repetições em uma animação simples.",
    "type": [
      "Plano de aula"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Plugada"
    ],
    "year": "EF · 5º ano",
    "keywords": [
      "programação",
      "repetição"
    ],
    "authorship": "EduComp",
    "objectives": "Criar uma animação com comandos e repetições simples."
  },
  {
    "id": "demo-14",
    "title": "Como funciona o computador",
    "description": "Conheça os componentes e suas funções.",
    "type": [
      "Slides"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ],
    "year": "EF · 6º ano",
    "keywords": [
      "hardware",
      "computador"
    ],
    "authorship": "EduComp",
    "objectives": "Identificar componentes básicos do computador e explicar suas funções."
  },
  {
    "id": "demo-15",
    "title": "Detetives da informação",
    "description": "Investigue pistas para avaliar informações na internet.",
    "type": [
      "Jogo"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ],
    "year": "EF · 8º ano",
    "keywords": [
      "informação",
      "fontes"
    ],
    "authorship": "EduComp",
    "objectives": "Avaliar evidências e comparar fontes de informação na internet."
  },
  {
    "id": "demo-16",
    "title": "Contando em binário",
    "description": "Represente números usando apenas dois símbolos.",
    "type": [
      "Atividade"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EF · 7º ano",
    "keywords": [
      "binário",
      "números"
    ],
    "authorship": "EduComp",
    "objectives": "Compreender a ideia de representação binária de números."
  },
  {
    "id": "demo-17",
    "title": "Robôs no papel",
    "description": "Crie instruções para um personagem percorrer um mapa.",
    "type": [
      "Atividade"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EF · 4º ano",
    "keywords": [
      "robôs",
      "mapas"
    ],
    "authorship": "EduComp",
    "objectives": "Planejar trajetos por meio de instruções precisas e testar suas soluções."
  },
  {
    "id": "demo-18",
    "title": "Histórias com padrões",
    "description": "Reconheça repetições em histórias e brincadeiras.",
    "type": [
      "Sequência didática"
    ],
    "stage": [
      "Educação Infantil"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EI · 5 anos",
    "keywords": [
      "padrões",
      "histórias"
    ],
    "authorship": "EduComp",
    "objectives": "Identificar regularidades e construir narrativas baseadas em padrões."
  },
  {
    "id": "demo-19",
    "title": "Imagens e pixels",
    "description": "Descubra como imagens digitais são representadas.",
    "type": [
      "Material de apoio"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ],
    "year": "EF · 6º ano",
    "keywords": [
      "pixels",
      "imagens"
    ],
    "authorship": "EduComp",
    "objectives": "Descrever como pixels formam imagens e experimentar resoluções distintas."
  },
  {
    "id": "demo-20",
    "title": "Decisões e condições",
    "description": "Explore escolhas e condições em pequenos programas.",
    "type": [
      "Plano de aula"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Plugada"
    ],
    "year": "EM · 1ª série",
    "keywords": [
      "condições",
      "programação"
    ],
    "authorship": "EduComp",
    "objectives": "Empregar condições para representar decisões em programas simples."
  },
  {
    "id": "demo-21",
    "title": "Pegadas digitais",
    "description": "Reflita sobre os rastros que deixamos ao usar a internet.",
    "type": [
      "Slides"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada"
    ],
    "year": "EM · 3ª série",
    "keywords": [
      "privacidade",
      "rastros"
    ],
    "authorship": "EduComp",
    "objectives": "Reconhecer rastros digitais e avaliar escolhas de compartilhamento online."
  },
  {
    "id": "demo-22",
    "title": "Organizando coleções",
    "description": "Separe objetos por características e critérios.",
    "type": [
      "Jogo"
    ],
    "stage": [
      "Educação Infantil"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ],
    "year": "EI · 4 anos",
    "keywords": [
      "classificação",
      "coleções"
    ],
    "authorship": "EduComp",
    "objectives": "Classificar objetos em conjuntos conforme critérios construídos coletivamente."
  },
  {
    "id": "demo-23",
    "title": "Tecnologia e sociedade",
    "description": "Discuta os impactos da tecnologia na vida cotidiana.",
    "type": [
      "Sequência didática"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ],
    "year": "EM · 2ª série",
    "keywords": [
      "sociedade",
      "tecnologia"
    ],
    "authorship": "EduComp",
    "objectives": "Analisar impactos da tecnologia no cotidiano e discutir alternativas de uso responsável."
  },
  {
    "id": "demo-24",
    "title": "Criando jogos no Scratch",
    "description": "Planeje personagens, regras e desafios interativos.",
    "type": [
      "Sequência didática"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Plugada"
    ],
    "year": "EF · 9º ano",
    "keywords": [
      "scratch",
      "jogos",
      "programação"
    ],
    "authorship": "EduComp",
    "objectives": "Planejar jogos digitais com objetivos, regras, desafios e personagens no Scratch."
  }
];
