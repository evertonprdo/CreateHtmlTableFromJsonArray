import { Controller } from "./controllers/Controller.js";

const target_1 = document.querySelector('#create-html-table-from-json-array-render-section') as HTMLElement

const data_1 = await (async () => { 
    return (fetch('fake_api_products.json')
        .then(response => { return response.json(); })
        .then(data => { return data.products })
    )
})();

const table_1 = new Controller.Main(target_1, data_1)
table_1.TableDataSource.Header.setRenderWithKeys(
    [
        "title",
        "description",
        "discountPercentage",
        "dimensions.width",
        "dimensions.height",
        "dimensions.depth",
        "price",
        "meta.createdAt"
    ]
)
table_1.TableDataSource.Header.titles = {
    "title": "Titulo",
    "description": "Descrição",
    "discountPercentage": "Desconto",
    "price": "Preço",
    "dimensions.width": "Largura",
    "dimensions.height": "Altura",
    "dimensions.depth": "Comprimento",
    "meta.createdAt": "Criando em"
}
table_1.TableDataSource.Header.format_options = {
    "price": "CURRENCY",
    "meta.createdAt": "DATE",
    "discountPercentage": "PERCENT",
    "weight": "FLOAT_FIX"
}
//this.Main.TableDataSource.DataRows. ([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17])
const event_manager = new Controller.EventManager(table_1);