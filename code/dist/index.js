import CreateTableByJson from "./CreateTableByJson.js";
async function getLocalData() { return fetch('transacoes.json').then(response => { return response.json(); }).then(data => { return data; }); }
const data_c2 = await getLocalData();
const headers_c2 = {
    'tipo.nome': 'Tipo',
    'descr': 'Descrição',
    'valor': 'Valor',
    'date': 'Data',
    'categoria.nome': 'Categoria'
};
const c1 = new CreateTableByJson(data_c2, headers_c2);
c1.funcaoTemporariaParaTestarCertasCoisasEnquantoEuMeResolvoDeComoDefinitivamenteVaiFicarAArquitetura();
