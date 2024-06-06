import { Utils as Utl } from "../utils/Utils.js";
import { Option } from "../models/Models.js";
export var Renderer;
(function (Renderer) {
    class HtmlTable {
        table;
        thead;
        tbody;
        tfoot;
        fragment;
        started = false;
        constructor() {
            this.fragment = document.createDocumentFragment();
            this.table = document.createElement('table');
            this.thead = document.createElement('thead');
            this.tbody = document.createElement('tbody');
            this.tfoot = document.createElement('tfoot');
            this.table.append(this.thead, this.tbody, this.tfoot);
        }
        createCell(type, inner_text) {
            const cell = document.createElement(type);
            cell.innerText = inner_text;
            return cell;
        }
        createRow(str, item, headers, nested = true) {
            const tr = document.createElement('tr');
            const atb_opt = new Option.Html;
            for (const key in headers) {
                if (!nested) {
                    atb_opt.setOption('data-event-target', key);
                    const cell = this.createCell(str, `${headers[key]}`);
                    const atb = new HtmlAttribute(cell, atb_opt);
                    atb.assignToHtml('data-event-target');
                    tr.appendChild(cell);
                }
                else {
                    atb_opt.setOption('data-event-target', key);
                    const cell = this.createCell(str, `${Utl.Data.getNestedProperty(item, key)}`);
                    const atb = new HtmlAttribute(cell, atb_opt);
                    atb.assignToHtml('data-event-target');
                    tr.appendChild(cell);
                }
            }
            return tr;
        }
        renderTable(data, target) {
            if (target && this.started) {
                return this.table;
            }
            else {
                return this.startTable(data);
            }
        }
        startTable(data) {
            this.thead.appendChild(this.createRow("th", data.headers, data.headers, false));
            for (let i = 0; i < 25; i++) {
                this.tbody.appendChild(this.createRow("td", data.records[i], data.headers));
            }
            this.tfoot.appendChild(this.createRow("th", data.headers, data.headers, false));
            this.started = true;
            return this.table;
        }
    }
    Renderer.HtmlTable = HtmlTable;
    class Target {
        element;
        constructor(target) {
            this.element = target;
        }
        get target() {
            return this.element;
        }
    }
    class HtmlAttribute extends Target {
        option;
        constructor(target, option) {
            super(target);
            this.option = option;
        }
        assignToHtml(key) {
            this.target.setAttribute(key, this.option.attribute[key]);
        }
        removeFromHtml(key) {
            this.target.removeAttribute(key);
        }
    }
    Renderer.HtmlAttribute = HtmlAttribute;
})(Renderer || (Renderer = {}));
