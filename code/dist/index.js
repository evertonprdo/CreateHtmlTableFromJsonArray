import { Utils as Utl } from "./utils/Utils.js";
import { DataObject } from "./src/DataObject.js";
import { CreateTableByJson } from "./src/CreateTableByJson.js";
const array_c1 = [];
for (let i = 0; i < 100; i++) {
    array_c1.push({
        data: "key " + i,
        item: i,
        teste: {
            kest: i % 2 === 0 ? 'Teste ' + i : '',
            id: i % 3 === 0 ? 75 + i : '',
            teste: {
                teste: '°-° teste / ' + i * 3
            }
        },
        date: new Date().toLocaleDateString(),
        oste: i * 2,
        oeste: {
            tot: i * 100,
            long: {
                min: i + (i + 35),
                max: i - (i + 35)
            },
            short: {
                min: "Tecnicamente: " + i % 3,
                max: 'loste ' + (i / 3).toFixed(2)
            }
        }
    });
}
const data_c1 = new DataObject(array_c1);
async function getLocalData() {
    return fetch('transacoes.json')
        .then(response => {
        return response.json();
    }).then(data => {
        return data;
    });
}
const data_c2 = await getLocalData();
const headers_c1 = Utl.Data.getAllPaths(data_c2[0]);
const headers_c2 = {
    'tipo.nome': 'Tipo',
    'descr': 'Descrição',
    'valor': 'Valor',
    'date': 'Data',
    'categoria.nome': 'Categoria'
};
const option = {
    max_lenght: 25,
    currency_columns: ['valor']
};
const c1 = new CreateTableByJson(data_c2, headers_c2);
const html_teste_opt = document.createElement('input');
const d1 = document.getElementById('fragmento');
const d_move = document.getElementById('frag-move');
const btn = document.getElementById('btn-move');
const div = document.createElement('span');
div.innerText = 'i';
let fragment = document.createDocumentFragment();
const d_clone = d_move.cloneNode(true);
btn.style.border = 'none';
btn.style.padding = '20px';
btn.style.width = '200px';
function wait300ms() {
    return new Promise(resolve => setTimeout(resolve, 1));
}
async function fillDiv(sec) {
    for (let i = 0; i < 3000; i++) {
        const div = document.createElement('span');
        div.innerText = ` i: ${i},`;
        sec.append(div);
        await wait300ms();
    }
}
async function fillDivFrag(sec) {
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
function paintButton(btn) {
    if (click) {
        btn.style.backgroundColor = '#5BAEB8';
        btn.innerText = 'Fragment Dom!';
        fillDivFrag(d_clone);
        click = !click;
    }
    else {
        btn.style.backgroundColor = '#B86B5B';
        btn.innerText = 'Document';
        fillDiv(d1);
        click = !click;
    }
}
btn.addEventListener('click', function (e) {
    paintButton(btn);
});
