# EduComp — Alinhamento documental do escopo do MVP

**Data:** 2026-10-29  
**Status:** Decisões de produto consolidadas; implementação ainda pendente.

## Escopo funcional aprovado

1. Catálogo de materiais de Computação para a Educação Básica.
2. Busca textual, ordenação por relevância, filtros por tipo de material e etapa de ensino.
3. Detalhes do material e acesso por links externos e/ou arquivos hospedados.
4. Envio de materiais por formulário e upload, com validação e estado pendente de revisão.
5. Moderação: responsável autorizado aprova ou rejeita; somente aprovados são publicados.
6. Favoritos persistentes associados à conta do usuário.
7. Compartilhamento por link direto para os detalhes do material.

Tipos de material do catálogo no MVP: Plano de aula, Slides, Material de apoio, Atividade, Avaliação e Projeto pedagógico. Sequências didáticas e pacotes de aulas não serão modelados como tipos ou agrupamentos no MVP.

## Fora do escopo

- Criação, edição ou adaptação de conteúdo pedagógico dentro da plataforma.
- Pré-visualização integrada de arquivos.
- Coleções personalizadas além de favoritos.
- Compartilhamento de coleções, colaboração em tempo real e permissões avançadas.
- Recomendação automática de materiais.

## Regras que evitam ambiguidades

- Enviar não é publicar: toda submissão começa como pendente.
- A publicação depende da aprovação por um responsável autorizado.
- Favoritos exigem identidade de usuário e persistência por conta.
- Compartilhar significa copiar/compartilhar o link direto do material; não cria permissões especiais.
- Os filtros aprovados atualmente são tipo de material e etapa de ensino. O eixo da Computação pode aparecer como metadado; sua adoção como filtro depende da consolidação do modelo de dados.
- Nenhuma documentação que liste funcionalidades fora do escopo deve ser interpretada como excluindo envio, favoritos ou compartilhamento do MVP; esses três itens foram aprovados posteriormente.

## Pendências técnicas para o backlog

- Definir autenticação e papéis mínimos (usuário e responsável pela moderação).
- Fechar validação de arquivos, limites combinados e segurança de upload.
- Definir estados e rastreabilidade da moderação.
- Definir persistência e comportamento de favoritos.
- Definir URLs permanentes e comportamento de acesso a materiais compartilhados.
- Atualizar a aplicação implementada após inspeção do repositório de código-fonte.
