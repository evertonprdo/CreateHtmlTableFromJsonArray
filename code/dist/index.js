import { Controller } from "./controllers/Controller.js";
import { Utils } from "./utils/Utils.js";
const main = new Controller.Main(document.querySelector('#create-html-table-from-json-array-render-section'), await (async () => {
    return (fetch('fake_api_products.json')
        .then(response => { return response.json(); })
        .then(data => { return data.products; }));
})());
let path = 'tags.tag_names[]';
console.log(Utils.Common.getNestedProperty({
    "tipo": {
        "id": 1,
        "nome": "Entrada",
        "dimensoes": {
            "largura": 25,
            "altura": 30,
            "comprimento": 50
        }
    },
    "categorias": [1, 2, 3, 4, 5],
    "tags": {
        "main": "Lavanda",
        "render": true,
        "tag_names": ["amarelo", "azul", "verde", "green"],
        "objetos": [
            { "chave1": "valor1" },
            { "chave2": "valor2" },
            { "chave3": "valor3" },
            { "chave4": "valor4" }
        ]
    }
}, path));
