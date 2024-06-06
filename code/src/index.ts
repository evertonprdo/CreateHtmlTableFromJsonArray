import { Type } from "./utils/Types.js";
import { Utils as Utl } from "./utils/Utils.js";
import { Option as Opt } from "./src/Option.js";

import { DataObject } from "./src/DataObject.js";
import { TableByJson } from "./src/CreateTableByJson.js";

const array_c1: Type.DataObject = [];
//achantando a criação de dados aleatórios para melhor visualizar as funções de instancia do objeto.
for (let i = 0; i < 100; i++) { array_c1.push({ data: "key "+ i, item: i, teste: { kest: i % 2 === 0 ? 'Teste '+ i: '', id: i % 3 === 0 ? 75 + i : '', teste: { teste: '°-° teste / ' + i * 3 } }, date: new Date().toLocaleDateString(), oste: i * 2, oeste: { tot: i*100, long: { min: i+(i+35), max: i-(i+35) }, short: { min: "Tecnicamente: "+i%3, max: 'loste ' + (i/3).toFixed(2) } } }); }

// Pegando os dados e Instanciando a classe core para renderização da Tabela.

const data_c1: DataObject = new DataObject(array_c1);
const headers_c1: Type.Option = Utl.Data.getAllPaths(array_c1[0]);

async function getLocalData(): Promise<Type.DataObject> { return fetch('transacoes.json').then(response => { return response.json(); }).then(data => { return data; }) }

const data_c2 = await getLocalData();
const headers_c2: Type.Option = {
    'tipo.nome': 'Tipo', 
    'descr': 'Descrição', 
    'valor': 'Valor', 
    'date': 'Data', 
    'categoria.nome': 'Categoria'
};

const c1: TableByJson.Controller = new TableByJson.Controller(data_c2, headers_c2); // atualmente headers é opcional

document.body.append(c1.renderer.createTable(c1.data, c1.headers)); // Atualmente o CreateTable é uma função temporária.
