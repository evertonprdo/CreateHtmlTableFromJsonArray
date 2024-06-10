import { Models } from "../models/Models.js";
import { Type } from "../utils/Types.js";
import { Utils } from "../utils/Utils.js";

export namespace Renderer {
    export class TableHtml {
        private readonly table: HTMLTableElement;
        private fragment: DocumentFragment;

        constructor() {
            this.fragment = document.createDocumentFragment();
            this.table = document.createElement('table');
        }

        startRender(data: Type.Option[], headers: string[]): DocumentFragment {
            this.table.append(this.createThead(headers));
            this.table.append(this.renderTableBody(data, headers));
            this.fragment.append(this.table);
            //this.renderTfoot();
            return this.fragment;
        }

        private createThead(headers: Type.Option): HTMLTableSectionElement {
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            Object.keys(headers).forEach(key => {
                const th = document.createElement('th');
                th.setAttribute('data-event-tracker', key)
                th.innerText = headers[key];
                tr.appendChild(th);
            })
            thead.addEventListener('click', function(event) {
                if(event.target !== null) {
                    const click: string | undefined = (event.target as HTMLTableCellElement).dataset.eventTracker;
                    console.log(click);
                }
            })
            thead.appendChild(tr);
            return thead;
        };

        renderTableBody(rows: Type.Option[], columns: string[]): HTMLTableSectionElement {
            const tbody = document.createElement('tbody');
            rows.forEach(row => {
                const tr = document.createElement('tr');
                columns.forEach(column => {
                    const td = document.createElement('td');
                    td.innerText = row[column];
                    tr.appendChild(td);
                })
                tbody.appendChild(tr);
            })
            return tbody;
        }

        private renderTfoot(){

        }
    }
}