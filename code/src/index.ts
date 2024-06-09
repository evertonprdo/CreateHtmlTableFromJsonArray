import { Controller } from "./controllers/Controller.js";

const main = new Controller.DataArray(await (async () => { 
    return (fetch('transacoes.json')
        .then(response => { return response.json(); })
        .then(data => { 
            return data
            }
        )
    )
})(), {
    "valor": "Valor",
    "descr": "Descrição",
    "tipo.nome": "Tipo",
    "categoria.nome": "Categorias",
    "date": "Data"
});

main.popHeader("valor");
main.pushHeader("id");

main.setHeaderTitle("valor", "Valor da Transação");
main.setHeaderTitle({
    "descr": "Nova Atribuição",
    "id": "Indice DB",
    "categoria.id": "Indice da Categoria"
})

console.log(main.headers);