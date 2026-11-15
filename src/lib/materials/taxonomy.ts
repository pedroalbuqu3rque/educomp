export const types = [
  "Plano de aula",
  "Slides",
  "Material de apoio",
  "Atividade",
  "Sequência didática",
  "Sequência de atividades",
  "Aula completa",
  "Jogo",
] as const;
export const stages = [
  "Educação Infantil",
  "Ensino Fundamental — Anos iniciais",
  "Ensino Fundamental — Anos finais",
  "Ensino Médio",
] as const;
export const axes = ["Pensamento Computacional", "Mundo Digital", "Cultura Digital"] as const;
export const gradesByStage: Record<(typeof stages)[number], readonly string[]> = {
  "Educação Infantil": ["Educação Infantil"],
  "Ensino Fundamental — Anos iniciais": ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"],
  "Ensino Fundamental — Anos finais": ["6º ano", "7º ano", "8º ano", "9º ano"],
  "Ensino Médio": [
    "1ª série do Ensino Médio",
    "2ª série do Ensino Médio",
    "3ª série do Ensino Médio",
  ],
};
