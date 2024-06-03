interface OptionType {
    [prop: string]: string;
}

interface DataObject {
    [prop: string]: any
}

abstract class Helpers {
    static getNestedProperty(obj: object, path: string) {
        const keys = path.split('.');
        return keys.reduce((prev: {[prop: string]: any}, curr: string) => {
            return prev && prev[curr] !== undefined ? prev[curr] : undefined;
        }, obj);
    }

    static getAllPaths(obj: DataObject, prefix = ''): OptionType {
        let paths: OptionType = {};
        
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    Object.assign(paths, this.getAllPaths(obj[key], newKey));
                } else {
                    paths[newKey] = newKey;
                }
            }
        }
        return paths;
    }
}

const data_c1 = [];

for (let i = 0; i < 100; i++) {
    data_c1.push({ 
        data: "key "+ i, 
        item: i, 
        teste: { 
            kest: i % 2 === 0 ? 'Teste '+ i: '', 
            id: i % 3 === 0 ? 75 + i : '',
            teste: {
                teste: '°-° teste / ' + i*3
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

class CreateTableByJson {
    table: HTMLTableElement;
    data: {[key: string]: any}[];
    headers: OptionType;
    html_options: OptionType;
    
    constructor(data: {[key: string]: any}[], headers: OptionType, table?: HTMLTableElement) {
        this.data = data;
        this.headers = headers;
        this.html_options = {} as OptionType;
        this.table = table ? table : this.createTable();
    }

    HtmlOptionSet(opt: OptionType): void {
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

    setHtmlAtribute(html: HTMLElement, opts: OptionType): void {
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

    createRow(str: "th" | "td", item: OptionType, thead:boolean = false): HTMLTableRowElement {
        const tr = document.createElement('tr');
        for (const key in this.headers) {
            if (thead) {
                const cell = this.createCell(str, `${this.headers[key]}`);
                tr.appendChild(cell);
            } else {
                const cell = this.createCell(str, `${Helpers.getNestedProperty(item, key)}`);
                tr.appendChild(cell);
            }
        }
        return tr;
    }

    createThead(): HTMLTableSectionElement {
        const thead = document.createElement('thead');
        thead.appendChild(this.createRow('th', this.headers, true));
        return thead;
    }

    createTbody(): HTMLTableSectionElement {
        const tbody = document.createElement('tbody');
        for (let i = 0; i < this.data.length; i++) {
            tbody.appendChild(this.createRow('td', this.data[i]))
        }
        return tbody;
    }

    createTfoot(): HTMLTableSectionElement {
        const tfoot = document.createElement('tfoot');
        tfoot.appendChild(this.createRow('td', this.headers, true));
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
//const headers_c1: OptionType = {'data': 'Teste', 'teste.kest': 'Testando Aninhado', 'teste.id': 'Teste Id', 'teste.teste.teste': 'Teste Teste Teste', 'date': 'Data da Compra'};

const headers_c1: OptionType = Helpers.getAllPaths(data_c1[0]);
const c1: CreateTableByJson = new CreateTableByJson(data_c1, headers_c1);

document.body.appendChild(c1.table);