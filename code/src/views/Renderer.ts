import { Type } from "../utils/Types.js";
import { Utils as Utl } from "../utils/Utils.js";

import { DataObject, Option } from "../models/Models.js";

export namespace Renderer {
    export class HtmlTable {
        private table: HTMLTableElement;
        private thead: HTMLTableSectionElement;
        private tbody: HTMLTableSectionElement;
        private tfoot: HTMLTableSectionElement;
    
        private fragment: DocumentFragment;
        private started = false;
        
        constructor() {
            this.fragment = document.createDocumentFragment();
            
            this.table = document.createElement('table');
            this.thead = document.createElement('thead');
            this.tbody = document.createElement('tbody');
            this.tfoot = document.createElement('tfoot');

            this.table.append(this.thead, this.tbody, this.tfoot);
        }
    
        private createCell(type: "th" | "td", inner_text: string): HTMLTableCellElement {
            const cell = document.createElement(type);
            cell.innerText = inner_text;
            return cell;
        }
    
        private createRow(str: "th" | "td", item: Type.DataItem, headers: Type.Option, nested:boolean = true): HTMLTableRowElement {
            const tr = document.createElement('tr');
            const atb_opt = new Option.Html;
            for (const key in headers) {
                if (!nested) {
                    atb_opt.setOption('data-event-target', key)
                    const cell = this.createCell(str, `${headers[key]}`);
                    const atb = new HtmlAttribute(cell, atb_opt);
                    atb.assignToHtml('data-event-target')
                    tr.appendChild(cell);
                } else {
                    atb_opt.setOption('data-event-target', key)
                    const cell = this.createCell(str, `${Utl.Data.getNestedProperty(item, key)}`);
                    const atb = new HtmlAttribute(cell, atb_opt);
                    atb.assignToHtml('data-event-target') //Certo isso definitivamente está ruim :(
                    tr.appendChild(cell);
                }
            }
            return tr;
        }

        renderTable(data: DataObject, target?: HTMLTableSectionElement): HTMLTableElement {
            if (target && this.started) {
                //this.updateTable(data, target);
                return this.table;
            } else {
                return this.startTable(data);
            }
        }

        private startTable(data: DataObject) : HTMLTableElement {
            this.thead.appendChild(this.createRow("th", data.headers, data.headers, false));
            for (let i = 0; i < 25; i++) {
                this.tbody.appendChild(this.createRow("td", data.records[i], data.headers));
            }
            this.tfoot.appendChild(this.createRow("th", data.headers, data.headers, false));
            this.started = true;
            return this.table;
        }
    }

    abstract class Target {
        private readonly element: HTMLElement
        constructor(target: HTMLElement) {
            this.element = target;
        }

        get target() {
            return this.element;
        }
    }
    /**
     * Classe de definição e atribuição de atributos a elementos HTML
     * @param target
     */
    export class HtmlAttribute extends Target {
        private option: Option.Html

        constructor(target: HTMLElement, option: Option.Html) {
            super(target);
            this.option = option
        }

        assignToHtml(key: string): void {
            this.target.setAttribute(key, this.option.attribute[key])
        }

        removeFromHtml(key: string): void {
            this.target.removeAttribute(key)
        }
    }

}
