# Foto de perfil e reenvio de materiais

Esta etapa completa dois fluxos do EduComp. A foto fica em **Meu perfil**; o reenvio começa em **Meus envios**, a partir de uma submissão que recebeu uma solicitação de ajustes ou foi recusada.

## Ativação

Execute `supabase/migrations/202611110011_profile_photo_resubmissions.sql` no SQL Editor, **somente depois da migration 010**. Esta migration adiciona `profiles.avatar_path`, cria o bucket público `avatars`, registra `materials.resubmission_of` e incorpora `changes_requested` ao ciclo editorial. Não modifica as contas existentes nem concede o papel de revisor. Os campos de foto ficam vazios para quem ainda não selecionou uma imagem.

Após atualizar o projeto:

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run dev
```

Use `/conta`, `/meus-envios`, `/enviar?revisao=ID` e `/revisao`. Não compartilhe credenciais ou a chave `service_role` com o navegador.

## Foto de perfil

O professor seleciona JPG/PNG de até 5 MB, confere a prévia circular e confirma. A API `POST /api/perfil/foto` confere a sessão, a origem, o tamanho, o MIME, a extensão e a assinatura do arquivo. Salva em `avatars/<ID da conta>/<UUID>.png` ou `.jpg` e associa o caminho ao perfil. `DELETE /api/perfil/foto` remove a associação e solicita a exclusão do arquivo.

O bucket `avatars` é **público por decisão de produto**, já que a foto aparece em perfis e discussões abertos a visitantes. O usuário recebe essa informação antes do envio. Não use a foto para informações privadas. Diferentemente dos arquivos dos materiais, a imagem não exige login para consulta.

As permissões do Storage impedem que uma conta grave ou apague objetos na pasta de outra. O banco valida que `avatar_path` pertence ao próprio perfil. O sistema não aceita SVG, GIF ou URLs arbitrárias. Se houver falha na comunicação entre Storage e banco, pode ser necessária uma limpeza administrativa de arquivos órfãos.

## Ajustes e nova versão

O revisor abre uma submissão pendente, inicia a análise e pode **Aprovar**, **Solicitar ajustes** ou **Recusar**. Os dois últimos exigem justificativa com 10 a 1.000 caracteres. A decisão aparece no histórico e gera notificação ao autor. **Solicitar ajustes** não publica o material.

O autor abre **Meus envios → Acompanhar envio → Editar e reenviar**. A tela de envio preenche título, descrição, palavras-chave, classificações, abordagem, autoria e objetivos, mas exige uma nova confirmação de direitos e o envio de arquivos novamente. Os anexos originais ficam ligados à versão anterior e não são alterados. Ao concluir, uma nova linha é criada em `materials`, com `resubmission_of` apontando para o ID anterior.

A API valida a identidade e a situação do material de origem. A RLS executa a mesma proteção no banco, independentemente da interface. Um índice parcial impede mais de uma nova submissão concluída a partir da mesma origem. A versão seguinte fica **pendente**, para revisão editorial independente. As versões anteriores seguem privadas quando não publicadas.

É possível reenviar uma nova versão que também recebeu ajustes, criando uma cadeia de versões, sem sobrescrever o histórico da equipe.

## Roteiro de QA

1. Conta A: enviar uma foto PNG/JPG válida, conferir o avatar no perfil público, na Comunidade e no cabeçalho; substituir e remover.
2. Conta A: tentar imagem com mais de 5 MB, extensão incompatível e arquivo falso com MIME alterado; todos devem ser recusados.
3. Conta B: tentar alterar a foto da conta A via API e via Supabase; a operação deve ser bloqueada.
4. Revisor: iniciar uma análise e solicitar ajustes, incluindo justificativa; validar o aviso ao autor.
5. Conta A: abrir a solicitação, conferir os campos preenchidos, editar informações e anexar novos arquivos. Confirmar o status *Aguardando revisão*.
6. Conta B: tentar reenviar a submissão da conta A; a operação deve ser negada.
7. Conta A: tentar reenviar novamente a mesma origem após concluir a primeira nova versão; não deve duplicar o envio.
8. Revisor: aprovar e publicar a nova versão. Confirmar que somente a nova versão fica pública, sem alteração retroativa do envio original.
9. Revisor: recusar outro material; confirmar a justificativa e a possibilidade de preparar nova versão.

## Limites desta etapa

Esta implementação não inclui corte ou edição manual da imagem, notificações por e-mail nem comparação visual automática entre versões. Os testes de integração precisam ser executados num Supabase configurado com as migrations até a 011. Antes do lançamento público, revise os Termos e a Política de Privacidade, incluindo a natureza pública das fotos escolhidas.
