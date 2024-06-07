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
 - [ ] Receber o JSON Array, construir e renderizar a tabela HTML.
 - [ ] Ordenar a tabela pelo cabeçalho.
 - [ ] Rodapé com função columnSum().

Atualmente o projeto está em desenvolvimento, exemplos serám adicionais quando estiver funcional, para acompanhar a usabilidade acesse ./code/src/index.ts