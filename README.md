# CreateHtmlTableByJsonArray
## Listar dados em uma tabela HTML com um comando.

Este projeto tem como objetivo converter um array de objetos JSON em uma tabela HTML de forma automática e padronizada. É útil para desenvolvedores que precisam exibir dados JSON em um formato tabular na web, sem a necessidade de criar a tabela manualmente.

## Requisitos do Json Array:

- Certifique-se de usar .json() nos seus dados.
- O JSON precisa ser uma array de objetos(lista).
- Os objetos precisam ser do mesmo tipo (ter o mesmo esquema).
- Qualquer inconsistência na estrutura(esquema) poderá ter resultados inesperados.
- Inicialmente, este projeto não se compromete a lidar com arrays dentro do JSON Array.
 
Obs: Cabeçalho quando omitido usara a primeira linha como referência.

 ### A "versão 1.0" se comprote a:
 - [ ] Desenvolver uma base de código modular e escalável.
 - [x] Receber o JSON Array, construir e renderizar a tabela HTML.
 - [x] Ordenar a tabela pelo cabeçalho.
 - [x] Rodapé com função columnSum().

### Atualmente o projeto está parado e incompleto:
 - A parte de exibição de valores e construção automatica está funcionando;
 - ordenação pelo cabeçalho e columnSome não está devidamente testado;
 - refatoração incompleta, para verificar o estado atual da refatoração acesse a branch 'rebaseCode'.

para alguns exemplos de configuração da tabela acesse './code/src/index.ts'.
