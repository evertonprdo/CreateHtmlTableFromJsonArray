const html_table: HTMLTableElement = document.createElement('table');
const html_table_title: HTMLTitleElement = document.createElement('title');
const html_table_caption: HTMLTableCaptionElement = document.createElement('caption');

const html_thead: HTMLTableSectionElement = document.createElement('thead');
const html_tbody: HTMLTableSectionElement = document.createElement('tbody');
const html_tfoot: HTMLTableSectionElement = document.createElement('tfoot');

const html_tr: HTMLTableRowElement = document.createElement('tr');
const html_th: HTMLTableCellElement = document.createElement('th');
const html_td: HTMLTableCellElement = document.createElement('td');

function createTdRow(str: "th" | "td"): HTMLTableRowElement {
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

//type DataHeaders = { [key: string]: string }[];
interface DataHeaders { [key:string]:string }[];

class CreateTableByJson {
    table: HTMLTableElement;
    data: object;
    headers: DataHeaders;
    
    constructor(data:object, headers: DataHeaders, table?: HTMLTableElement) {
        this.table = table ? table : document.createElement('table');
        this.data = data;
        this.headers = headers;
    }
}
const data_c1 = { data: "key", item: 25, teste: { kest: "Teste", id: 75 }, date: "2024-11-05" };

const headers_c1: DataHeaders = [{'data': "Chave de Valores"}, {'item.kest': "Teste"}, { 'date': 'Data' }];

const c1: CreateTableByJson = new CreateTableByJson(data_c1, headers_c1, html_table);


console.log(c1);