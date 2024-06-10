import { Controller } from "./controllers/Controller.js";

const target_1 = document.querySelector('#create-html-table-from-json-array-render-section') as HTMLElement
const data_1 = await (async () => { 
    return (fetch('fake_api_products.json')
        .then(response => { return response.json(); })
        .then(data => { return data.products })
    )
})();

const initial_headers_1 = ["reviews[]", "title", "category", "price", "discountPercentage", "rating", "stock", "brand", "meta.createdAt", "meta.updatedAt", "images[]"]
const initial_headers_2 = {
    "reviews[]":"Reviews[]",
    "title": "Titulo",
    "category": "Categoria",
    "price": "Preço",
    "discountPercentage": "Desconto",
    "rating": "Popularidade",
    "stock": "Estoque",
    "brand": "Marca",
    "meta.createdAt": "Data de Criação",
    "meta.updatedAt": "Data de Atualização",
    "images[]": "Imagens[]"
}

const table_1 = new Controller.Main(target_1, data_1, initial_headers_2)      // Colunas viziveis ao instanciar a classe e seus respectivos titulos.
//const table_1 = new Controller.Main(target_1, data_1, initial_headers_1)      // Colunas viziveis ao instanciar a classe.
//const table_1 = new Controller.Main(target_1, data_1)                         // Todas as colunas visiveis ao instanciar a classe


/** Complexidade de classes Ascendente ou Descendente?
* 
* Descendente: 
* - As classes são mais idenpendentes;
* - Constroladores menos versatil;
* - Controlladores mais simplificados;
* - Facilidade em reconhecer as funções principais.
* 
* Ascendente: 
* - As classes são menos modulares;
* - Tudo acaba dependedendo de tudo;
* - Constroladores mais versateis;
* - Dificuldade em reconhecer as funções principais.
* 
* Decisão: Complexidade Descendente, tornar as classes inferiores mais independentes, e simplificar os constroladores
*/