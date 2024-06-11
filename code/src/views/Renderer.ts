import { Type } from "../utils/Types.js";

export namespace Renderer {
    export class TableHtml {
        private readonly html_table: HTMLTableElement;
        private readonly html_thead: HTMLTableSectionElement;
        private readonly html_tbody: HTMLTableSectionElement;
        
        private fragment: DocumentFragment;

        constructor(target: HTMLElement) {
            this.fragment = document.createDocumentFragment();
            this.html_thead = document.createElement('thead');
            this.html_tbody = document.createElement('tbody');

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

        startRender(data: Type.ObjString[], headers: Type.ObjString): void {
            this.createThead(headers);
            this.createTableBody(data, Object.keys(headers));
            this.fragment.append(this.thead, this.tbody);
            this.html_table.appendChild(this.fragment);
        }

        private createThead(headers: Type.ObjString): HTMLTableSectionElement {
            const tr = document.createElement('tr');
            Object.keys(headers).forEach(key => {
                const th = document.createElement('th');
                th.setAttribute('data-event-tracker', key)
                th.innerText = headers[key];
                tr.appendChild(th);
            })
            this.thead.addEventListener('click', function(event) {
                if(event.target !== null) {
                    const click: string | undefined = (event.target as HTMLTableCellElement).dataset.eventTracker;
                    console.log(click);
                }
            })
            this.thead.appendChild(tr);
            return this.thead;
        };

        createTableBody(rows: Type.ObjString[], columns: string[]): HTMLTableSectionElement {
            rows.forEach(row => {
                const tr = document.createElement('tr');
                columns.forEach(column => {
                    const td = document.createElement('td');
                    td.innerText = row[column];
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
    }
}