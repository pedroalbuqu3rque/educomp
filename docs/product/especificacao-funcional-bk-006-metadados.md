# EduComp — Especificação funcional BK-006: Metadados dos materiais

**Status:** definições funcionais consolidadas; detalhes técnicos ficam para a implementação  
**Documento de referência:** `docs/product/backlog.md`, item BK-006  
**Escopo:** metadados, associação curricular, etapas/subdivisões educacionais e formas de acesso a arquivos e links no MVP.

## 1. Objetivo

Definir os dados necessários para identificar, organizar, localizar e disponibilizar materiais educacionais no catálogo do EduComp. Este documento registra o comportamento esperado; não significa que os campos ou validações já estejam implementados.

## 2. Tipos de material

O catálogo inicial prevê os seguintes tipos:

- Plano de aula
- Slides
- Material de apoio
- Atividade
- Avaliação
- Projeto pedagógico


## 3. Campos obrigatórios

Todo novo material cadastrado deve informar:

1. **Título**.
2. **Tipo de material**.
3. **Etapa de ensino**, com a subdivisão aplicável quando houver.
4. **Resumo**.
5. **Ao menos uma forma de acesso:** um ou mais arquivos hospedados e/ou um ou mais links externos.

Arquivos e links podem coexistir. O cadastro deve impedir a criação de um novo material sem nenhuma forma de acesso. Registros preexistentes ou incompletos que não tenham acesso direto podem continuar representados no catálogo, desde que a interface informe essa condição e não apresente controles de acesso inexistentes.

## 4. Campos opcionais

Os campos a seguir devem estar disponíveis no modelo de dados, mas não são obrigatórios para o cadastro:

- **Descrição detalhada:** conteúdo, objetivos e finalidade.
- **Autor ou fonte:** autoria ou origem do recurso.
- **Orientações de uso:** sugestões de aplicação ou adaptação.
- **Componente curricular:** componente ou componentes relacionados.
- **Habilidades da BNCC:** habilidades curriculares relacionadas.
- **Licença e condições de uso:** permissões, restrições e atribuição de autoria.

A ausência de um campo opcional não deve bloquear o cadastro nem ser apresentada como erro. Um material pode estar associado a múltiplos componentes curriculares e múltiplas habilidades da BNCC.

## 5. Habilidades da BNCC

No MVP, as habilidades da BNCC são registradas como texto livre, digitado ou colado manualmente. Não é necessário disponibilizar catálogo estruturado, pesquisa em catálogo oficial ou seletor de códigos oficiais. Um material pode ter mais de uma habilidade associada.

## 6. Etapas de ensino e subdivisões

O catálogo inicial contempla as etapas e subdivisões abaixo:

| Etapa/modalidade | Subdivisões disponíveis |
|---|---|
| Educação Infantil | Bebês; Crianças bem pequenas; Crianças pequenas (grupos da BNCC) |
| Ensino Fundamental — Anos Iniciais | 1º, 2º, 3º, 4º e 5º anos |
| Ensino Fundamental — Anos Finais | 6º, 7º, 8º e 9º anos |
| Ensino Médio | 1ª, 2ª e 3ª séries |
| EJA — Ensino Fundamental | 1º e 2º segmentos |
| EJA — Ensino Médio | Modalidade sem exigir seleção de série específica |

Um material pode estar associado a múltiplas etapas e subdivisões. A interface e o modelo de dados devem preservar a relação entre cada subdivisão e sua etapa, evitando associações ambíguas. Para EJA — Ensino Médio, não se deve exigir série específica. As subdivisões educacionais devem ser consideradas nos dados do material; o filtro de catálogo atualmente definido permanece por etapa de ensino, não por ano/série individual.

## 7. Arquivos hospedados e links externos

Um material pode conter múltiplos arquivos hospedados e múltiplos links externos simultaneamente. Cada recurso deve manter sua própria referência e opção de acesso, sem substituir nem ocultar os demais recursos.

### 7.1 Formatos aceitos no MVP

- PDF
- DOCX
- PPTX
- PNG
- JPG

A lista aplica-se aos arquivos enviados e hospedados na plataforma. Links externos podem apontar para recursos em outros formatos.

### 7.2 Limite individual

Cada arquivo hospedado pode ter até **50 MB**. O limite é individual, não a soma de todos os arquivos associados a um material.

### 7.3 Validação de acesso

- O cadastro deve exigir pelo menos um arquivo ou link.
- Arquivos e links podem coexistir.
- A interface deve apresentar todos os recursos cadastrados e não deve exibir controles para recursos inexistentes.
- Se um registro preexistente ou incompleto não tiver acesso direto, a interface deve informar isso sem sugerir que o material foi removido do catálogo.

## 8. Pendências mantidas em aberto

As seguintes decisões ou definições técnicas permanecem pendentes e não são presumidas por esta especificação:

- Quantidade máxima de arquivos por material e limite total combinado de armazenamento por cadastro.
- Regras técnicas de validação, verificação de conteúdo e segurança de arquivos.
- Implementação técnica dos metadados e de eventuais regras condicionais.
- Tratamento técnico de falhas de acesso a arquivos e links.

## 9. Critérios de aceitação

- [ ] O cadastro exige título, tipo, etapa de ensino, resumo e pelo menos uma forma de acesso.
- [ ] A ausência de campos opcionais não bloqueia o cadastro.
- [ ] Componentes curriculares e habilidades da BNCC aceitam múltiplos valores.
- [ ] Habilidades da BNCC podem ser digitadas ou coladas como texto livre.
- [ ] Um material pode ser associado a múltiplas etapas/subdivisões, mantendo a relação entre etapa e subdivisão.
- [ ] EJA — Ensino Médio não exige série específica.
- [ ] Um material pode ter múltiplos arquivos e links, inclusive em conjunto.
- [ ] O sistema aceita PDF, DOCX, PPTX, PNG e JPG para arquivos hospedados, respeitando o limite de 50 MB por arquivo.
- [ ] Registros sem acesso direto, se preexistentes ou incompletos, são identificados sem apresentar controles inexistentes.
- [ ] Os limites e as regras técnicas ainda pendentes continuam explicitamente registrados no backlog.

## 10. Documentos relacionados

- `backlog.md`
- `product-brief.md`
- `requisitos.md`
- `historias-de-usuario.md`
- `arquitetura-da-informacao.md`
- `user-flow.md`
