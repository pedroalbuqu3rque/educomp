-- Titulo editorial curto para o segundo registro do acervo inicial.
-- O PDF e os metadados pedagogicos permanecem inalterados.
-- Executar depois da migration 015; nao altera envios de professores.
BEGIN;

UPDATE public.catalog_examples
SET title = 'Privacidade e segurança'
WHERE id = 'd3000000-0000-4000-8000-000000000002'::uuid
  AND title = 'Privacidade e segurança na internet';

COMMIT;
