# EduComp — Especificação de metadados dos materiais

**Versão:** 0.4  
**Data:** 07/11/2026  
**Situação:** regras de produto definidas; detalhes de implementação ainda pendentes.

## 1. Finalidade

Este documento define os dados necessários para cadastrar, encontrar, consultar e revisar materiais pedagógicos no EduComp.

O professor envia um material com suas informações e arquivos. O conteúdo só passa a integrar a Biblioteca após aprovação por um responsável autorizado. A estrutura do banco de dados e os serviços utilizados serão definidos na etapa técnica.

## 2. Dados do material

### 2.1. Campos preenchidos pelo professor

| Campo | Regra para o MVP |
| --- | --- |
| Título | Obrigatório. Identifica o material e participa da pesquisa. |
| Descrição | Obrigatória. Apresenta o conteúdo e sua finalidade pedagógica. |
| Tema / palavras-chave | Obrigatório. O professor informa uma ou mais palavras-chave livres, exibidas como etiquetas (*tags*). |
| Tipo de material | Obrigatório. Aceita uma ou mais opções da lista definida na seção 3. |
| Etapa de ensino | Obrigatória. Aceita uma ou mais etapas. |
| Ano/série escolar | Obrigatório quando houver seleção de Ensino Fundamental ou Ensino Médio. A associação entre anos e etapas precisa ser detalhada. |
| Eixo da Computação | Obrigatório. Aceita um ou mais eixos. |
| Autor ou fonte | Obrigatório informar a autoria ou a origem do conteúdo. Não se confunde com a conta que realizou o envio. |
| Objetivos de aprendizagem | Opcional. |
| Arquivos | Obrigatório anexar pelo menos um arquivo; são permitidos vários por material. |
| Declaração de direitos | Obrigatória. O professor deve declarar que possui autorização para compartilhar o conteúdo. |

Os limites de caracteres dos campos e a quantidade máxima de palavras-chave ainda serão definidos. Resumo separado, habilidades da BNCC, componente curricular e orientações de uso ficam fora do formulário inicial.

### 2.2. Dados registrados pelo sistema

| Campo | Utilização |
| --- | --- |
| Identificador | Identificação única do material ou da submissão. |
| Responsável pelo envio | Conta autenticada que realizou a submissão. |
| Data do envio | Registro da submissão. |
| Situação da revisão | Pendente, Em análise, Aprovado ou Recusado. |
| Justificativa da recusa | Texto obrigatório quando houver recusa, acessível ao autor em Meus envios. |
| Disponibilidade pública | Indica se um material aprovado está publicado ou foi retirado de circulação. |
| Referências dos arquivos | Identificam os arquivos armazenados e vinculados ao material. |

O responsável pelo envio e o autor do conteúdo podem ser pessoas diferentes. O sistema não deve atribuir automaticamente a autoria ao usuário que enviou o material.

## 3. Classificação pedagógica

### Tipo de material

- Plano de aula
- Slides
- Material de apoio
- Atividade
- Sequência didática

### Etapa de ensino

- Educação Infantil
- Ensino Fundamental — Anos iniciais
- Ensino Fundamental — Anos finais
- Ensino Médio

### Eixo da Computação

- Pensamento Computacional
- Mundo Digital
- Cultura Digital

Um material pode receber **vários tipos, várias etapas e vários eixos**. As opções cadastradas devem corresponder às utilizadas nos filtros da Biblioteca.

Quando o professor selecionar Ensino Fundamental ou Ensino Médio, o formulário deverá exigir ano ou série compatível. Como várias etapas podem ser selecionadas ao mesmo tempo, ainda é necessário definir como os anos serão vinculados a cada uma delas.

EJA e outras modalidades não serão acrescentadas às categorias nesta versão.

## 4. Tema e pesquisa

O campo **Tema / palavras-chave** deverá ser incluído no formulário de envio e no protótipo do Figma. As palavras-chave serão cadastradas livremente, com possibilidade de adicionar mais de uma etiqueta.

A Biblioteca pesquisará pelo **título** e pelas **palavras-chave** dos materiais publicados. As regras de correspondência, combinação de termos e ordenação estão na [Especificação de busca e filtros](especificacao-busca-filtros.md).

Não haverá geração automática de palavras-chave a partir da descrição ou das classificações. A quantidade permitida, os limites de tamanho e a normalização das etiquetas serão definidos antes da implementação do campo.

## 5. Arquivos e acesso

O MVP utilizará **arquivos hospedados na plataforma**, sem cadastro de links externos.

| Regra | Definição |
| --- | --- |
| Formatos aceitos | PDF, DOCX, PPTX, PNG e JPG. |
| Tamanho máximo | 20 MB por arquivo. |
| Quantidade | Vários arquivos por material; número máximo ainda a definir. |
| Armazenamento | Serviço de armazenamento de objetos com controle de acesso. |
| Consulta à Biblioteca e aos detalhes | Permitida sem login. |
| Acesso aos arquivos | Exige autenticação. |

Ao tentar abrir um arquivo sem estar autenticado, o visitante deverá ser encaminhado ao login e, após entrar, retornar à ação que pretendia realizar.

O sistema deverá validar os arquivos antes de concluir a submissão. As verificações técnicas serão definidas de acordo com os riscos e com o serviço de armazenamento escolhido. A validação precisa ocorrer também no servidor; não basta conferir os arquivos no formulário.

Se um arquivo publicado ficar indisponível, o material poderá continuar visível com seus metadados e uma mensagem adequada, até que seja revisado. A interface não deve oferecer um acesso que não possa ser realizado.

**Ainda falta definir:** quantidade máxima de arquivos por material, eventual limite total da submissão e comportamento para erros individuais em uploads múltiplos.

## 6. Envio, revisão e publicação

### 6.1. Envio

O envio é realizado por um professor autenticado. Após a validação dos campos e arquivos, a submissão é registrada como **Pendente**, sem publicação automática.

O professor poderá acompanhar seus materiais em **Meus envios**. Depois da submissão, os dados não poderão ser editados pelo autor nesta versão. Se um material for recusado, uma nova tentativa exigirá outra submissão.

### 6.2. Revisão

A função de revisor será atribuída manualmente pelo responsável técnico ou administrador. A interface restrita deverá oferecer uma lista de submissões, os detalhes de cada material e as ações necessárias à análise.

| Situação | Regra |
| --- | --- |
| Pendente | Material recebido, ainda não iniciado para análise. |
| Em análise | Um revisor autorizado acionou explicitamente o início da análise. |
| Aprovado | O material passou pela revisão e pode ser publicado. |
| Recusado | O material não foi aprovado; a justificativa é obrigatória e visível ao autor. |

A avaliação deverá considerar a completude das informações, a coerência das classificações, a segurança dos arquivos, a autoria e as condições de uso declaradas.

O professor verá a situação atual em **Meus envios**, sem notificações por e-mail ou central de notificações nesta versão. Não está previsto um histórico completo das transições de revisão; devem ser preservados, no mínimo, o estado atual e a justificativa de uma recusa.

### 6.3. Publicação e retirada do acervo

**Aprovação e publicação são condições diferentes.** Um material aprovado pode estar publicado ou ter sido retirado da Biblioteca por um responsável autorizado, sem que sua avaliação se transforme em Recusado.

Somente usuários autorizados poderão aprovar, recusar, editar materiais publicados ou retirá-los de circulação. Os materiais pendentes, em análise, recusados ou despublicados não deverão aparecer na listagem pública.

Os critérios editoriais deverão ser detalhados durante a construção da interface de moderação, mantendo as condições de avaliação acima.

## 7. Apresentação dos dados

**Biblioteca:** os cartões apresentam informações suficientes para reconhecer os materiais, utilizando os metadados cadastrados. Quando não houver miniatura, será utilizado um cartão padrão com ícone. Para materiais com mais de um tipo, ainda é preciso definir qual ícone aparecerá.

**Detalhes:** apresentam descrição, classificações, autoria ou fonte, objetivos de aprendizagem quando cadastrados e arquivos disponíveis. Campos opcionais vazios não devem gerar textos ou valores fictícios.

**Envio:** utiliza seleção múltipla para tipos, etapas e eixos, campo de palavras-chave e upload de vários arquivos. Essas mudanças precisam ser refletidas no Figma.

**Meus envios:** apresenta as submissões do próprio professor, suas situações atuais e a justificativa quando um material for recusado.

**Revisão:** permite consultar os dados necessários para avaliar a submissão e registrar a decisão, sem expor as ações administrativas aos demais usuários.

## 8. Critérios de aceitação

Os identificadores existentes foram mantidos para preservar a referência aos testes.

| ID | Verificação |
| --- | --- |
| CA-MD-01 | Uma submissão válida registra material, responsável pelo envio, data e situação inicial. |
| CA-MD-02 | O cadastro aceita múltiplos tipos, etapas, eixos e palavras-chave. |
| CA-MD-03 | Os materiais publicados aparecem nos filtros correspondentes às suas classificações. |
| CA-MD-04 | O título do material participa da pesquisa da Biblioteca. |
| CA-MD-05 | As palavras-chave cadastradas participam da pesquisa. |
| CA-MD-06 | A ausência de objetivos de aprendizagem não impede a exibição do material. |
| CA-MD-07 | Arquivos com formato inválido ou acima de 20 MB são rejeitados com mensagem adequada. |
| CA-MD-08 | Enviar um material não o publica automaticamente. |
| CA-MD-09 | Um revisor autorizado consegue aprovar o material, tornando possível sua publicação. |
| CA-MD-10 | Um usuário sem permissão não consegue aprovar ou recusar submissões. |
| CA-MD-11 | O professor consulta apenas os próprios envios. |
| CA-MD-12 | A indisponibilidade do arquivo é informada sem inventar um recurso acessível. |
| CA-MD-13 | A autoria ou fonte do conteúdo pode ser diferente da conta responsável pelo envio. |
| CA-MD-14 | Uma recusa exige justificativa, exibida ao autor, e impede a publicação. |
| CA-MD-15 | O visitante não consegue obter o arquivo diretamente sem autenticação. |

## 9. Definições que faltam

As escolhas centrais já foram feitas. Restam detalhes necessários antes de implementar os campos e serviços correspondentes:

- [ ] Definir os limites de caracteres e a quantidade máxima de palavras-chave.
- [ ] Especificar quais anos ou séries podem ser associados a cada etapa de ensino, inclusive quando houver seleção múltipla.
- [ ] Definir a quantidade máxima de arquivos por material e o limite total por submissão.
- [ ] Estabelecer as verificações de segurança e o tratamento de falhas no upload múltiplo.
- [ ] Definir o ícone de cartões classificados em mais de um tipo.
- [ ] Detalhar os critérios editoriais, as permissões de edição e o comportamento da despublicação.
- [ ] Redigir a declaração de direitos de compartilhamento que aparecerá no formulário.

## 10. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [User Flow](../ux-ui/user-flow.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
