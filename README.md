
# EduComp

O **EduComp** é um projeto de plataforma para professores da Educação Básica encontrarem, utilizarem e compartilharem materiais pedagógicos de Computação. A proposta combina uma Biblioteca organizada por critérios de ensino, um espaço para troca de experiências entre docentes e um processo de revisão das contribuições publicadas.

O projeto reúne definição de produto, UX/UI e planejamento de desenvolvimento. **Ainda não existe uma aplicação funcional:** as telas do Figma representam o comportamento pretendido, enquanto este repositório registra as regras e as entregas necessárias para implementá-lo.

## O que a plataforma propõe

- **Biblioteca pública:** pesquisa por título ou tema, filtros por tipo, etapa de ensino, eixo da Computação e abordagem plugada/desplugada, além de paginação e informações pedagógicas nos cartões.
- **Materiais:** detalhes, objetivos de aprendizagem, autoria, arquivos para acesso e possibilidade de salvar recursos na conta.
- **Participação docente:** comentários, respostas, relatos de aplicação e perfis públicos com materiais compartilhados.
- **Contribuições ao acervo:** envio de materiais com metadados, múltiplos arquivos e acompanhamento em *Meus envios*.
- **Revisão e moderação:** aprovação editorial dos materiais, análise de denúncias e controle de conteúdo inadequado por revisores autorizados.
- **Conta e comunicação:** cadastro, login, recuperação de senha, perfil, notificações sobre materiais e novidades da plataforma, contato e compartilhamento do EduComp.

O público principal são professores. Revisores autorizados operam as filas de materiais e denúncias. A experiência deve permitir consultar a Biblioteca e os detalhes sem cadastro, reservando ações pessoais e publicação de contribuições a usuários autenticados.

## Estado do projeto

| Frente | Estado |
| --- | --- |
| Definição do produto e escopo | Documentados para o MVP |
| Identidade visual e protótipo desktop | Consolidados no Figma |
| Documentação de UX/UI e handoff | Alinhada ao protótipo atual |
| Arquitetura e serviços de implementação | A definir |
| Desenvolvimento da aplicação | Não iniciado |
| Testes e validação em produção | Não realizados |

O protótipo inclui fluxos e estados de erro, mas **interações desenhadas não equivalem a funcionalidades implementadas ou testadas**. Quando um controle depende de dados, validação ou permissão, o comportamento funcional está descrito nos requisitos e nas especificações.

## Design

- [Protótipo do EduComp no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Identidade visual](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Referências de adaptação para telas menores](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-26978)

A referência principal de interface é a página **Protótipo**, organizada em dez seções: Início, Acesso, Biblioteca e Salvos, Filtros, Material e autor, Comunidade, Envio, Perfil e notificações, Contato e informações, Revisão e moderação.

O desenvolvimento começará pelo desktop, utilizando os frames de 1536 px como referência de composição. A adaptação para tablet e celular e a acessibilidade fazem parte dos critérios de conclusão do MVP.

## Documentação

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

Para entender **por que** o produto existe, comece pelo [Product Brief](docs/product/product-brief.md). O [Escopo do MVP](docs/product/escopo-mvp.md) delimita a primeira entrega; os [Requisitos](docs/product/requisitos.md) e as especificações detalham o funcionamento. O [Backlog](docs/product/backlog.md) organiza o trabalho. A pasta `docs/ux-ui` trata da arquitetura da informação, da experiência, dos padrões visuais e do [handoff](docs/ux-ui/handoff.md).

## Próximos passos

1. Escolher a arquitetura, o framework, a autenticação, o banco de dados, o armazenamento e a hospedagem.
2. Preparar a base do projeto, as permissões e os dados de demonstração.
3. Implementar os fluxos previstos no MVP, começando pelos componentes compartilhados e pela Biblioteca.
4. Integrar as interações com serviços e dados persistentes; validar os estados de erro e as permissões.
5. Adaptar as telas para outros tamanhos, executar testes e registrar os resultados.
