import { Type } from "./utils/Types.js";
import { Utils as Utl } from "./utils/Utils.js";

import { DataObject } from "./src/DataObject.js";
import { CreateTableByJson, Option } from "./src/CreateTableByJson.js";

const array_c1: Type.DataObject = [];
for (let i = 0; i < 100; i++) {
    array_c1.push({ 
        data: "key "+ i, 
        item: i, 
        teste: { 
            kest: i % 2 === 0 ? 'Teste '+ i: '',
            id: i % 3 === 0 ? 75 + i : '',
            teste: {
                teste: '°-° teste / ' + i * 3
            }
        }, 
        date: new Date().toLocaleDateString(),
        oste: i * 2,
        oeste: {
            tot: i*100,
            long: {
                min: i+(i+35),
                max: i-(i+35)
            },
            short: {
                min: "Tecnicamente: "+i%3,
                max: 'loste ' + (i/3).toFixed(2)
            }
        }
    });
}
const data_c1: DataObject = new DataObject(array_c1);

async function getLocalData(): Promise<Type.DataObject> {
    return fetch('transacoes.json')
    .then(response => {
        return response.json();
    }).then(data => {
        return data;
    })
}
const data_c2 = await getLocalData();

const headers_c1: Type.Option = Utl.Data.getAllPaths(data_c2[0]);
const headers_c2: Type.Option = {
    'tipo.nome': 'Tipo', 
    'descr': 'Descrição', 
    'valor': 'Valor', 
    'date': 'Data', 
    'categoria.nome': 'Categoria'
};

const option: Type.DataItem = {
    max_lenght: 25,
    currency_columns: ['valor']
}

const c1: CreateTableByJson = new CreateTableByJson(data_c2, headers_c2);
//document.body.appendChild(c1.table);

const html_teste_opt = document.createElement('input')
const d1 = document.getElementById('fragmento');
const d_move = document.getElementById('frag-move');
const atr_opt = new Option.HtmlAttribute(html_teste_opt, {});

let fragment = document.createDocumentFragment();

atr_opt.setOption('class', 'teste')
fragment.appendChild(html_teste_opt);

atr_opt.setOption('style', 'color: blue')
atr_opt.setOption('value', 'teste')
atr_opt.setOption('data-teste', 'teste')

//d1?.appendChild(html_teste_opt)
console.log(fragment);

d_move?.appendChild(fragment);

