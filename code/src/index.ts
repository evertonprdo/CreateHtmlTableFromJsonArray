import { Controller } from "./controllers/Controller.js";

const data_1 = await (async () => { 
    return (fetch('fake_api_products.json')
        .then(response => { return response.json(); })
        .then(data => { return data.products })
    )
})();

const target_1 = document.querySelector('#create-html-table-from-json-array-render-section') as HTMLElement

const table_1 = new Controller.Main(target_1, data_1)
table_1.TableDataSource.Header.turnRenderOnWithIndexArray(
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
table_1.TableDataSource.Header.setBatchTitles({
    "title": "Titulo",
    "description": "Descrição",
    "discountPercentage": "Desconto",
    "price": "Preço",
    "dimensions.width": "Largura",
    "dimensions.height": "Altura",
    "dimensions.depth": "Comprimento",
    "meta.createdAt": "Criando em"
})
const event_manager = new Controller.EventManager(table_1);