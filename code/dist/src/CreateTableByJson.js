import { Utils as Utl } from "../utils/Utils.js";
import { DataObject } from "./DataObject.js";
export class CreateTableByJson {
    table;
    data;
    headers;
    html_options;
    constructor(data, headers, table) {
        this.data = data instanceof DataObject ? data : new DataObject(data);
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
                const cell = this.createCell(str, `${Utl.Data.getNestedProperty(item, key)}`);
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
        for (let i = 0; i < this.data.records.length; i++) {
            tbody.appendChild(this.createRow('td', this.data.records[i]));
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
var TableByJson;
(function (TableByJson) {
    class Table {
        table;
        thead;
        tbody;
        tfoot;
        atr_opt;
    }
    class TSection {
        html_table_section;
        atr_opt;
        tr;
    }
    class Thead extends TSection {
    }
    class Tbody extends TSection {
    }
    class Tfoot extends TSection {
    }
    class Tr {
        cells;
    }
    class Cell {
    }
})(TableByJson || (TableByJson = {}));
export var Option;
(function (Option) {
    class HtmlAttribute {
        element;
        option;
        constructor(target, option) {
            this.element = target;
            this.option = option;
        }
        assignToHtml(key) {
            this.element.setAttribute(key, this.option[key]);
        }
        removeFromHtml(key) {
            this.element.removeAttribute(key);
        }
        setOption(key, value) {
            this.option[key] = value;
            this.assignToHtml(key);
        }
        removeOption(key) {
            delete this.option[key];
            this.removeFromHtml(key);
        }
        clearOptions() {
            Object.keys(this.option).forEach(key => {
                this.removeOption(key);
            });
        }
        get target() {
            return this.element;
        }
        get options() {
            return this.option;
        }
    }
    Option.HtmlAttribute = HtmlAttribute;
})(Option || (Option = {}));
