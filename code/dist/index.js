import { Utils as Utl } from "./utils/Utils.js";
import { DataObject } from "./src/DataObject.js";
import { TableByJson } from "./src/CreateTableByJson.js";
const array_c1 = [];
for (let i = 0; i < 100; i++) {
    array_c1.push({ data: "key " + i, item: i, teste: { kest: i % 2 === 0 ? 'Teste ' + i : '', id: i % 3 === 0 ? 75 + i : '', teste: { teste: '°-° teste / ' + i * 3 } }, date: new Date().toLocaleDateString(), oste: i * 2, oeste: { tot: i * 100, long: { min: i + (i + 35), max: i - (i + 35) }, short: { min: "Tecnicamente: " + i % 3, max: 'loste ' + (i / 3).toFixed(2) } } });
}
const data_c1 = new DataObject(array_c1);
const headers_c1 = Utl.Data.getAllPaths(array_c1[0]);
async function getLocalData() { return fetch('transacoes.json').then(response => { return response.json(); }).then(data => { return data; }); }
const data_c2 = await getLocalData();
const headers_c2 = {
    'tipo.nome': 'Tipo',
    'descr': 'Descrição',
    'valor': 'Valor',
    'date': 'Data',
    'categoria.nome': 'Categoria'
};
const c1 = new TableByJson.Controller(data_c2, headers_c2);
document.body.append(c1.renderer.createTable(c1.data, c1.headers));
