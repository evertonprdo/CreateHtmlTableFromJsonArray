import { Utils } from "../CreateTableFromJsonArray.js";
import { Type } from "../utils/Types.js";

export namespace Renderer {
    export class TableHtml extends EventTarget {
        private readonly html_table: HTMLTableElement;
        private readonly html_thead: HTMLTableSectionElement;
        private readonly html_tbody: HTMLTableSectionElement;
        //private readonly html_tfoot: HTMLTableSectionElement;
        
        private fragment: DocumentFragment;

        constructor(target: HTMLElement) {
            super();
            this.fragment = document.createDocumentFragment();
            this.html_thead = document.createElement('thead');
            this.html_tbody = document.createElement('tbody');
            //this.html_tfoot = document.createElement('tfoot');

            if(target instanceof HTMLTableElement) {
                target.innerText = "";
                this.html_table = target;
            } else {
                target.innerText = "";
                const table = document.createElement('table');
                target.appendChild(table);
                this.html_table = table;
            }
        }

        init(data: Type.JsonArray, headers: Type.Indexable.String): void {
            this.createThead(headers);
            //this.createTfoot(footers);
            this.createTableBody(data, Object.keys(headers));
            this.html_table.append(this.thead, this.tbody);
        }

        refreshBody(rows: Type.JsonArray, columns: string[]) {
            this.tbody.innerText = '';
            this.createTableBody(rows, columns)
        }

        private createThead(headers: Type.Indexable.String): HTMLTableSectionElement {
            const tr = document.createElement('tr');
            Object.keys(headers).forEach(key => {
                const th = document.createElement('th');
                th.setAttribute('data-event-tracker', key)
                th.innerText = headers[key];
                tr.appendChild(th);
            })
            this.thead.addEventListener('click', (event) => {
                if(event.target !== null) {
                    const column_key: string | undefined = (event.target as HTMLTableCellElement).dataset.eventTracker;
                    this.dispatchEvent(new CustomEvent('headerClick', { detail: column_key }))
                }
            })
            this.thead.appendChild(tr);
            return this.thead;
        };

        createTableBody(rows: Type.JsonArray, columns: string[]): HTMLTableSectionElement {  
            rows.forEach(row => {
                const tr = document.createElement('tr');
                columns.forEach(column => {
                    const td = document.createElement('td');  
                    td.innerText = String(Utils.Data.getNestedProperty(row, column));
                    tr.appendChild(td);
                })
                this.tbody.appendChild(tr);
            })
            return this.tbody;
        }

        get thead() {
            return this.html_thead;
        }
        get tbody() {
            return this.html_tbody;
        }
        get table() {
            return this.html_table;
        }
    }
}