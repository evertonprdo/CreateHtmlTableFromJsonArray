"use strict";
const html_table = document.createElement('table');
const html_table_title = document.createElement('title');
const html_table_caption = document.createElement('caption');
const html_thead = document.createElement('thead');
const html_tbody = document.createElement('tbody');
const html_tfoot = document.createElement('tfoot');
const html_tr = document.createElement('tr');
const html_th = document.createElement('th');
const html_td = document.createElement('td');
function createTdRow(str) {
    const tr = document.createElement('tr');
    for (let index = 0; index < 7; index++) {
        const td = document.createElement(str);
        td.innerText = "Iteração: " + index;
        tr.appendChild(td);
    }
    return tr;
}
for (let index = 0; index < 25; index++) {
    html_tbody.appendChild(createTdRow('td'));
}
html_thead.append(createTdRow('th'));
html_tfoot.append(createTdRow('th'));
html_table_caption.innerText = "Teste de Descrição de Tabela";
html_table.appendChild(html_table_caption);
html_table.appendChild(html_thead);
html_table.appendChild(html_tbody);
html_table.appendChild(html_tfoot);
document.body.appendChild(html_table);
[];
class CreateTableByJson {
    table;
    data;
    headers;
    constructor(data, headers, table) {
        this.table = table ? table : document.createElement('table');
        this.data = data;
        this.headers = headers;
    }
}
const data_c1 = { data: "key", item: 25, teste: { kest: "Teste", id: 75 }, date: "2024-11-05" };
const headers_c1 = [{ 'data': "Chave de Valores" }, { 'item.kest': "Teste" }, { 'date': 'Data' }];
const c1 = new CreateTableByJson(data_c1, headers_c1, html_table);
console.log(c1);
