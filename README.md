# EduComp

O **EduComp** é um projeto de plataforma digital para professores da Educação Básica encontrarem, consultarem e compartilharem materiais pedagógicos voltados ao ensino de Computação.

A proposta reúne esses recursos em uma biblioteca organizada por informações pedagógicas, com pesquisa, filtros e uma área pessoal de materiais salvos. Professores também poderão enviar seus próprios materiais, sujeitos à revisão antes de serem publicados no acervo.

O projeto está na transição entre **design e desenvolvimento**. Este repositório contém, até o momento, a documentação de produto e UX/UI e as referências de prototipação. **A aplicação ainda não foi implementada.**

## Contexto e objetivo

O EduComp parte da hipótese de que encontrar materiais adequados ao ensino de Computação pode exigir a consulta a diferentes fontes e a análise individual de muitos recursos.

A plataforma pretende facilitar essa busca, oferecendo informações claras sobre cada material e mecanismos para localizar conteúdos por tema, tipo, etapa de ensino e eixo da Computação.

O público prioritário são **professores da Educação Básica**. A hipótese que orienta o produto ainda não foi validada em pesquisa com usuários reais; as decisões atuais estão registradas na documentação e poderão ser revistas ao longo do desenvolvimento.

## Escopo do MVP

A primeira versão funcional está planejada em torno dos seguintes fluxos:

- **Acesso e conta:** cadastro, login, recuperação de senha e gerenciamento de sessão.
- **Biblioteca:** listagem de materiais, pesquisa textual, filtros combinados e navegação pelos resultados.
- **Detalhes do material:** informações pedagógicas, identificação de autoria e acesso ao recurso disponível.
- **Materiais salvos:** inclusão e remoção de favoritos, com persistência na conta do professor.
- **Envio e revisão:** submissão de materiais, acompanhamento da situação e publicação somente após aprovação por responsável autorizado.
- **Perfil:** consulta e atualização dos dados pessoais e de acesso.
- **Compartilhamento básico:** cópia de link com confirmação da ação.

O MVP deve funcionar com dados persistentes e serviços reais, não apenas reproduzir as telas do protótipo. As regras, permissões, critérios de aceite e decisões pendentes estão detalhados no [Escopo do MVP](docs/product/escopo-mvp.md) e nos [Requisitos](docs/product/requisitos.md).

O Figma também apresenta experiências exploratórias, como login com Google, notificações e interações da comunidade. **A presença dessas telas não significa que todas integram o MVP.** Sua implementação dependerá do escopo aprovado e da evolução do produto.

## Design e desenvolvimento

As interfaces foram organizadas no Figma em identidade visual, protótipo desktop, protótipo mobile e referências para tablet.

- [Identidade visual](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Protótipo desktop](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Protótipo mobile e referências para tablet](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-26978)

O **desktop será a primeira frente de implementação**, utilizando os frames de 1536 px como referência visual. O handoff descreve os componentes, fluxos e estados dessas telas. Mobile e tablet permanecem como referências para o trabalho responsivo posterior.

Essa ordem de desenvolvimento **não altera o escopo do MVP**: a experiência responsiva e a acessibilidade continuam fazendo parte dos critérios de conclusão da primeira versão funcional.

## Situação do projeto

| Frente | Situação |
| --- | --- |
| Visão, escopo e requisitos | Documentados, com decisões pontuais ainda em aberto |
| UX/UI | Protótipos e identidade visual elaborados; documentação em alinhamento final |
| Handoff desktop | Documentado para orientar a implementação |
| Arquitetura e tecnologias | A definir na preparação técnica |
| Desenvolvimento | Não iniciado |
| QA e validação com professores | Não realizados |

## Organização do repositório

```text
EduComp/
├── README.md
└── docs/
    ├── product/
    │   ├── product-brief.md
    │   ├── escopo-mvp.md
    │   ├── requisitos.md
    │   ├── historias-de-usuario.md
    │   ├── backlog.md
    │   ├── especificacao-busca-filtros.md
    │   └── especificacao-metadados.md
    └── ux-ui/
        ├── arquitetura-da-informacao.md
        ├── objetivos-de-ux.md
        ├── user-flow.md
        ├── design-system.md
        └── handoff.md
```

A pasta [`docs/product`](docs/product/) reúne as definições do produto, requisitos, histórias, backlog e especificações funcionais. A pasta [`docs/ux-ui`](docs/ux-ui/) registra a estrutura de navegação, os objetivos de experiência, os fluxos, os padrões visuais e as orientações de interface.

## Próximas etapas

1. Concluir o alinhamento entre documentação funcional e Design System.
2. Definir a arquitetura técnica, as tecnologias e as decisões necessárias para os primeiros fluxos.
3. Preparar a estrutura da aplicação e implementar os componentes compartilhados.
4. Desenvolver os fluxos desktop previstos no MVP e integrá-los aos dados e serviços.
5. Completar a adaptação responsiva, executar testes e verificar os critérios de aceite.

As decisões serão registradas conforme o trabalho avançar, distinguindo **o que foi planejado, prototipado, implementado e validado**.

## Sobre o portfólio

O EduComp é um projeto de portfólio que reúne práticas de definição de produto, planejamento de escopo, documentação de requisitos, UX/UI Design e preparação para engenharia de software. As etapas de desenvolvimento e qualidade serão documentadas quando efetivamente realizadas.
