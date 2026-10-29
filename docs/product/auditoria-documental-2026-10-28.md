# Auditoria documental — EduComp

**Data:** 28 de outubro de 2026  
**Resultado:** documentação funcional consolidada; identidade e telas em adaptação para o posicionamento EduComp.

## Escopo confirmado do MVP

O MVP concentra-se exclusivamente em:
- catálogo de materiais;
- busca textual;
- filtros por tipo de material e etapa de ensino;
- detalhes do material;
- acesso por links externos e/ou arquivos hospedados.

A edição, adaptação, criação ou publicação de materiais por usuários e a pré-visualização integrada estão fora do MVP. A decisão consolidada posteriormente removeu “Sequência didática” e “Pacote de aulas” dos tipos de material previstos para o MVP. Esta auditoria é histórica; para o escopo vigente, consultar `alinhamento-documental-escopo-mvp.md` e o Product Brief atualizado.

## Decisões de metadados e acesso consolidadas

- Campos obrigatórios: título, tipo de material, etapa de ensino, resumo e ao menos uma forma de acesso.
- Campos opcionais: descrição detalhada, autor/fonte, orientações de uso, componente curricular, habilidades da BNCC e licença/condições de uso.
- Componentes curriculares, habilidades da BNCC, etapas/subdivisões, arquivos e links podem ter múltiplas associações conforme a especificação BK-006.
- Habilidades da BNCC são texto livre no MVP.
- Formatos de arquivos hospedados: PDF, DOCX, PPTX, PNG e JPG.
- Limite de tamanho: 50 MB por arquivo.
- Quantidade máxima de arquivos e limite total por cadastro permanecem decisões técnicas/operacionais para a implementação.

## Decisões de busca e filtros

As regras funcionais de busca, ordenação, filtros, combinações AND/OR, estados sem resultados, filtros responsivos e carregamento progressivo estão registradas na especificação BK-004/BK-005. A sugestão automática de correção da consulta fica fora do MVP; o usuário poderá alterar manualmente a busca e os filtros.

## Estado das tarefas

- BK-001 a BK-009: documentação funcional e alinhamento considerados concluídos, conforme os critérios descritos no `backlog.md`.
- BK-010 e BK-011: próximas atividades, focadas nas diretrizes visuais e nos wireframes no Figma.
- BK-012: protótipo visual após a revisão dos wireframes.
- BK-013 a BK-015: atividades futuras de avaliação, implementação e QA.

## Verificações realizadas

- Verificação dos links relativos Markdown presentes nos documentos do repositório: não foram encontrados destinos inexistentes.
- Revisão das divergências entre Product Brief, requisitos, histórias de usuário, especificações funcionais, arquitetura da informação, fluxo, objetivos de UX, README e backlog.
- A documentação descreve comportamento esperado; não afirma que o sistema esteja implementado ou validado com usuários reais.


## Atualização de escopo — 2026-10-29

A decisão posterior a esta auditoria inclui no MVP: (1) envio de materiais por formulário/upload, com revisão antes da publicação; (2) favoritos persistentes associados à conta; e (3) compartilhamento de materiais por link direto. Esta decisão substitui qualquer afirmação anterior deste relatório que exclua envio de materiais ou favoritos do MVP. Criação/edição/adaptação de conteúdo, pré-visualização integrada, coleções personalizadas e compartilhamento avançado continuam fora do escopo.
