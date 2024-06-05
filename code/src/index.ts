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

//================== Testes de Desempenho do Manipulação do DOM com e sem o fragment ===================================//

const html_teste_opt = document.createElement('input')

const d1 = document.getElementById('fragmento') as HTMLElement;
const d_move = document.getElementById('frag-move') as HTMLElement;

const btn = document.getElementById('btn-move')
const div = document.createElement('span');
div.innerText = 'i';

let fragment = document.createDocumentFragment();
const d_clone = (d_move as HTMLElement).cloneNode(true);

(btn as HTMLButtonElement).style.border = 'none';
(btn as HTMLButtonElement).style.padding = '20px';
(btn as HTMLButtonElement).style.width = '200px';

function wait300ms() {
    return new Promise(resolve => setTimeout(resolve, 1));
  }

async function fillDiv(sec: HTMLElement) {
    for (let i = 0; i < 3000; i++) {
        const div = document.createElement('span');
        div.innerText = ` i: ${i},`;
        sec.append(div);
        await wait300ms();
    }
}

async function fillDivFrag(sec: HTMLElement) {
    for (let i = 0; i < 3000; i++) {
        const div = document.createElement('span');
        div.innerText = ` i: ${i},`;
        sec.append(div);
        await wait300ms();
    }
    fragment.appendChild(sec);
    d_move.parentNode.replaceChild(fragment, d_move);
}

let click = false;
function paintButton(btn: HTMLButtonElement) {
    if (click) {
        btn.style.backgroundColor = '#5BAEB8';
        btn.innerText = 'Fragment Dom!'
        fillDivFrag(d_clone as HTMLElement)
        
        click = !click;
    } else {
        btn.style.backgroundColor = '#B86B5B';
        btn.innerText = 'Document'
        fillDiv(d1 as HTMLElement)
        click = !click;
    }
}

(btn as HTMLButtonElement).addEventListener('click', function(e) {
    paintButton(btn as HTMLButtonElement);
    
})