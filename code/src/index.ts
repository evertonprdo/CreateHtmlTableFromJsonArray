import { Helpers } from "./tools/Helpers.js";
import { DataObject } from "./src/DataObject.js";
import { CreateTableByJson } from "./src/CreateTableByJson.js";
import { OptionType, DataObjectType, DataItemType } from "./tools/types.js";

const array_c1: DataObjectType = [];

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

array_c1.push({'oste': 'MatchTeste' ,'prop': 'teste de incoerencia das colunas', 'vertice': 'blue', 'v': {'max': 'armarelo'}})

const data_c1: DataObject = new DataObject(array_c1);

async function getLocalData(): Promise<DataObjectType> {
    return fetch('transacoes.json')
    .then(response => {
        return response.json();
    }).then(data => {
        return data;
    })
}

const data_c2 = await getLocalData();

const headers_c1: OptionType = Helpers.getAllPaths(array_c1[0]);
const headers_c2: OptionType = {
    'tipo.nome': 'Tipo', 
    'descr': 'Descrição', 
    'valor': 'Valor', 
    'date': 'Data', 
    'categoria.nome': 'Categoria'
};

const option: DataItemType = {
    max_lenght: 25,
    currency_columns: ['valor']
}

const c1: CreateTableByJson = new CreateTableByJson(data_c1, headers_c1);
document.body.appendChild(c1.table);

console.log(Helpers.makeMyOwnDomTableDataObject('table'));