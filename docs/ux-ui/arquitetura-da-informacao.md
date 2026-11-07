# EduComp — Arquitetura da Informação

**Versão:** 0.8  
**Data:** 07/11/2026  
**Situação:** estrutura do MVP definida; interface de revisão ainda a desenhar.

## 1. Objetivo

Este documento organiza as áreas e os conteúdos do EduComp, indicando como o usuário navega entre eles e quais partes exigem autenticação. Os comportamentos de cada funcionalidade estão descritos nos [Requisitos](../product/requisitos.md) e no [User Flow](user-flow.md).

A Biblioteca é o principal ponto de consulta. O professor pode encontrar materiais, conhecer seus detalhes, salvar favoritos e enviar contribuições. Uma área separada permite que responsáveis autorizados revisem os materiais antes da publicação.

## 2. Mapa da plataforma

O mapa representa a organização das informações, não as URLs definitivas da aplicação.

```text
EduComp
├── Início
├── Biblioteca
│   ├── Pesquisa, filtros, ordenação e paginação
│   └── Detalhes do material
│       ├── Informações pedagógicas e autoria
│       └── Arquivos do material (login obrigatório)
├── Acesso à conta
│   ├── Entrar
│   ├── Criar conta
│   └── Recuperar senha
│       └── Redefinir senha
├── Área do professor (login obrigatório)
│   ├── Salvos
│   ├── Enviar material
│   │   ├── Formulário de envio
│   │   └── Meus envios
│   └── Meu perfil
├── Revisão de materiais (acesso autorizado)
│   ├── Lista de submissões
│   └── Detalhes da submissão
│       ├── Iniciar análise
│       ├── Aprovar ou recusar
│       └── Ações autorizadas sobre materiais publicados
└── Informações institucionais
    ├── Termos de uso
    ├── Política de privacidade
    └── Contato por e-mail
```

**Enviar material** e **Meus envios** são duas abas da mesma área, conforme o protótipo desktop. Os detalhes de um material podem ser abertos tanto pela Biblioteca quanto por Salvos, sem precisar duplicar a página.

## 3. Áreas e conteúdos

| Área | Conteúdo e ações principais |
| --- | --- |
| **Início** | Apresentação do EduComp e caminhos para Biblioteca, cadastro e login. |
| **Biblioteca** | Pesquisa, filtros por tipo, etapa e eixo, ordenação, total de resultados e paginação. |
| **Detalhes do material** | Descrição, palavras-chave, classificações, autoria ou fonte, informações complementares e arquivos associados. |
| **Entrar / Criar conta / Recuperar senha** | Formulários e orientações para acesso à conta. |
| **Salvos** | Lista pessoal de favoritos, acesso aos detalhes e remoção de materiais salvos. |
| **Enviar material** | Cadastro de informações pedagógicas, seleção de classificações e envio de arquivos para revisão. |
| **Meus envios** | Submissões do professor, situação atual e justificativa quando houver recusa. |
| **Meu perfil** | Dados da conta, edição de nome, foto e senha e acesso à opção Sair. |
| **Revisão** | Lista e detalhes dos envios, início da análise, aprovação, recusa justificada e operações autorizadas sobre materiais publicados. |
| **Institucional** | Termos de uso, Política de privacidade e meio de contato por e-mail. |

Mensagens de erro, confirmações, menus, filtros abertos e estados vazios pertencem às suas respectivas áreas. Não precisam ser tratados como páginas independentes.

## 4. Navegação e permissões

### 4.1. Visitantes

Sem login, é possível acessar **Início, Biblioteca, detalhes dos materiais e páginas institucionais**, além das telas de autenticação.

A Biblioteca mostra apenas materiais aprovados e publicados. Um visitante pode consultar as informações de um material, mas precisa entrar na conta para abrir seus arquivos ou salvar um favorito.

### 4.2. Professores autenticados

A navegação principal mantém os destinos **Início, Biblioteca, Salvos, Enviar material e Meu perfil**. O menu de conta oferece acesso ao perfil e à opção **Sair**.

As áreas pessoais exibem somente informações da própria conta. Em **Meu perfil**, o e-mail pode ser consultado, mas não alterado nesta versão.

### 4.3. Revisores

A área de revisão é acessível somente a contas que tenham recebido essa permissão. O papel será atribuído manualmente pelo responsável técnico ou administrador.

A revisão não faz parte da navegação comum de todos os professores. Seu ponto de entrada e a organização visual ainda serão definidos no Figma. Ocultar o acesso na interface não substitui as verificações de permissão no servidor.

## 5. Organização dos materiais

### 5.1. Biblioteca

A Biblioteca reúne os materiais publicados em uma listagem de cartões. A pesquisa considera **título e palavras-chave**; os filtros permitem combinar tipo de material, etapa de ensino e eixo da Computação.

Os resultados podem ser ordenados por mais recentes ou por título e são apresentados em **páginas de 12 materiais**, com indicação do total encontrado.

Os cartões devem refletir os dados cadastrados. Na ausência de miniatura, será usado um cartão padrão com ícone do tipo de material. Para materiais classificados em vários tipos, ainda será necessário definir qual ícone aparecerá.

### 5.2. Detalhes

Os detalhes concentram as informações necessárias para avaliar um material antes de acessá-lo:

- Título, descrição e palavras-chave.
- Tipos, etapas de ensino, anos/séries quando aplicáveis e eixos da Computação.
- Autoria ou fonte e objetivos de aprendizagem, quando informados.
- Lista dos arquivos associados, com indicação de disponibilidade e exigência de login.

Um material pode ter **várias classificações e vários arquivos**. Campos opcionais sem conteúdo não devem ser preenchidos artificialmente. Nesta versão, não haverá acesso por links externos.

A ação **Copiar link**, quando apresentada, deve deixar claro que copia o endereço da **página inicial do EduComp**, não o do material consultado. Sua localização final na interface ainda precisa ser revisada.

### 5.3. Salvos

Salvos utiliza os mesmos materiais da Biblioteca, organizados como uma coleção pessoal. O professor pode abrir os detalhes e remover favoritos. Não haverá pesquisa, filtros ou coleções personalizadas nessa área no MVP.

## 6. Envio, acompanhamento e revisão

**Enviar material** e **Meus envios** ocupam a mesma área, em abas distintas. O formulário reúne as informações obrigatórias, as palavras-chave, as classificações múltiplas e os arquivos. Ao concluir um envio, a plataforma mostra uma confirmação com um atalho para **Meus envios**.

Em **Meus envios**, o professor consulta apenas suas submissões, identificadas pelos estados **Pendente, Em análise, Aprovado ou Recusado**. A recusa apresenta a justificativa do revisor. O autor não poderá editar um envio já realizado no MVP.

A área restrita de revisão terá, no mínimo:

1. Uma lista de submissões para avaliação.
2. Os detalhes e arquivos necessários para analisar cada envio.
3. Uma ação explícita para iniciar a análise.
4. Ações para aprovar ou recusar, com justificativa obrigatória na recusa.

Responsáveis autorizados também poderão editar ou despublicar materiais já aprovados. A **situação da revisão** e a **disponibilidade pública** devem permanecer distintas: retirar um material da Biblioteca não o transforma em Recusado.

Não está previsto um painel administrativo completo nem um histórico visual de todas as transições.

## 7. Continuidade da navegação

- **Biblioteca → Detalhes → Biblioteca:** pesquisa, filtros, ordenação e página ficam preservados na URL. A posição de rolagem será restaurada quando tecnicamente viável.
- **Salvos → Detalhes → Salvos:** o retorno mantém o contexto da coleção pessoal.
- **Ação protegida → Login:** depois de entrar, o usuário retoma a ação que exigiu autenticação. Sem ação anterior, vai para a Biblioteca.
- **Cadastro ou redefinição de senha:** após a conclusão, o usuário é encaminhado ao login.
- **Enviar material → Meus envios:** o envio concluído apresenta confirmação e um atalho para a aba de acompanhamento.
- **Revisão → Detalhes da submissão → Revisão:** o responsável retorna à lista com a situação atualizada após a operação.

Mudanças não confirmadas nos filtros são descartadas ao fechar o controle sem selecionar **Aplicar**. O comportamento detalhado está na [Especificação de busca e filtros](../product/especificacao-busca-filtros.md).

## 8. Conteúdo institucional e funcionalidades futuras

A demonstração pública incluirá **Termos de uso** e **Política de privacidade**, com um contato simples por e-mail. Não será necessário um formulário de contato funcional.

O Figma também apresenta recursos que não fazem parte do MVP, como login com Google, notificações, comentários, relatos de aplicação e compartilhamento por redes sociais. Essas ações não devem aparecer como operacionais na aplicação inicial.

## 9. Responsividade

A organização lógica das áreas será mantida no desktop, tablet e celular. O que poderá mudar é a disposição dos menus, cartões, filtros, formulários e abas.

A implementação começará pelo desktop, tomando o protótipo como referência. A adaptação para telas menores será feita antes de considerar o MVP concluído. Os padrões de navegação responsiva serão ajustados no Figma e verificados na aplicação.

## 10. Ajustes que faltam no Figma

- [ ] Definir o ponto de entrada e desenhar a navegação da área restrita de revisão.
- [ ] Representar palavras-chave, classificações múltiplas, anos/séries e upload de vários arquivos no formulário de envio.
- [ ] Definir a apresentação dos cartões quando um material tiver mais de um tipo.
- [ ] Revisar a posição e o rótulo da ação que copia o link da página inicial.
- [ ] Conferir a navegação das abas e dos menus nas versões responsivas.

## 11. Documentos relacionados

- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Especificação de metadados](../product/especificacao-metadados.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
- [User Flow](user-flow.md)
- [Design System](design-system.md)
- [Handoff de UI/UX](handoff.md)
