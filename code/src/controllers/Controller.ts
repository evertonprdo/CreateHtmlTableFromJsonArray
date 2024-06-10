import { Type } from "../utils/Types.js";
import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";
import { Utils } from "../utils/Utils.js";

export namespace Controller {
    export class Main {
        private data: Models.DataArray;
        private render: Render;

        constructor(target: HTMLElement, data: Type.JsonArray, headers?: string[] | Type.ObjString) {
            this.data = new Models.DataArray(data);
            this.render = new Render(target);
            if(headers) {
                if(Array.isArray(headers)) {
                    this.data.setRender(headers);
                } else {
                    this.data.setTitles(headers);
                    this.data.setRender(Object.keys(headers));
                }
            };

            this.startTable();
        }

        startTable() {
            const rows = this.render.composeFormatedStringRows(this.data_class.array, this.data.keys, this.data.headers)
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

    // Controller Data deixa de existir.
    /*
    class Data {
        private data: Models.DataArray;
        
        constructor(data: Type.JsonArray, headers?: string[] | Type.ObjString) {
            this.data = new Models.DataArray(data)
            if(headers) {
                if(Array.isArray(headers)) {
                    this.setHeaders(headers);
                } else {
                    this.setHeaderTitle(headers);
                    this.setHeaders(Object.keys(headers));
                }
            };
        }

        setHeaderTitle(header:string | Type.ObjString, title?: string): void {
            if(typeof header === "object" && header !== null) {
                for(const key in header) { //Garantir a consistência de todas as chaves.
                    if(!this.data.isHeaderKey(key)) throw new Error;
                }
                for (const key in header) {
                    this.data.setHeaderTitle(key, header[key]);
                }
            } else if(typeof header === "string" && title) {
                if(!this.data.isHeaderKey(header)) throw new Error;
                this.data.setHeaderTitle(header, title);
            }
        }
        
        popHeader(key:string) {
            if(!this.data.isHeaderKey(key)) throw new Error;
            if(this.data.headers[key].render === true) this.data.switchRender(key);
        }

        pushHeader(key:string) {
            if(!this.data.isHeaderKey(key)) throw new Error;
            if(this.data.headers[key].render === false) this.data.switchRender(key);
        }

        setHeaders(headers: string[]): void {
            headers.forEach(key => {
                if(!this.data.isHeaderKey(key)) throw new Error;
            })
            this.data.setRender(headers);
        }

        get headers(): Type.Headers {
            return this.data.headers;
        }

        get render_titles(): Type.ObjString {
            const key_title: Type.ObjString = {};
            this.data.getRenderKeys().forEach(key => {
                key_title[key] = this.data.headers[key].title;
            })
            return key_title;
        }

        get data_array(): Type.JsonArray {
            return this.data.data
        }

        get keys(): string[] {
            return this.data.keys
        }

        get render_keys() {
            return this.data.getRenderKeys();
        }

        get class() {
            return this.data;
        }
    }
    */

    //Render Talvez Continue
    class Render {
        private readonly target: HTMLTableElement
        private html_table: Renderer.TableHtml

        constructor(target: HTMLElement) {
            if(target instanceof HTMLTableElement) {
                target.innerText = "";
                this.target = target;
            } else {
                target.innerText = "";
                const table = document.createElement('table');
                target.appendChild(table);
                this.target = table;
            }
            this.html_table = new Renderer.TableHtml();
        }

        renderTable(rows: Type.ObjString[], headers: Type.ObjString) {
            const fragment = this.html_table.startRender(rows, headers);
            this.target.innerText = "";
            this.target.appendChild(fragment);
        }

        tableHead(columns: Type.ObjString) {

        }

        tableBody(rows: Type.ObjString[], columns: string[]) {

        }

        composeFormatedStringRows(data: Type.JsonArray, render_keys: string[], headers: Type.Headers): Type.ObjString[] {
            const result: Type.ObjString[] = [];
            data.forEach(item => {
                const row: Type.ObjString = {}
                render_keys.forEach(column => {
                    let value =  Utils.Data.getNestedProperty(item, column);
                    value = Utils.Format.valueTo(value, headers[column].format_to)
                    row[column] = value;
                    })
                result.push(row);
            })
            return result;
        }

        get html_class() {
            return this.html_table;
        }
    }
}