import { isCatalogExampleId } from "./catalog";

/** Arquivos institucionais do acervo inicial. Não são uploads nem materiais aprovados de terceiros. */
export type CatalogAttachment = {
  name: string;
  url: string;
  fileName: string;
  sizeBytes: number;
  pages: number;
  cover?: string;
  provisional: boolean;
};

export type CatalogEditorial = {
  duration?: string;
  contents?: readonly string[];
  application?: string;
  attachment: CatalogAttachment;
};

const base = "/api/biblioteca/arquivos";
const covers = "/biblioteca/capas";

type StoredAttachment = Omit<CatalogAttachment, "url">;
type StoredEditorial = Omit<CatalogEditorial, "attachment"> & { attachment: StoredAttachment };

const temporaryAttachment: StoredAttachment = {
  name: "Material de demonstração.pdf",
  fileName: "material-de-demonstracao.pdf",
  sizeBytes: 174008,
  pages: 1,
  provisional: true,
};

const completeResources: Record<number, StoredEditorial> = {
  1: {
    duration: "2 a 3 aulas",
    contents: [
      "Orientações para preparar e conduzir a sequência",
      "Cinco atividades progressivas com tabuleiros para impressão",
      "Planejamento, execução, correção de erros e repetições",
      "Referências ao final do caderno",
    ],
    application: "Use as folhas impressas em duplas ou individualmente. Após cada desafio, reserve um momento para comparar estratégias, testar comandos e revisar os percursos.",
    attachment: {
      name: "Desafio dos algoritmos.pdf",
      fileName: "desafio-dos-algoritmos.pdf",
      cover: `${covers}/desafio-dos-algoritmos.webp`,
      sizeBytes: 2609351,
      pages: 8,
      provisional: false,
    },
  },
  2: {
    duration: "1 aula de 50 minutos",
    contents: [
      "Planejamento e objetivos de aprendizagem",
      "Roteiro de mediação para a turma",
      "Folha de atividade com situações fictícias para discussão",
      "Referências e orientações de segurança",
    ],
    application: "Discuta situações fictícias antes da atividade impressa. Não solicite senhas, imagens nem dados pessoais reais dos estudantes.",
    attachment: {
      name: "Privacidade e proteção de dados.pdf",
      fileName: "privacidade-e-seguranca-na-internet.pdf",
      cover: `${covers}/privacidade-e-seguranca-na-internet.webp`,
      sizeBytes: 2206227,
      pages: 5,
      provisional: false,
    },
  },
  4: {
    duration: "2 aulas de 50 minutos",
    contents: [
      "Orientações de preparação para o professor",
      "Roteiro do estudante: perguntas, respostas e pontuação",
      "Programação de decisões e variáveis em blocos",
      "Etapas para testar, corrigir e personalizar o quiz",
    ],
    application: "Aplique com o editor do Scratch disponível. O PDF traz o roteiro de construção do quiz; o projeto complementar .sb3 citado no documento não faz parte dos arquivos enviados.",
    attachment: {
      name: "Quiz interativo no Scratch.pdf",
      fileName: "quiz-interativo-no-scratch.pdf",
      cover: `${covers}/quiz-interativo-no-scratch.webp`,
      sizeBytes: 2765313,
      pages: 6,
      provisional: false,
    },
  },
  5: {
    contents: [
      "Diferença entre internet e Web",
      "Conexão entre dispositivos, redes e servidores",
      "Endereços, navegação e transmissão por pacotes",
      "Vocabulário básico de redes e referências",
    ],
    application: "Apresente o guia em tela ou imprima as páginas. Convide a turma a representar o caminho percorrido por uma informação entre um dispositivo e um servidor.",
    attachment: {
      name: "Como funciona a internet.pdf",
      fileName: "como-funciona-a-internet.pdf",
      cover: `${covers}/como-funciona-a-internet.webp`,
      sizeBytes: 2510149,
      pages: 6,
      provisional: false,
    },
  },
};

type EditableCatalogFields = {
  id: string;
  title: string;
  description: string;
  authorship?: string;
  keywords: string[];
  objectives?: string;
  year: string;
  type: string[];
  stage: string[];
  axis: string[];
  approach: string[];
};

/** Correções editoriais também registradas na migration 013 para manter busca e filtros coerentes. */
const metadataCorrections: Record<number, Partial<EditableCatalogFields>> = {
  1: {
    description: "Cinco desafios desplugados com tabuleiros para planejar instruções, executar percursos, identificar erros e explorar repetições.",
    objectives: "Planejar, executar, testar e revisar algoritmos em percursos e desafios progressivos.",
  },
  2: {
    title: "Privacidade e segurança",
    description: "Aula de 50 minutos sobre dados pessoais e cuidados ao compartilhar informações na internet, com roteiro e folha de atividade.",
    objectives: "Reconhecer riscos de exposição de dados e justificar escolhas mais seguras em situações fictícias.",
  },
  4: {
    title: "Quiz interativo no Scratch",
    description: "Atividade plugada para programar perguntas, respostas, condições e pontuação em um quiz no Scratch.",
    type: ["Atividade"],
    keywords: ["scratch", "quiz", "programação", "pontuação"],
    objectives: "Programar um quiz com perguntas, decisões, pontuação e testes usando blocos do Scratch.",
  },
  5: {
    title: "Como funciona a internet?",
    description: "Guia visual sobre dispositivos, redes, servidores, endereços e o caminho percorrido pelos dados na internet.",
    keywords: ["internet", "redes", "servidores", "dados"],
    objectives: "Explicar o funcionamento básico das redes e diferenciar a internet da Web.",
    year: "EF · 8º ano",
    approach: ["Plugada", "Desplugada"],
  },
};

function catalogPosition(id: string): number | null {
  return isCatalogExampleId(id) ? Number(id.slice(-12)) : null;
}

export function getCatalogEditorial(id: string): CatalogEditorial | null {
  const position = catalogPosition(id);
  if (position === null) return null;
  const editorial = completeResources[position] ?? { attachment: temporaryAttachment };
  return { ...editorial, attachment: { ...editorial.attachment, url: `${base}/${id}` } };
}

export function presentCatalogRecord<T extends EditableCatalogFields>(item: T): T {
  const position = catalogPosition(item.id);
  if (position === null) return item;
  return { ...item, ...metadataCorrections[position], authorship: "EduComp" } as T;
}

export function formatPdfSize(sizeBytes: number): string {
  return `${(sizeBytes / 1024 / 1024).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} MB`;
}
