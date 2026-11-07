
# EduComp — Arquitetura da Informação

**Versão:** 1.0 · **Data:** 07/11/2026 · **Situação:** estrutura definida para o MVP; rotas técnicas a estabelecer.

## 1. Objetivo

Este documento organiza os conteúdos e destinos do EduComp, seus vínculos e as áreas sujeitas a autenticação. Não determina URLs finais nem descreve cada clique: os comportamentos estão nos [Requisitos](../product/requisitos.md) e no [User Flow](user-flow.md).

A **Biblioteca** é o eixo central da experiência. Materiais têm detalhes, arquivos, autor e discussão; Salvos, envio, perfil e notificações estendem esse percurso para usuários autenticados. A revisão editorial e a moderação ficam em uma área restrita.

## 2. Mapa da plataforma

```text
EduComp
├── Início
│   ├── Apresentação da plataforma
│   └── Atalhos para Biblioteca, Entrar e Criar conta
├── Biblioteca
│   ├── Buscar e filtros (Tipo, Etapa, Eixo, Abordagem)
│   ├── Paginação e resultados
│   └── Material
│       ├── Informações pedagógicas e abordagem
│       ├── Arquivos (acesso autenticado)
│       ├── Autor → Perfil público
│       │   └── Materiais publicados do autor
│       └── Discussões
│           ├── Todos / Relatos de aplicação / Discussões
│           ├── Comentar, responder e relatar aplicação
│           ├── Editar / excluir contribuição própria
│           └── Denunciar conteúdo
├── Acesso
│   ├── Entrar
│   ├── Criar conta
│   └── Recuperar e redefinir senha
├── Área pessoal (login)
│   ├── Salvos (coleção, busca e estado vazio)
│   ├── Enviar material
│   │   ├── Formulário e arquivos
│   │   └── Meus envios (situação e acompanhamento)
│   ├── Meu perfil
│   │   ├── Dados, foto, cargo e Sobre mim
│   │   └── Segurança e senha
│   └── Notificações
│       ├── Recentes / marcar como lidas
│       └── Todas as notificações
├── Revisão (papel autorizado)
│   ├── Envios
│   │   ├── Lista e detalhes da submissão
│   │   └── Iniciar análise / aprovar / recusar
│   └── Denúncias
│       ├── Fila e contexto do comentário
│       └── Ocultar / restaurar / excluir
└── Institucional
    ├── Fale conosco (formulário)
    ├── Termos de uso
    ├── Política de privacidade
    └── Compartilhar plataforma
```

Os estados de erro, sucesso, vazio, filtros abertos e confirmações são **variações de contexto**, e não páginas independentes do mapa de conteúdo.

## 3. Áreas principais

| Área | Conteúdo e ações |
| --- | --- |
| Início | Apresentação, materiais em destaque e acesso aos percursos principais. |
| Biblioteca | Pesquisa, filtros independentes, cartões, total e paginação. |
| Material | Título, descrições, eixo, etapa, ano/série, abordagem, objetivos, autoria, arquivos e discussões. |
| Perfil público | Nome, foto, apresentação autorizada e materiais publicados. |
| Salvos | Coleção pessoal, busca textual, abertura e remoção de favoritos. |
| Envio / Meus envios | Formulário, arquivos, validação, confirmação e acompanhamento das submissões. |
| Meu perfil | Dados pessoais, cargo/função, Sobre mim, foto e senha. |
| Notificações | Avisos recentes, estado de leitura e lista completa. |
| Revisão | Lista de envios, decisões editoriais e fila de denúncias de discussões. |
| Institucional | Termos, privacidade, contato e compartilhamento da plataforma. |

## 4. Navegação e permissões

### Visitantes

Sem conta, podem conhecer o EduComp, navegar pela Biblioteca, abrir detalhes, ler discussões públicas, visualizar perfis públicos e consultar as páginas institucionais. Para acessar arquivos, salvar favoritos, comentar, denunciar ou enviar recursos, precisam de uma sessão autenticada.

### Professores autenticados

O cabeçalho oferece **Biblioteca, Salvos, Enviar material, notificações e menu do perfil**. A logo funciona como retorno ao Início. O menu do perfil permite acessar os dados da conta e sair. A área Enviar material reúne o formulário e o acesso a **Meus envios**.

As informações pessoais e notificações pertencem à própria conta. O perfil público compartilha somente dados autorizados, nunca o e-mail ou registros internos.

### Revisores autorizados

O papel de revisor adiciona a navegação **Revisão**, com abas **Envios** e **Denúncias**. Somente esse papel pode aprovar/recusar materiais, controlar a publicação ou moderar conteúdo da comunidade. A ausência do item na navegação comum não substitui a validação de permissão no servidor.

## 5. Organização do acervo

### Biblioteca

Os cartões são organizados em páginas de até 12 materiais e indicam total, tipo, título, resumo, etapa/ano ou série e abordagem por ícones. A pesquisa textual utiliza título ou tema. Os filtros são **Tipo**, **Etapa**, **Eixo** e **Abordagem**. A categoria Tipo compreende seis opções, incluindo **Jogo**.

A interface distingue resultado disponível de consulta sem correspondências, com ações de ajuste. A seleção de filtros acontece em sobreposição; confirmar a seleção na implementação deve atualizar a listagem.

### Material e discussão

A página reúne informações pedagógicas, acesso aos arquivos e autor. A área de **Discussões** aparece no próprio detalhe, com três estados de filtragem — Todos, Relatos de aplicação e Discussões — sem abrir um pop-up para alterná-los.

Contribuições textuais são vinculadas ao material e ao professor. O leitor pode consultar o conteúdo, mas publicação, edição, exclusão e denúncia exigem as permissões correspondentes.

### Salvos

A coleção pertence à conta e reaproveita os materiais da Biblioteca. A tela principal apresenta busca textual e estado vazio. O arquivo de design também reúne variações de filtros de Salvos não conectadas ao fluxo visual atual; elas não devem ser tratadas como controles já disponíveis na página.

## 6. Envio, revisão e moderação

**Enviar material** compreende dados, múltiplas classificações, abordagem plugada/desplugada, arquivos e declaração de direitos. **Meus envios** apresenta as submissões do professor e seus respectivos estados de andamento.

Na área **Revisão**, o responsável autorizado consulta a fila e os detalhes, inicia explicitamente a análise e registra aprovação ou recusa com justificativa. A publicação e a situação editorial são dimensões separadas.

Em **Denúncias**, o revisor consulta o comentário denunciado e seu contexto antes de ocultar, restaurar ou excluir. Uma denúncia não oculta conteúdo automaticamente. Decisões conservam motivo, data e responsável.

## 7. Continuidade da navegação

- A logo do cabeçalho leva ao Início, inclusive em Biblioteca, materiais, perfil e revisão.
- Biblioteca → Material → Biblioteca deve recuperar pesquisa, filtros e página, quando viável.
- Material → Perfil público → Material mantém o contexto de origem.
- Salvos → Material → Salvos recupera a coleção da conta.
- Ação protegida → Entrar retoma a tarefa após autenticação, quando tecnicamente possível.
- Material → Discussões muda a filtragem dentro da página, preservando o contexto.
- Envio → Confirmação → Meus envios permite acompanhar a submissão.
- Revisão → Decisão → Fila mantém a operação no contexto administrativo.

## 8. Páginas institucionais e compartilhamento

**Fale conosco** é um formulário de quatro campos, com confirmação e estados de erro. Termos e Política de privacidade são páginas públicas. Compartilhar abre opções sociais e cópia do endereço da plataforma; os links reais serão configurados antes da publicação.

Os textos legais do protótipo são preliminares e precisam ser revisados de acordo com a aplicação funcional e o tratamento efetivo de dados.

## 9. Responsividade

O mapa e as permissões não mudam entre dispositivos, mas menus, abas, cartões e filtros podem ser reorganizados. O desktop é a primeira frente de implementação; tablet e celular devem preservar descoberta, participação, envio e acesso seguro antes do encerramento do MVP.

## 10. Documentos relacionados

- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
- [User Flow](user-flow.md)
- [Design System](design-system.md)
- [Handoff de UI/UX](handoff.md)
