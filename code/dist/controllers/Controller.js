import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";
export var Controller;
(function (Controller) {
    class Main {
        data;
        render;
        constructor(target, data, headers) {
            this.data = new Data(data, headers);
            this.render = new Render(target);
            this.renderTable();
        }
        renderTable() {
            this.render.renderTable(this.data.data_array, this.data.headers);
        }
    }
    Controller.Main = Main;
    class Data {
        data;
        constructor(data, headers) {
            this.data = new Models.DataArray(data);
            if (headers) {
                if (Array.isArray(headers)) {
                    this.setHeaders(headers);
                }
                else {
                    this.setHeaderTitle(headers);
                    this.setHeaders(Object.keys(headers));
                }
            }
            ;
        }
        setHeaderTitle(header, title) {
            if (typeof header === "object" && header !== null) {
                for (const key in header) {
                    if (!this.data.isHeaderKey(key))
                        throw new Error;
                }
                for (const key in header) {
                    this.data.setHeaderTitle(key, header[key]);
                }
            }
            else if (typeof header === "string" && title) {
                if (!this.data.isHeaderKey(header))
                    throw new Error;
                this.data.setHeaderTitle(header, title);
            }
        }
        popHeader(key) {
            if (!this.data.isHeaderKey(key))
                throw new Error;
            if (this.data.headers[key].render === true)
                this.data.switchRender(key);
        }
        pushHeader(key) {
            if (!this.data.isHeaderKey(key))
                throw new Error;
            if (this.data.headers[key].render === false)
                this.data.switchRender(key);
        }
        setHeaders(headers) {
            headers.forEach(key => {
                if (!this.data.isHeaderKey(key))
                    throw new Error;
            });
            this.data.setRender(headers);
        }
        get headers() {
            const key_title = {};
            this.data.getRenderKeys().forEach(key => {
                key_title[key] = this.data.headers[key].title;
            });
            return key_title;
        }
        get data_array() {
            return this.data.data;
        }
    }
    Controller.Data = Data;
    class Render {
        target;
        html_table;
        constructor(target) {
            target.innerText = "";
            this.html_table = new Renderer.TableHtml();
            this.target = target;
        }
        renderTable(data, headers) {
            const fragment = this.html_table.startRender(data, headers);
            this.target.innerText = "";
            this.target.appendChild(fragment);
        }
    }
    Controller.Render = Render;
})(Controller || (Controller = {}));
