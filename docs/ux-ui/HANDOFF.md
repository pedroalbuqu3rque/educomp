# EduComp — Documento de Handoff Técnico

**Versão:** 1.0  
**Data:** 03/11/2026  
**Etapa:** Design e prototipagem  
**Objetivo:** orientar a implementação do produto a partir do protótipo no Figma.

---

## 1. Visão geral

O EduComp é uma plataforma voltada a professores, com foco na organização, descoberta e compartilhamento de materiais pedagógicos relacionados à Computação na Educação Básica.

O projeto possui três áreas principais:

- Acesso e autenticação.
- Produto e área do professor.
- Menus, filtros e sobreposições.

O Figma contém 18 telas organizadas em três seções na página **Protótipo**.

### Estado atual

| Área | Situação |
|---|---|
| Identidade visual | Definida |
| Telas principais | Desenhadas |
| Menus e sobreposições | Desenhados |
| Navegação entre telas | Parcialmente prototipada |
| Interações demonstrativas | Parcialmente configuradas |
| Requisitos funcionais | Identificados nesta auditoria |
| Backend | Não implementado |
| Desenvolvimento frontend | Não iniciado |

**Importante:** este documento registra o comportamento estrutural observado no Figma. Não representa uma validação manual de todos os fluxos em modo Apresentação.

---

## 2. Estrutura do arquivo Figma

Arquivo: EduComp  
Página principal: `Protótipo`  
Node ID: `4045:21`

### Seção 01 — Acesso e autenticação

| Tela | Node ID | Dimensões |
|---|---|---|
| Entrar | `4062:245` | 1536 × 871 |
| Criar conta | `4062:276` | 1536 × 871 |
| Recuperar senha | `4062:310` | 1536 × 871 |

### Seção 02 — Produto e área do professor

| Tela | Node ID | Dimensões |
|---|---|---|
| Início | `4045:22` | 1536 × 1540 |
| Biblioteca | `4045:140` | 1536 × 871 |
| Salvos | `4045:353` | 1536 × 871 |
| Enviar material | `4045:554` | 1536 × 872 |
| Meu perfil | `4062:185` | 1536 × 871 |
| Detalhes do material | `4045:489` | 1536 × 872 |

### Seção 03 — Menus, filtros e sobreposições

| Tela | Node ID |
|---|---|
| Menu do perfil | `4045:679` |
| Filtro — tipo de material | `4045:692` |
| Filtro — etapa de ensino | `4045:713` |
| Filtro — eixo da computação | `4045:731` |
| Compartilhar | `4096:647` |
| Menu — Biblioteca | `4086:534` |
| Notificações | `4050:15` |
| Menu — Salvos (compacto) | `4086:554` |
| Menu — Salvos (completo) | `4096:588` |

A página `Backup` contém uma versão parcial de algumas telas. Deve ser preservada como referência, sem substituir a página principal.

---

## 3. Design system

### 3.1. Identidade visual

A direção visual é clean, institucional e contemporânea, com predominância de azul, superfícies claras e componentes de baixa complexidade visual.

### 3.2. Variáveis de cor existentes

Coleção atual: `EduMaterial — Fundamentos`.

| Variável | Valor |
|---|---|
| `color/brand/primary` | `#1761D8` |
| `color/brand/deep` | `#102D5C` |
| `color/text/primary` | `#102D5C` |
| `color/text/secondary` | `#637DA3` |
| `color/surface/canvas` | `#F8FAFF` |
| `color/surface/soft` | `#D9E6FB` |
| `color/surface/default` | `#FFFFFF` |
| `color/border/subtle` | `#D9E6FB` |
| `color/status/danger` | `#C7333D` |

**Pendência:** atualizar o nome da coleção para refletir a identidade definitiva EduComp, após verificar referências e dependências.

### 3.3. Estilos tipográficos

Estilos cadastrados:

- `Display/Hero`
- `Heading/H1`
- `Heading/H2`
- `Heading/H3`
- `Body/Regular`
- `Body/Small`
- `Label/Medium`
- `Caption/Small`

Foi identificada a existência dos estilos, mas sua aplicação efetiva nas telas precisa de uma revisão específica.

### 3.4. Efeitos

Estilo cadastrado:

- `Elevation/Modal`

### 3.5. Componentes principais

Na seção de componentes:

- `Ação flutuante / Botão de acesso`
- `Cabeçalho / Marca institucional`

A auditoria identificou dois componentes principais nessa seção.

---

## 4. Requisitos funcionais por área

### 4.1. Acesso e autenticação

#### Entrar

Campos:
- E-mail institucional.
- Senha.

Ações:
- Entrar na plataforma.
- Criar cadastro.
- Recuperar senha.
- Continuar com Google.
- Fechar.

Comportamento atual no protótipo:
- Entrar direciona à Biblioteca.
- Google direciona à Biblioteca.
- Criar cadastro abre Criar conta.
- Recuperar senha abre Recuperar senha.
- Fechar retorna ao Início.

Requisitos de desenvolvimento:
- Validar e-mail e senha.
- Autenticar o usuário.
- Gerenciar sessão.
- Tratar credenciais incorretas.
- Exibir carregamento e mensagens de erro.
- Implementar recuperação de senha.
- Implementar OAuth Google, caso essa opção seja mantida.

#### Criar conta

Campos:
- Nome completo.
- E-mail institucional.
- Senha.

Ações:
- Criar minha conta.
- Cadastrar com Google.
- Fazer login.
- Fechar.

Requisitos:
- Validar campos obrigatórios.
- Verificar duplicidade de e-mail.
- Definir política de senha.
- Criar conta no sistema.
- Exibir confirmação e erros.
- Implementar OAuth Google, caso mantido.

#### Recuperar senha

Campo:
- E-mail institucional.

Ações:
- Enviar instruções.
- Voltar para login.
- Fechar.

Requisitos:
- Validar e-mail.
- Solicitar redefinição.
- Enviar instruções por e-mail.
- Exibir confirmação da solicitação.
- Tratar endereços não cadastrados.
- Implementar redefinição por link seguro.

**Observação:** os fluxos de autenticação estão simulados. Os botões principais levam diretamente à Biblioteca, sem autenticação real.

---

### 4.2. Produto e área do professor

#### Início

Função:
- Apresentar a plataforma.
- Dar acesso à Biblioteca.
- Disponibilizar login e cadastro.

Requisito:
- Manter uma entrada clara para usuários autenticados e não autenticados.

#### Biblioteca

Função:
- Exibir o acervo de materiais pedagógicos.

Recursos:
- Pesquisa.
- Filtro por tipo de material.
- Filtro por etapa de ensino.
- Filtro por eixo da Computação.
- Acesso aos detalhes.
- Favoritar materiais.
- Acesso a Salvos.
- Acesso ao perfil.
- Acesso às notificações.
- Menu flutuante.

Requisitos:
- Pesquisar por título e tema.
- Combinar filtros.
- Atualizar resultados conforme os filtros.
- Permitir paginação ou carregamento progressivo.
- Permitir favoritar e desfavoritar.
- Exibir estados de carregamento, vazio e erro.

#### Salvos

Função:
- Exibir os materiais favoritados pelo professor.

Requisitos:
- Listar favoritos do usuário.
- Remover materiais dos favoritos.
- Atualizar a lista após remoção.
- Manter persistência entre sessões.
- Permitir acesso aos detalhes.

#### Enviar material

Função:
- Permitir que professores compartilhem materiais com a plataforma.

Requisitos:
- Criar formulário de envio.
- Validar campos obrigatórios.
- Implementar upload de arquivo.
- Definir formatos e limites de tamanho permitidos.
- Exibir progresso do envio.
- Confirmar recebimento.
- Registrar material para revisão.
- Permitir acompanhar o status de submissão.

Estados recomendados:
- Pendente.
- Em análise.
- Aprovado.
- Recusado.

Os critérios de aprovação e os limites de arquivo ainda precisam ser definidos.

#### Meu perfil

Função:
- Exibir e editar informações do professor.

Requisitos:
- Consultar dados cadastrados.
- Editar informações pessoais.
- Alterar foto de perfil.
- Alterar senha.
- Salvar alterações.
- Exibir confirmação ou erro.
- Persistir dados no sistema.

#### Detalhes do material

Função:
- Apresentar informações completas de um recurso pedagógico.

Requisitos:
- Exibir título e descrição.
- Exibir metadados.
- Informar etapa de ensino.
- Informar eixo da Computação.
- Informar tipo de material.
- Permitir favoritar.
- Disponibilizar acesso ao arquivo.
- Tratar materiais indisponíveis ou sem permissão de acesso.

---

### 4.3. Menus, filtros e sobreposições

#### Menu do perfil

Entrada:
- Foto de perfil ou opção de perfil.

Ações:
- Meu perfil.
- Sair da plataforma.
- Fechar.

Comportamento observado:
- Meu perfil abre a tela de perfil como sobreposição.
- Sair retorna ao Início.
- Fechar encerra a sobreposição.

Requisitos:
- Encerrar sessão de forma segura.
- Redirecionar o usuário após logout.

#### Filtros

Existem três sobreposições:

**Tipo de material**
- Plano de aula.
- Slides.
- Material de apoio.
- Atividade.
- Sequência didática.

**Etapa de ensino**
- Educação Infantil.
- Ensino Fundamental — Anos iniciais.
- Ensino Fundamental — Anos finais.
- Ensino Médio.

**Eixo da Computação**
- Pensamento Computacional.
- Mundo Digital.
- Cultura Digital.

Comportamento atual:
- Os filtros abrem como sobreposições.
- As opções são elementos visuais estáticos.
- Limpar e Aplicar apenas fecham a janela.
- Não existe seleção funcional ou atualização dos resultados.

Requisitos:
- Implementar seleção múltipla.
- Manter estado temporário enquanto o filtro estiver aberto.
- Implementar Limpar.
- Aplicar filtros selecionados.
- Combinar filtros de diferentes categorias.
- Atualizar a listagem da Biblioteca.
- Permitir reabrir os filtros mantendo as seleções aplicadas.

#### Compartilhar

Conteúdo:
- WhatsApp.
- Facebook.
- LinkedIn.
- Instagram.
- Link da plataforma.

Comportamento atual:
- A sobreposição abre a partir dos menus e da área de compartilhamento.
- Fechar encerra a janela.
- Os canais sociais não possuem ações identificadas.
- O botão copiar link não possui ação identificada.

Requisitos:
- Implementar compartilhamento por canal.
- Implementar cópia do link.
- Exibir confirmação após copiar.
- Tratar falhas de compartilhamento.

#### Notificações

Conteúdo demonstrativo:
- Novo material.
- Material compartilhado.
- Atualização.
- Indicador de novas notificações.
- Marcar todas como lidas.
- Ver todas as notificações.

Comportamento atual:
- A abertura está conectada aos ícones de sino.
- Fechar encerra a sobreposição.
- Marcar todas como lidas não possui ação identificada.
- Ver todas as notificações não possui ação identificada.

Requisitos:
- Listar notificações do usuário.
- Registrar leitura individual.
- Marcar todas como lidas.
- Atualizar o contador de não lidas.
- Definir destino para cada notificação.
- Implementar histórico de notificações, caso a opção Ver todas seja mantida.

---

## 5. Auditoria das interações do protótipo

### 5.1. Interações identificadas como conectadas

- Navegação entre Início, Biblioteca, Salvos e Enviar material.
- Abertura das sobreposições de filtros.
- Abertura do menu do perfil.
- Abertura das notificações.
- Abertura da janela Compartilhar.
- Acesso à tela Meu perfil.
- Retorno ao Início pelo menu do perfil.
- Fechamento de algumas sobreposições.

### 5.2. Interações simuladas ou incompletas

| Recurso | Estado atual |
|---|---|
| Autenticação | Simulada |
| Login Google | Simulado |
| Cadastro | Simulado |
| Recuperação de senha | Incompleta |
| Pesquisa | Visual, sem busca dinâmica |
| Filtros | Visuais, sem aplicação |
| Favoritos | Sem persistência |
| Envio de material | Sem submissão real |
| Perfil | Sem persistência de edição |
| Alteração de foto | Sem ação funcional identificada |
| Alteração de senha | Sem ação funcional identificada |
| Acesso ao arquivo | Sem destino funcional identificado |
| Compartilhamento | Sem ações funcionais identificadas |
| Copiar link | Sem ação funcional identificada |
| Notificações | Sem gerenciamento funcional identificado |

### 5.3. Pontos específicos para revisão no Figma

1. Menus de Salvos (compacto e completo): não apresentam ação de fechamento identificada.
2. Notificações: existem duas camadas de desfoque em tela cheia. Verificar se uma é redundante.
3. Menu Biblioteca: existe uma ação `SCROLL_TO` no ícone de envio de material, apontando para um texto dentro do grupo Compartilhar. Revisar a ligação.
4. Menu do perfil: a camada de fechamento está nomeada como `Ação fechar janela — cadastro`.
5. Notificações: a camada de fechamento está nomeada como `Ação fechar janela — login`.

Os dois últimos pontos são inconsistências de nomenclatura, não necessariamente problemas visuais.

---

## 6. Regras de negócio e dados necessários

A implementação precisará definir as seguintes entidades e relações.

### Usuário

Dados mínimos:
- Identificador.
- Nome completo.
- E-mail.
- Senha armazenada com hash seguro.
- Foto de perfil.
- Data de cadastro.

### Material

Dados mínimos:
- Identificador.
- Título.
- Descrição.
- Tipo.
- Etapa de ensino.
- Eixo da Computação.
- Arquivo.
- Autor.
- Data de envio.
- Status de aprovação.

### Favoritos

Relação entre:
- Usuário.
- Material.
- Data de inclusão.

Deve impedir duplicidade de favorito para o mesmo usuário e material.

### Notificações

Dados mínimos:
- Identificador.
- Usuário destinatário.
- Tipo.
- Título.
- Mensagem.
- Data.
- Estado de leitura.
- Destino associado, quando aplicável.

### Permissões

Definir:
- Quem pode enviar materiais.
- Quem pode aprovar ou recusar materiais.
- Quem pode acessar materiais pendentes.
- Quem pode editar ou remover materiais publicados.

Os perfis e permissões administrativas ainda precisam ser definidos antes do desenvolvimento dessas funcionalidades.

---

## 7. Prioridades de desenvolvimento

### Prioridade 1 — Fundação

- Estrutura do frontend.
- Estrutura do backend.
- Banco de dados.
- Cadastro e autenticação.
- Gerenciamento de sessão.
- Modelagem de usuários e materiais.

### Prioridade 2 — Funcionalidades centrais

- Biblioteca.
- Pesquisa.
- Filtros combinados.
- Detalhes do material.
- Favoritos persistentes.
- Área de Salvos.

### Prioridade 3 — Contribuição e perfil

- Envio de materiais.
- Upload.
- Validação.
- Fluxo de revisão.
- Edição do perfil.
- Alteração de foto e senha.

### Prioridade 4 — Recursos complementares

- Notificações.
- Compartilhamento.
- Cópia de link.
- Integração Google, caso mantida.
- Melhorias de feedback e estados de interface.

Essa ordem é uma proposta de implementação. A equipe poderá ajustar a sequência conforme arquitetura, prazo e decisões técnicas.

---

## 8. Requisitos de qualidade e experiência

A implementação deverá preservar:

- Identidade visual atual.
- Consistência de espaçamentos.
- Hierarquia tipográfica.
- Contraste adequado.
- Estados de hover, foco, pressionado e desabilitado.
- Feedback para ações do usuário.
- Responsividade.
- Navegação por teclado.
- Rótulos acessíveis para controles.
- Mensagens claras de erro e sucesso.

Também devem ser previstos:
- Estado vazio da Biblioteca.
- Estado vazio de Salvos.
- Falha de carregamento.
- Falha no upload.
- Erros de autenticação.
- Ausência de conexão.
- Conteúdo indisponível.

---

## 9. Pendências antes de iniciar o desenvolvimento

### Design e Figma

- [ ] Revisar o fechamento dos menus de Salvos.
- [ ] Verificar a duplicidade do desfoque em Notificações.
- [ ] Revisar a interação `SCROLL_TO` no menu Biblioteca.
- [ ] Padronizar os nomes das camadas de fechamento.
- [ ] Revisar a aplicação dos estilos tipográficos.
- [ ] Confirmar o comportamento responsivo esperado.
- [ ] Validar visualmente os fluxos em modo Apresentação.

### Produto

- [ ] Definir formatos e limites de upload.
- [ ] Definir fluxo de aprovação de materiais.
- [ ] Definir permissões de usuários.
- [ ] Decidir se o login Google será implementado.
- [ ] Definir o comportamento completo das notificações.
- [ ] Definir quais metadados serão obrigatórios no envio.

### Desenvolvimento

- [ ] Definir stack tecnológica.
- [ ] Definir arquitetura frontend/backend.
- [ ] Definir banco de dados.
- [ ] Definir armazenamento dos arquivos.
- [ ] Definir estratégia de autenticação.
- [ ] Criar contratos de API.
- [ ] Planejar testes funcionais.

---

## 10. Critério de conclusão do handoff

O handoff de design será considerado concluído quando:

1. As telas e componentes estiverem identificados.
2. Os fluxos de navegação estiverem documentados.
3. As interações simuladas estiverem diferenciadas das funcionais.
4. As regras de negócio estiverem definidas ou explicitamente marcadas como pendentes.
5. Os estados de interface estiverem especificados.
6. A equipe de desenvolvimento conseguir identificar o que deve construir sem depender de interpretações do protótipo.

**Conclusão:** o EduComp possui uma base visual e estrutural consistente para avançar à especificação técnica e ao planejamento de desenvolvimento. O protótipo ainda não representa um produto funcional completo. As lacunas identificadas neste documento devem orientar a próxima etapa de trabalho.
