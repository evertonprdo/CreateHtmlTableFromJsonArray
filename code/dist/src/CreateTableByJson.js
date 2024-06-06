import { Utils as Utl } from "../utils/Utils.js";
import { Option as Opt } from "./Option.js";
import { DataObject } from "./DataObject.js";
export var TableByJson;
(function (TableByJson) {
    class Controller {
        data;
        headers;
        renderer;
        constructor(data, headers) {
            this.data = data instanceof DataObject ? data : new DataObject(data);
            this.headers = headers ? headers : Utl.Data.getAllPaths(this.data.records[0]);
            this.renderer = new Renderer(this);
        }
    }
    TableByJson.Controller = Controller;
    class Renderer {
        html_table;
        thead;
        tbody;
        tfoot;
        fragment;
        atr_opts;
        rend_opts;
        constructor(table, html_table) {
            this.fragment = document.createDocumentFragment();
            this.html_table = this.setHtmlTable(html_table);
            this.atr_opts = {};
            this.rend_opts = new Opt.Renderer();
        }
        setHtmlTable(html_table) {
            let query = null;
            let table;
            let thead;
            let tbody;
            let tfoot;
            if (html_table instanceof HTMLTableElement) {
                table = html_table;
                query = table.querySelector('caption');
                const caption = query ? query : null;
                query = table.querySelector('colgroup');
                const colgroup = query ? query : null;
                query = table.querySelector('thead');
                thead = query ? query : document.createElement('thead');
                query = table.querySelector('tbody');
                tbody = query ? query : document.createElement('tbody');
                query = table.querySelector('tfoot');
                tfoot = query ? query : document.createElement('tfoot');
                if (caption || colgroup) {
                    if (caption) {
                        if (colgroup) {
                            table.append(caption, colgroup, thead, tbody, tfoot);
                        }
                        else {
                            table.append(caption, thead, tbody, tfoot);
                        }
                    }
                    else {
                        table.append(colgroup, thead, tbody, tfoot);
                    }
                }
                else {
                    table.append(thead, tbody, tfoot);
                }
            }
            else {
                table = document.createElement('table');
                thead = document.createElement('thead');
                tbody = document.createElement('tbody');
                tfoot = document.createElement('tfoot');
                table.append(thead, tbody, tfoot);
            }
            this.thead = thead;
            this.tbody = tbody;
            this.tfoot = tfoot;
            return table;
        }
        createCell(type, inner_text, option) {
            const cell = document.createElement(type);
            if (option) {
                option(cell);
            }
            cell.innerText = inner_text;
            return cell;
        }
        createRow(str, item, thead = false, headers) {
            const tr = document.createElement('tr');
            for (const key in headers) {
                if (thead) {
                    const cell = this.createCell(str, `${headers[key]}`);
                    tr.appendChild(cell);
                }
                else {
                    const cell = this.createCell(str, `${Utl.Data.getNestedProperty(item, key)}`);
                    tr.appendChild(cell);
                }
            }
            return tr;
        }
        createThead(headers) {
            const thead = document.createElement('thead');
            thead.appendChild(this.createRow('th', headers, true, headers));
            return thead;
        }
        createTbody(headers, data) {
            let limit_rows = Number.parseFloat(this.rend_opts.pagination.limit_rows);
            const tbody = document.createElement('tbody');
            for (let i = 0; i < limit_rows; i++) {
                tbody.appendChild(this.createRow('td', data.records[i], false, headers));
            }
            return tbody;
        }
        createTfoot(headers) {
            const tfoot = document.createElement('tfoot');
            tfoot.appendChild(this.createRow('td', headers, true, headers));
            return tfoot;
        }
        createTable(data, headers) {
            this.html_table.appendChild(this.createThead(headers));
            this.html_table.appendChild(this.createTbody(headers, data));
            this.html_table.appendChild(this.createTfoot(headers));
            return this.html_table;
        }
    }
    TableByJson.Renderer = Renderer;
})(TableByJson || (TableByJson = {}));
