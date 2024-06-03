interface HtmlOptionType {
    [prop: string]: string;
};

interface HeaderOptionType {
    [prop: string | number]: any;
};

class CreateTableByJson {
    table: HTMLTableElement;
    data: object;
    headers: HeaderOptionType;
    html_options: HtmlOptionType;
    fns: {[prop: string]: (prop?:any) => any};
    
    constructor(data:object, headers: HeaderOptionType, table?: HTMLTableElement) {
        this.table = table ? table : this.createTable();
        this.data = data;
        this.headers = headers;
        this.html_options = {} as HtmlOptionType;
        this.fns = {};
    }

    playFn(key: string, prop?: any): any {
        return this.fns[key](prop?? null);
    }

    addFunction(key: string, fn: (prop:any) => any): void {
        this.fns[key] = fn;
    }

    HtmlOptionSet(opt: HtmlOptionType): void {
        if(opt) {
            for (const key in opt) {
                this.html_options[key] = opt[key];
            }
        } else {
            throw new Error;
        }
    }

    HtmlOptionDelete(opt: string[]): void {
        if (opt.length > 0) {
            opt.forEach(key => {
                delete this.html_options[key]
            })
        }
    }

    setHtmlAtribute(html: HTMLElement, opts: HtmlOptionType): void {
        for (const key in opts) {
            html.setAttribute(key, opts[key] as string)
        }
    }

    createCell(type: "th" | "td", inner_text: string, option?: (cell: HTMLTableCellElement) => void): HTMLTableCellElement {
        const cell = document.createElement(type);
        if (option) {
            option(cell);
        }
        cell.innerText = inner_text;
        return cell;
    }

    createRow(str: "th" | "td"): HTMLTableRowElement {
        const tr = document.createElement('tr');
        for (let i = 1; i < 8; i++) {
            const td = this.createCell(str, 'Iteração: ' + i);
            tr.appendChild(td);
        }
        return tr;
    }

    createThead(): HTMLTableSectionElement {
        const thead = document.createElement('thead');
        thead.appendChild(this.createRow('th'));
        return thead;
    }

    createTbody(): HTMLTableSectionElement {
        const tbody = document.createElement('tbody');
        for (let i = 0; i < 20; i++) {
            tbody.appendChild(this.createRow('td'));
        }
        return tbody;
    }

    createTfoot(): HTMLTableSectionElement {
        const tfoot = document.createElement('tfoot');
        tfoot.appendChild(this.createRow('th'));
        return tfoot;
    }

    createTable(): HTMLTableElement {
        const table = document.createElement('table');
        table.appendChild(this.createThead());
        table.appendChild(this.createTbody());
        table.appendChild(this.createTfoot());
        return table;
    }
}
const data_c1 = { data: "key", item: 25, teste: { kest: "Teste", id: 75 }, date: "2024-11-05" };
const headers_c1: HeaderOptionType = {'data': 'Teste', 'item.kest': 'Testando Aninhado', 'date': 'Data da Compra'};

const c1: CreateTableByJson = new CreateTableByJson(data_c1, headers_c1);
document.body.appendChild(c1.table);

c1.setHtmlAtribute(c1.table, { 'data-columref': 'Teste', 'class': 'Classe-Teste' });

c1.HtmlOptionSet({'Header.test': 'Oloi', 'Sabato': 'Teste', 'Teste.teste': 'De Teste que testa os teste'});
c1.HtmlOptionDelete([]);

function nomeada(): void {
    console.log("nomeada");
}
function teste2(): void {
    console.log("teste2");
}
function norm(): any {
    let c = c1.createCell("td", 'Sera que esse tipo de coisa é realmente util? Provavel, mas talvez não desse jeito')
    return c;
}

function fnAtribuicao(c: CreateTableByJson) {
    const tr = c.createRow('td');
    tr.style.color = 'red';
    console.log(tr);
}

c1.addFunction('chave', nomeada);
c1.addFunction('teste2', teste2);
c1.addFunction('norm', norm);
c1.addFunction('teste', fnAtribuicao);

let c = c1.playFn('teste', (c1));
console.log(c);
// É provavel que faz sentido atribuir funções a um objeto, porém suspeito que apenas se usar os atributos internos como parametro fnCustomEditProp(c:string), playCustomFn(key: sting) { call this.customEditPropFn[key](this.c) } inside obj, e chamar play por fora com c1.playCustomFn('String'); Caso contrário parece ser apenas atribuições de void fns ao objto para ser excutado em lote, talvez seja util por algum motivo, mas provavelmente seria o mesmo que executar as funções em um lote de funções por fora mesmo;