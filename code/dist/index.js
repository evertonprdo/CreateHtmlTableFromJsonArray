import { Controller } from "./controllers/Controller.js";
const target_1 = document.querySelector('#create-html-table-from-json-array-render-section');
const data_1 = await (async () => {
    return (fetch('fake_api_products.json')
        .then(response => { return response.json(); })
        .then(data => { return data.products; }));
})();
const initial_headers_1 = ["reviews[]", "title", "category", "price", "discountPercentage", "rating", "stock", "brand", "meta.createdAt", "meta.updatedAt", "images[]"];
const table_1 = new Controller.Main(target_1, data_1, initial_headers_1);
table_1.logTests();
