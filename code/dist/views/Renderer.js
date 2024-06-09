import { Utils } from "../utils/Utils.js";
export var Renderer;
(function (Renderer) {
    class TableHtml {
        table;
        fragment;
        constructor() {
            this.fragment = document.createDocumentFragment();
            this.table = document.createElement('table');
        }
        startRender(data, headers) {
            this.table.append(this.createThead(headers));
            this.table.append(this.renderTbody(data, headers));
            this.fragment.append(this.table);
            return this.fragment;
        }
        createThead(headers) {
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            Object.keys(headers).forEach(key => {
                const th = document.createElement('th');
                th.setAttribute('data-event-tracker', key);
                th.innerText = headers[key];
                tr.appendChild(th);
            });
            thead.addEventListener('click', function (event) {
                if (event.target !== null) {
                    const click = event.target.dataset.eventTracker;
                    console.log(click);
                }
            });
            thead.appendChild(tr);
            return thead;
        }
        ;
        renderTbody(data, headers) {
            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                Object.keys(headers).forEach(key => {
                    const td = document.createElement('td');
                    td.innerText = Utils.Common.getNestedProperty(row, key);
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            return tbody;
        }
        renderTfoot() {
        }
    }
    Renderer.TableHtml = TableHtml;
})(Renderer || (Renderer = {}));
