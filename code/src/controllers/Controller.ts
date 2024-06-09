import { Type } from "../utils/Types.js";
import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";

export namespace Controller {
    export class Main {
        data: Data;
        render: Render;

        constructor(target: HTMLElement, data: Type.JsonArray, headers?: string[] | Type.Option) {
            this.data = new Data(data, headers);
            this.render = new Render(target);
            this.renderTable();
        }

        renderTable() {
            this.render.renderTable(this.data.data_array, this.data.headers);
        }
    }

    export class Data {
        private data: Models.DataArray;
        
        constructor(data: Type.JsonArray, headers?: string[] | Type.Option) {
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

        setHeaderTitle(header:string | Type.Option, title?: string): void {
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

        get headers() {
            const key_title: Type.Option = {};
            this.data.getRenderKeys().forEach(key => {
                key_title[key] = this.data.headers[key].title;
            })
            return key_title;
        }

        get data_array() {
            return this.data.data
        }
    }

    export class Render {
        private readonly target: HTMLElement
        private html_table: Renderer.TableHtml

        constructor(target: HTMLElement) {
            target.innerText = "";
            this.html_table = new Renderer.TableHtml();
            this.target = target;
        }

        renderTable(data: Type.JsonArray, headers: Type.Option) {
            const fragment = this.html_table.startRender(data, headers);
            this.target.innerText = "";
            this.target.appendChild(fragment);
        }

    }
}