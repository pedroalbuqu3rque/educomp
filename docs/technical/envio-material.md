# Envio de materiais

Esta etapa substitui a página provisória `/enviar` por um formulário integrado ao Supabase. Também acrescenta `/meus-envios`, onde o professor acompanha cada contribuição.

O layout segue a seção **7 · Envio de materiais** do protótipo: informações pedagógicas na coluna principal, arquivos e confirmação de direitos na lateral, além de uma confirmação após o envio.

## Como funciona

1. O professor entra na conta e preenche título, descrição, palavras-chave, tipos, etapas, anos/séries, eixos, abordagem, autoria e, se desejar, objetivos.
2. O formulário recebe até **5 arquivos**, de até **20 MB cada**, respeitando **50 MB no total**. Os formatos aceitos são PDF, DOCX, PPTX, PNG e JPG. A rota de envio verifica o conteúdo do arquivo antes de registrar a contribuição.
3. O servidor cria um rascunho privado, vincula as classificações, salva os arquivos no bucket privado `materials` e os registra no banco.
4. A função SQL `submit_material` verifica o autor, a existência dos arquivos e as classificações obrigatórias. Se estiver tudo certo, muda o status para `pending` (**Aguardando revisão**). O material **não é publicado** nessa etapa.
5. Uma falha antes da conclusão tenta remover os arquivos e o rascunho. Se houver um problema de conexão, o professor deve conferir **Meus envios** antes de repetir a operação.
6. Revisores autorizados podem usar `review_material` para iniciar a revisão, aprovar, recusar com justificativa e publicar. As telas desse painel ainda são uma entrega separada.

## Aplicação da migration

No SQL Editor do Supabase, execute `supabase/migrations/202611110006_material_submissions.sql` **depois** das migrations 001–005. Essa migration adiciona o estado temporário `draft`, políticas de envio restritas ao autor e a função de finalização.

Não é necessário criar um novo bucket: o `materials` já foi definido pela migration 002 e deve continuar **privado**. Não altere o bucket para público para solucionar problemas de download.

## Verificação manual

- Entrar na plataforma e abrir **Enviar material**; o redirecionamento deve preservar `/enviar` após o login.
- Tentar enviar com dados obrigatórios vazios, sem arquivo, com formato proibido e com tamanho acima do permitido. Nenhum deles deve criar um envio concluído.
- Enviar um arquivo PDF real e válido com as classificações preenchidas. Confirmar a mensagem de sucesso.
- Abrir **Meus envios** e localizar a contribuição como **Aguardando revisão**.
- Consultar a Biblioteca como visitante: o material ainda **não** deve aparecer.
- Verificar no Supabase o material pendente, os registros de `material_taxonomies` e `material_files` e o objeto privado no Storage.
- Com uma conta de revisor, conferir a transição para análise, aprovação e publicação. Só depois da publicação o material deve aparecer na Biblioteca.
- Depois de retirar a publicação, confirmar que outra conta não consegue acessar o arquivo pelo Storage.

## Pontos ainda abertos

O painel de revisão e o tratamento de pedidos de ajustes ainda serão construídos. Também falta validar o fluxo inteiro com um projeto Supabase ativo e executar a suíte de testes em um ambiente com as dependências instaladas. Antes de publicar em serviços com limite de tamanho de requisição HTTP, será necessário confirmar o suporte aos uploads de até 50 MB ou adaptar o transporte para upload direto ao Storage.
