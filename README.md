Criador de tabela em js recebendo um arquivo json e definindo cabeçalho por path. 

Exemplo de uso: 
  tabela = new JsonTable(json, ["tipo.nome", "categoria.nome", "valor"]);
  renderTable(myHtmlTable);

Atualmente a tabela tem que ser pre definida na página com thead, tbody e tfoot.
