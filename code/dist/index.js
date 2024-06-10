import { Controller } from "./controllers/Controller.js";
const main = new Controller.Main(document.querySelector('#create-html-table-from-json-array-render-section'), await (async () => {
    return (fetch('fake_api_products.json')
        .then(response => { return response.json(); })
        .then(data => { return data.products; }));
})(), {
    "reviews[]": "Reviews[]",
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
});
