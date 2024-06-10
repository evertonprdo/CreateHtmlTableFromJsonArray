import { Type } from "../utils/Types.js";

export namespace Renderer {
    export class TableHtml {
        private readonly html_thead: HTMLTableSectionElement;
        private readonly html_tbody: HTMLTableSectionElement;
        
        private fragment: DocumentFragment;

        constructor() {
            this.fragment = document.createDocumentFragment();
            this.html_thead = document.createElement('thead');
            this.html_tbody = document.createElement('tbody');
        }

        startRender(data: Type.ObjString[], headers: Type.ObjString): DocumentFragment {
            this.createThead(headers);
            this.createTableBody(data, Object.keys(headers));
            this.fragment.append(this.thead, this.tbody);
            return this.fragment;
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