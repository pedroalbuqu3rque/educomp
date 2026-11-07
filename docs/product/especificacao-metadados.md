# EduComp — Especificação de metadados dos materiais

**Versão:** 1.0 · **Data:** 07/11/2026 · **Situação:** estrutura funcional definida; validações técnicas a completar.

## 1. Finalidade

Esta especificação define os dados necessários para cadastrar, classificar, descobrir e apresentar materiais pedagógicos no EduComp. As classificações do envio devem ser as mesmas usadas pela Biblioteca e pelos filtros. O sistema não deve criar informações de autoria ou ensino que o professor não tenha fornecido.

## 2. Campos informados no envio

| Campo | Regra |
| --- | --- |
| **Título do material** | Obrigatório. Identifica o recurso na Biblioteca e nos detalhes. |
| **Descrição** | Obrigatória. Explica o conteúdo e a utilização prevista. |
| **Tema / palavras-chave** | Obrigatório informar ao menos uma tag; admite múltiplas entradas livres. |
| **Tipos de material** | Obrigatório selecionar ao menos um; seleção múltipla. |
| **Etapas de ensino** | Obrigatório selecionar ao menos uma; seleção múltipla. |
| **Anos / séries** | Obrigatório quando a etapa exigir essa identificação; opções compatíveis com cada etapa selecionada. |
| **Eixos da Computação** | Obrigatório selecionar ao menos um; seleção múltipla. |
| **Abordagem da atividade** | Obrigatória: Plugada, Desplugada ou ambas. |
| **Autor ou fonte** | Obrigatório; pode ser diferente do professor responsável pelo envio. |
| **Objetivos de aprendizagem** | Opcionais, exibidos nos detalhes quando informados. |
| **Arquivos** | Pelo menos um, podendo haver vários, respeitando os formatos e o limite por arquivo. |
| **Direitos de compartilhamento** | Declaração obrigatória de autoria ou autorização e respeito à privacidade. |

O formulário exibe seleções de tipo, etapa, ano/série, eixo e abordagem de maneira explícita, além da lista de arquivos selecionados, seus tamanhos e a opção de remoção. Os limites de tamanho dos textos e o número máximo de tags serão definidos antes da implementação dos campos.

## 3. Classificação pedagógica

### 3.1. Tipos de material

1. Plano de aula
2. Slides
3. Material de apoio
4. Atividade
5. Sequência didática
6. **Jogo**

A seleção múltipla permite representar materiais que combinem formatos. No cartão, apresenta-se um tipo principal de forma consistente, enquanto os detalhes podem exibir todas as classificações pertinentes. O critério de prioridade do tipo principal será definido no modelo de dados.

### 3.2. Etapas e anos/séries

| Etapa | Exemplo de apresentação |
| --- | --- |
| Educação Infantil | `EI · 4 anos` ou `EI · 5 anos` |
| Ensino Fundamental — Anos iniciais | `EF · 2º ano` ou `EF · 4º ano` |
| Ensino Fundamental — Anos finais | `EF · 6º ano` ou `EF · 9º ano` |
| Ensino Médio | `EM · 1ª série` ou `EM · 2ª série` |

Um material pode atender a mais de uma etapa e a mais de um ano/série. O sistema deve vincular cada ano/série à etapa correta, evitando uma lista independente que gere combinações inválidas. O conjunto definitivo de opções para Educação Infantil, Ensino Fundamental e Médio será conferido durante a modelagem.

### 3.3. Eixos da Computação

- Pensamento Computacional
- Mundo Digital
- Cultura Digital

Um material pode contemplar mais de um eixo. O formulário e os filtros devem utilizar o mesmo vocabulário.

### 3.4. Abordagem plugada e desplugada

A abordagem pode conter **Plugada**, **Desplugada** ou **as duas**. A classificação deve ficar registrada como dado, não inferida apenas a partir dos arquivos enviados.

- **Plugada:** utilização de dispositivos ou recursos digitais como parte da proposta.
- **Desplugada:** possibilidade de desenvolver a atividade sem depender desses dispositivos.

Nos cartões, a abordagem é sinalizada pelos ícones de monitor e monitor riscado, sem texto de tag adicional. No detalhe do material, a abordagem pode ser descrita textualmente para evitar dúvidas. Materiais com as duas opções devem atender a qualquer um dos filtros de abordagem.

## 4. Dados registrados pelo sistema

| Campo | Finalidade |
| --- | --- |
| Identificador do material/submissão | Associar dados, recursos, contribuições e revisão. |
| Conta responsável pelo envio | Identificar quem submeteu o recurso. |
| Autor ou fonte do conteúdo | Identificar a autoria informada, distinta do responsável quando necessário. |
| Data de envio | Registro da submissão. |
| Situação editorial | Pendente, Em análise, Aprovado ou Recusado, além da orientação de ajustes quando usada no fluxo. |
| Justificativa da decisão | Obrigatória em recusa e vinculada à submissão. |
| Disponibilidade pública | Controla se um material aprovado aparece na Biblioteca. |
| Arquivos armazenados | Identificadores, formatos, tamanhos e estado de acesso. |
| Responsável e data de revisão | Rastreabilidade da decisão editorial. |

A exposição pública de dados deve seguir o contexto: a Biblioteca publica os metadados pedagógicos e a autoria; **Meus envios** apresenta dados da própria conta; a área de revisão disponibiliza informações operacionais somente a pessoas autorizadas.

## 5. Pesquisa, cartões e detalhes

**Pesquisa:** título e tags livres participam da busca. Tipos, etapas, eixos e abordagens participam dos filtros, com regras descritas na [Especificação de busca e filtros](especificacao-busca-filtros.md).

**Cartão:** exibe tipo principal, título, descrição breve, indicação de etapa/ano ou série, ícone(s) de abordagem e controle de favorito. Diferentes recursos devem apresentar seus metadados próprios; os exemplos do protótipo não são conteúdo fixo do produto.

**Detalhes:** apresentam informações pedagógicas, abordagem, descrição, objetivos quando disponíveis, autoria e acesso aos arquivos. Campos opcionais vazios não são substituídos por textos genéricos. O link de autoria pode abrir um perfil público com a lista de materiais publicados desse professor.

## 6. Arquivos e permissões

| Regra | Definição |
| --- | --- |
| Formatos | PDF, DOCX, PPTX, PNG e JPG |
| Limite por arquivo | **20 MB** |
| Arquivos por envio | Um ou mais; quantidade máxima ainda a definir |
| Origem | Upload para armazenamento controlado pela plataforma |
| Consulta de metadados | Pública para materiais publicados |
| Obtenção de arquivos | Mediante autenticação e autorização |

O servidor deve verificar extensão, tipo real, tamanho e regras de segurança antes de aceitar o envio. Arquivos inválidos ou acima do limite geram mensagens específicas; falhas recuperáveis não devem apagar os dados válidos do formulário. Materiais com arquivo temporariamente indisponível podem manter seus metadados, sem oferecer uma ação de acesso inexistente.

Links externos para materiais não integram o MVP.

## 7. Envio, revisão e publicação

1. O professor preenche o formulário, seleciona os arquivos e confirma os direitos de compartilhamento.
2. A aplicação valida os dados, cria a submissão vinculada à conta e registra **Pendente**.
3. Um revisor autorizado inicia explicitamente a avaliação: **Em análise**.
4. A revisão pode resultar em **Aprovado** ou **Recusado**, exigindo justificativa em caso de recusa. O protótipo também apresenta orientação de ajustes e reenvio; a modelagem desse caso será fechada sem confundi-lo com publicação.
5. Um material aprovado somente aparece na Biblioteca quando sua **disponibilidade pública** estiver ativa.
6. Responsáveis autorizados podem retirar um recurso da circulação sem reclassificá-lo como Recusado.

As decisões devem conservar responsável e data. O acesso às ações de revisão e moderação exige permissão no servidor.

## 8. Vínculo com comunidade e perfis públicos

Cada discussão pertence a um material; cada comentário, resposta ou relato está associado a uma conta autenticada. Relatos de aplicação têm ano/série da turma, texto e adaptações opcionais. Conteúdos públicos podem ser denunciados por usuários autenticados e moderados.

O perfil público mostra apenas dados autorizados — nome, foto/avatar, cargo/função, apresentação e materiais publicados. E-mail, credenciais, arquivos privados e informações de denúncia não devem compor a página pública.

## 9. Critérios de aceitação

| ID | Verificação |
| --- | --- |
| CA-MD-01 | Submissão válida registra dados, responsável, arquivos e situação inicial. |
| CA-MD-02 | Campos de classificação aceitam múltiplos tipos, etapas, anos/séries, eixos e tags. |
| CA-MD-03 | Classificações alimentam os filtros da Biblioteca corretamente. |
| CA-MD-04 | Título participa da pesquisa. |
| CA-MD-05 | Tags cadastradas participam da pesquisa. |
| CA-MD-06 | Objetivos ausentes não geram valores fictícios. |
| CA-MD-07 | Formato inválido ou arquivo acima de 20 MB gera erro adequado. |
| CA-MD-08 | Envio não publica automaticamente. |
| CA-MD-09 | Aprovação editorial permite publicação, mediante condição pública separada. |
| CA-MD-10 | Contas sem permissão não revisam materiais. |
| CA-MD-11 | Autor consulta apenas as próprias submissões em Meus envios. |
| CA-MD-12 | Arquivo indisponível não aparece como acessível. |
| CA-MD-13 | Autoria/fonte pode diferir de quem enviou. |
| CA-MD-14 | Recusa exige justificativa exibida ao responsável. |
| CA-MD-15 | Visitante sem autenticação não obtém arquivo protegido. |
| CA-MD-16 | Jogo aparece entre os tipos aceitos. |
| CA-MD-17 | Abordagem aceita Plugada, Desplugada ou ambas. |
| CA-MD-18 | Cartões usam etapa/ano ou série coerente e os ícones corretos de abordagem. |
| CA-MD-19 | Perfil público não expõe e-mail ou dados privados. |

## 10. Definições técnicas pendentes

- [ ] Quantidade e tamanho máximo de tags; limites dos demais campos.
- [ ] Vinculação normalizada entre etapas e anos/séries, inclusive Educação Infantil.
- [ ] Prioridade do tipo principal quando houver classificações múltiplas.
- [ ] Número máximo de arquivos por envio, limite total e política de upload parcial.
- [ ] Regras de ajuste/reenvio, edição editorial e despublicação.
- [ ] Mecanismos de armazenamento, proteção de arquivos e retenção de dados.

## 11. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [User Flow](../ux-ui/user-flow.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
