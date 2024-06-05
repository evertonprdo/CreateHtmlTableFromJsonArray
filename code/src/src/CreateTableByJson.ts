import { Type } from "../utils/Types.js";
import { Utils as Utl } from "../utils/Utils.js";

import { DataObject } from "./DataObject.js";

export class CreateTableByJson {
    table: HTMLTableElement;
    data: DataObject;
    headers: Type.Option;
    html_options: Type.Option;
    
    constructor(data: DataObject | Type.DataObject, headers: Type.Option, table?: HTMLTableElement) {
        this.data = data instanceof DataObject ? data : new DataObject(data);
        this.headers = headers;
        this.html_options = {} as Type.Option;
        this.table = table ? table : this.createTable();
    }

    HtmlOptionSet(opt: Type.Option): void {
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

    createCell(type: "th" | "td", inner_text: string, option?: (cell: HTMLTableCellElement) => void): HTMLTableCellElement {
        const cell = document.createElement(type);
        if (option) {
            option(cell);
        }
        cell.innerText = inner_text;
        return cell;
    }

    createRow(str: "th" | "td", item: Type.Option, thead:boolean = false): HTMLTableRowElement {
        const tr = document.createElement('tr');
        for (const key in this.headers) {
            if (thead) {
                const cell = this.createCell(str, `${this.headers[key]}`);
                tr.appendChild(cell);
            } else {
                const cell = this.createCell(str, `${Utl.Data.getNestedProperty(item, key)}`);
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
        for (let i = 0; i < this.data.records.length; i++) {
            tbody.appendChild(this.createRow('td', this.data.records[i]))
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

namespace TableByJson {
    class Table {
        table: Table
        thead: Thead
        tbody: Tbody
        tfoot: Tfoot
        atr_opt: Option.HtmlAttribute
    }

    abstract class TSection {
        html_table_section: HTMLTableSectionElement;
        atr_opt: Option.HtmlAttribute[];
        tr: HtmlTr[]
    }

    class Thead extends TSection {

        
    }

    class Tbody extends TSection {


    }

    class Tfoot extends TSection {


    }

    class Tr {
        cells: HtmlCell[]
    }

    class Cell {

    }
}

export namespace Option {
    export class HtmlAttribute {
        private readonly element: HTMLElement
        private option: Type.Option

        constructor(target: HTMLElement, option: Type.Option) {
            this.element = target;
            this.option = option
        }

        private assignToHtml(key: string): void {
            this.element.setAttribute(key, this.option[key])
        }

        private removeFromHtml(key: string): void {
            this.element.removeAttribute(key)
        }

        public setOption(key: string, value: string): void {
            this.option[key] = value;
            this.assignToHtml(key);
        }

        public removeOption(key: string) : void {
            delete this.option[key];
            this.removeFromHtml(key);
        }

        public clearOptions(): void {
            Object.keys(this.option).forEach(key => {
                this.removeOption(key);
            });
        }

        get target() {
            return this.element;
        }

        get options() {
            return this.option
        }
    }
}