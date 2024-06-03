"use strict";
class Helpers {
    static getNestedProperty(obj, path) {
        const keys = path.split('.');
        return keys.reduce((prev, curr) => {
            return prev && prev[curr] !== undefined ? prev[curr] : undefined;
        }, obj);
    }
    static getAllPaths(obj, prefix = '') {
        let paths = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    Object.assign(paths, this.getAllPaths(obj[key], newKey));
                }
                else {
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
        data: "key " + i,
        item: i,
        teste: {
            kest: i % 2 === 0 ? 'Teste ' + i : '',
            id: i % 3 === 0 ? 75 + i : '',
            teste: {
                teste: '°-° teste / ' + i * 3
            }
        },
        date: new Date().toLocaleDateString(),
        oste: i * 2,
        oeste: {
            tot: i * 100,
            long: {
                min: i + (i + 35),
                max: i - (i + 35)
            },
            short: {
                min: "Tecnicamente: " + i % 3,
                max: 'loste ' + (i / 3).toFixed(2)
            }
        }
    });
}
class CreateTableByJson {
    table;
    data;
    headers;
    html_options;
    constructor(data, headers, table) {
        this.data = data;
        this.headers = headers;
        this.html_options = {};
        this.table = table ? table : this.createTable();
    }
    HtmlOptionSet(opt) {
        if (opt) {
            for (const key in opt) {
                this.html_options[key] = opt[key];
            }
        }
        else {
            throw new Error;
        }
    }
    HtmlOptionDelete(opt) {
        if (opt.length > 0) {
            opt.forEach(key => {
                delete this.html_options[key];
            });
        }
    }
    setHtmlAtribute(html, opts) {
        for (const key in opts) {
            html.setAttribute(key, opts[key]);
        }
    }
    createCell(type, inner_text, option) {
        const cell = document.createElement(type);
        if (option) {
            option(cell);
        }
        cell.innerText = inner_text;
        return cell;
    }
    createRow(str, item, thead = false) {
        const tr = document.createElement('tr');
        for (const key in this.headers) {
            if (thead) {
                const cell = this.createCell(str, `${this.headers[key]}`);
                tr.appendChild(cell);
            }
            else {
                const cell = this.createCell(str, `${Helpers.getNestedProperty(item, key)}`);
                tr.appendChild(cell);
            }
        }
        return tr;
    }
    createThead() {
        const thead = document.createElement('thead');
        thead.appendChild(this.createRow('th', this.headers, true));
        return thead;
    }
    createTbody() {
        const tbody = document.createElement('tbody');
        for (let i = 0; i < this.data.length; i++) {
            tbody.appendChild(this.createRow('td', this.data[i]));
        }
        return tbody;
    }
    createTfoot() {
        const tfoot = document.createElement('tfoot');
        tfoot.appendChild(this.createRow('td', this.headers, true));
        return tfoot;
    }
    createTable() {
        const table = document.createElement('table');
        table.appendChild(this.createThead());
        table.appendChild(this.createTbody());
        table.appendChild(this.createTfoot());
        return table;
    }
}
const headers_c1 = Helpers.getAllPaths(data_c1[0]);
const c1 = new CreateTableByJson(data_c1, headers_c1);
document.body.appendChild(c1.table);
