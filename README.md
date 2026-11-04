# EduComp

O **EduComp** é uma proposta de plataforma digital voltada a professores da Educação Básica, com foco na descoberta, organização e acesso a materiais pedagógicos de Computação.

A plataforma foi concebida para reunir recursos educacionais em uma biblioteca organizada, permitindo explorar os materiais disponíveis. A experiência também contempla recursos de apoio ao professor, como uma área para salvar materiais para acessar posteriormente. O professor pode também realizar o envio de materiais próprios para a plataforma.

Este repositório reúne a documentação de produto e UX/UI do EduComp. O projeto possui um protótipo desenvolvido no Figma e documentação de handoff para orientar uma futura implementação.

## Sobre o projeto

O EduComp é um projeto de produto digital que reúne atividades de Product Discovery, Product Ownership e UX/UI Design, com preparação para as etapas futuras de desenvolvimento e Quality Assurance (QA).

A proposta parte da hipótese de que localizar materiais pedagógicos de Computação adequados pode exigir que professores consultem diferentes fontes e avaliem diversos recursos antes de escolher aqueles que pretendem utilizar em suas aulas. Um catálogo organizado, recursos de pesquisa, filtros e informações descritivas são propostos como formas de facilitar esse processo.

Essa hipótese ainda não foi validada por pesquisa com usuários reais. A documentação registra decisões de projeto, hipóteses, requisitos e pendências sem apresentar suposições ou exemplos simulados como evidências empíricas.

## Objetivo

Projetar uma plataforma que facilite a descoberta, a avaliação inicial e o acesso a materiais pedagógicos de Computação para a Educação Básica, oferecendo uma experiência organizada e adequada à rotina de professores.

## Público-alvo

O público prioritário são professores da Educação Básica que procuram materiais pedagógicos para ensinar Computação.

A experiência proposta busca apoiar esse público em atividades como:

- Explorar uma biblioteca de materiais pedagógicos;
- Pesquisar recursos por palavras-chave;
- Refinar resultados por tipo de material, etapa de ensino e eixo da Computação;
- Consultar detalhes e informações dos materiais;
- Salvar materiais para consulta posterior;
- Enviar materiais para avaliação e possível inclusão na biblioteca;
- Gerenciar informações básicas de perfil;
- Compartilhar materiais e acessar notificações.

## Escopo funcional projetado

O protótipo representa as seguintes áreas e funcionalidades:

- **Início e acesso:** apresentação institucional, entrada, criação de conta e recuperação de senha;
- **Biblioteca:** exploração dos materiais, pesquisa e filtros;
- **Detalhes do material:** consulta às informações do recurso e acesso ao material;
- **Materiais salvos:** visualização dos materiais marcados como favoritos;
- **Envio de material:** fluxo de submissão de recursos para avaliação;
- **Perfil do professor:** visualização e edição de informações básicas;
- **Notificações:** área de consulta de avisos;
- **Compartilhamento:** opções para compartilhar a plataforma;
- **Navegação e sobreposições:** menus, filtros e janelas auxiliares.

A presença dessas áreas no protótipo representa o escopo visual e funcional projetado. Parte das interações é demonstrativa e ainda requer definição técnica.

### Regras e pontos que exigem implementação

- A pesquisa e os filtros deverão operar sobre os dados cadastrados e permitir o refinamento dos resultados;
- Os materiais salvos deverão ser associados ao usuário e persistir entre sessões;
- O envio de materiais deverá incluir validação, upload e acompanhamento de status. O envio não deverá publicar automaticamente um material: ele deverá passar por um processo de revisão;
- O perfil deverá permitir atualização dos dados previstos, com persistência;
- As notificações deverão possuir estados de leitura e histórico, conforme os requisitos;
- Os mecanismos de autenticação, recuperação de senha e compartilhamento deverão ser integrados a serviços reais.

As regras detalhadas, permissões, estados e critérios de aceite estão descritos nos documentos de produto e no handoff.

## Status do projeto

**Fase atual:** design e prototipação concluídos; atualização documental e preparação para desenvolvimento.

| Frente | Situação |
|---|---|
| Visão e planejamento do produto | Documentados; sujeitos a revisões conforme decisões futuras |
| Escopo e requisitos | Documentados; em processo de alinhamento com o protótipo |
| UX/UI e protótipo no Figma | Protótipo de alta fidelidade elaborado |
| Desenvolvimento da aplicação | Ainda não iniciado |
| Testes de software (QA) | Ainda não iniciados |
| Validação com professores | Ainda não realizada |

## Design e protótipo

O Figma é utilizado para estruturar a interface, os componentes, os padrões visuais e os fluxos de navegação do EduComp. A documentação de UX/UI neste repositório deve permanecer alinhada à versão vigente do protótipo.

O documento [HANDOFF.md](docs/ux-ui/HANDOFF.md) reúne a estrutura das telas, as interações observadas, os requisitos de implementação e as pendências identificadas durante a auditoria do protótipo.

## Tecnologias e ferramentas

As tecnologias para implementação ainda não foram definidas. Essa decisão deverá ocorrer durante a preparação técnica, considerando os requisitos do produto, a arquitetura e as necessidades de manutenção.

Ferramentas utilizadas nesta fase:

- **GitHub:** versionamento e organização da documentação do projeto;
- **Figma:** design de interface, componentes e prototipação.

## Organização do repositório

```text
EduComp/
├── README.md
└── docs/
    ├── product/
    │   ├── product-brief.md
    │   ├── requisitos.md
    │   ├── historias-de-usuario.md
    │   ├── backlog.md
    │   ├── especificacao-funcional-bk-004-bk-005.md
    │   ├── especificacao-funcional-bk-006-metadados.md
    │   ├── alinhamento-documental-escopo-mvp.md
    │   └── auditoria-documental-2026-10-28.md
    └── ux-ui/
        ├── arquitetura-da-informacao.md
        ├── objetivos-de-ux.md
        ├── user-flow.md
        ├── design-system.md
        └── HANDOFF.md
```

### Documentação de produto — `docs/product/`

Reúne a visão do produto, o escopo, os requisitos, as histórias de usuário, o backlog, as especificações funcionais e os registros de decisões e auditorias documentais.

### Documentação de UX/UI — `docs/ux-ui/`

Reúne a arquitetura da informação, os objetivos de experiência, os fluxos de navegação, o Design System e o documento de handoff para desenvolvimento.

## Integridade das informações e evolução do projeto

Para manter a documentação confiável, o projeto diferencia:

- **Decisões confirmadas:** definições adotadas para orientar o estado atual do produto;
- **Hipóteses:** suposições sobre o problema, as necessidades do público e os benefícios esperados;
- **Pendências:** questões que ainda precisam de definição;
- **Etapas futuras:** atividades planejadas que ainda não foram executadas.

## Portfólio

O EduComp é um projeto de portfólio que demonstra atividades de concepção de produto, definição de escopo, documentação de requisitos, UX/UI Design, prototipação e preparação para desenvolvimento. À medida que novas etapas forem realizadas, seus resultados serão registrados de acordo com o trabalho efetivamente executado.
