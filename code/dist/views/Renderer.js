export var Renderer;
(function (Renderer) {
    class TableHtml {
        html_thead;
        html_tbody;
        fragment;
        constructor() {
            this.fragment = document.createDocumentFragment();
            this.html_thead = document.createElement('thead');
            this.html_tbody = document.createElement('tbody');
        }
        startRender(data, headers) {
            this.createThead(headers);
            this.createTableBody(data, Object.keys(headers));
            this.fragment.append(this.thead, this.tbody);
            return this.fragment;
        }
        createThead(headers) {
            const tr = document.createElement('tr');
            Object.keys(headers).forEach(key => {
                const th = document.createElement('th');
                th.setAttribute('data-event-tracker', key);
                th.innerText = headers[key];
                tr.appendChild(th);
            });
            this.thead.addEventListener('click', function (event) {
                if (event.target !== null) {
                    const click = event.target.dataset.eventTracker;
                    console.log(click);
                }
            });
            this.thead.appendChild(tr);
            return this.thead;
        }
        ;
        createTableBody(rows, columns) {
            rows.forEach(row => {
                const tr = document.createElement('tr');
                columns.forEach(column => {
                    const td = document.createElement('td');
                    td.innerText = row[column];
                    tr.appendChild(td);
                });
                this.tbody.appendChild(tr);
            });
            return this.tbody;
        }
        get thead() {
            return this.html_thead;
        }
        get tbody() {
            return this.html_tbody;
        }
    }
    Renderer.TableHtml = TableHtml;
})(Renderer || (Renderer = {}));
