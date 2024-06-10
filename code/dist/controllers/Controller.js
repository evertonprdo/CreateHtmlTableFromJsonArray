import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";
import { Utils } from "../utils/Utils.js";
export var Controller;
(function (Controller) {
    class Main {
        data;
        render;
        constructor(target, data, headers) {
            this.data = new Models.DataArray(data);
            this.render = new Render(target);
            if (headers) {
                if (Array.isArray(headers)) {
                    this.data.setRender(headers);
                }
                else {
                    this.data.setTitles(headers);
                    this.data.setRender(Object.keys(headers));
                }
            }
            ;
            this.startTable();
        }
        startTable() {
            const rows = this.render.composeFormatedStringRows(this.data_class.array, this.data.keys, this.data.headers);
            this.render.tableBody(rows, this.data.keys);
            this.render.tableHead(this.data.render_titles);
            this.render.renderTable(rows, this.data.render_titles);
        }
        get data_class() {
            return this.data;
        }
        get render_class() {
            return this.render;
        }
    }
    Controller.Main = Main;
    class Render {
        target;
        html_table;
        constructor(target) {
            if (target instanceof HTMLTableElement) {
                target.innerText = "";
                this.target = target;
            }
            else {
                target.innerText = "";
                const table = document.createElement('table');
                target.appendChild(table);
                this.target = table;
            }
            this.html_table = new Renderer.TableHtml();
        }
        renderTable(rows, headers) {
            const fragment = this.html_table.startRender(rows, headers);
            this.target.innerText = "";
            this.target.appendChild(fragment);
        }
        tableHead(columns) {
        }
        tableBody(rows, columns) {
        }
        composeFormatedStringRows(data, render_keys, headers) {
            const result = [];
            data.forEach(item => {
                const row = {};
                render_keys.forEach(column => {
                    let value = Utils.Data.getNestedProperty(item, column);
                    value = Utils.Format.valueTo(value, headers[column].format_to);
                    row[column] = value;
                });
                result.push(row);
            });
            return result;
        }
        get html_class() {
            return this.html_table;
        }
    }
})(Controller || (Controller = {}));
