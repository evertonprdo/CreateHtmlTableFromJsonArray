import { Type } from "../CreateTableByJson";

export class DataObject {
    private data: Type.DataObject;
    private data_opts: Option.Data;

    private readonly default_records: Type.DataObject;
    constructor(records: Type.DataObject, headers: Type.Option) {
        this.data = records;
        this.default_records = records;
        this.data_opts = new Option.Data(headers);
    }

    get headers() {
        return this.data_opts.headers;
    }

    get records() {
        return this.data;
    }

    get defaultData() {
        return this.default_records;
    }
}

/**
 * No Papel a ideia de usar Options para pre-definir certas coisas parece interressante, na prática está se mostrando bem complexo, e menos prático do que simplesmente criar uma função dentro das classes, talvez eu desista disso, não sei, tenho que pensar melhor, talvez eu só esteja pensando errado e esteja atomizando demasiadamente o código ;-;
 * Talvez por cada instancia de opção dentro da própria classe seja mais inteligente do que tentar usar o controlador pra fazer tudo.
 * Options seria uma especie de self-config, onde conteria dados relevantes a cada classe.
 * A ideia principal seria centralizar as opções, como se fosse uma página de configurações que controlaria as funcionalidades do sistema como um todo.
 * Acho que vou amanhã vou tentar algo parecido com rotas pra ver como fica na pratica.
 */
export namespace Option {
    export class Renderer {
        pagination: Type.Option;

        constructor() {
            this.pagination = { 'limit_rows': '25' }
        }
    }

    export class Data {
        private header: Type.Option;

        constructor(headers: Type.Option) {
            this.header = headers;
        }

        get headers() {
            return this.header;
        }
    }

    export class Html {
        attribute: Type.Option = {};

        public setOption(key: string, value: string): void {
            this.attribute[key] = value;
        }

        public removeOption(key: string) : void {
            delete this.attribute[key];
        }

        public clearOptions(): void {
            Object.keys(this.attribute).forEach(key => {
                this.removeOption(key);
            });
        }

        get options() {
            return this.attribute
        }
    }
}