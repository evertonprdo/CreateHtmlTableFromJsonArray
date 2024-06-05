# Create Table By Json
O nome talvez não reflita muito bem a ideia, é um criador de tabela em js que recebe dados no formato json, e manualmente definindo cabeçalho por path cria uma tabela em Html na estrutura padrão.

## Exemplo de uso: 
 - tabela = new CreateTableByJson(json, {"tipo.nome": 'Tipo', "categoria.nome": "Categoria", "path": "th innerText"});
 - tabela.renderTable();

Atualmente o projeto está em desenvolvimento.
