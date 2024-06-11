import { Type } from "../utils/Types.js";
import { Utils } from "../utils/Utils.js";

export namespace Models {
    export class JsonArray {
        private readonly data_json_array: Type.JsonArray;
        private readonly headers_json_array: Type.Headers;

        constructor(data:Type.JsonArray) {
            this.data_json_array = data;
            let headers: Type.Headers = {} as Type.Headers;
            Utils.Data.getKeysFromJsonObject(data[0]).forEach(key => {
                headers[key] = {
                    "render": true,
                    "title": key,
                    "format_to": "default",
                }
            });
            this.headers_json_array = headers;
        }

        isHeaderKey(key: string): boolean {
            return key in this.headers;
        }

        switchRender(key:string): void {
            if(!this.isHeaderKey(key)) this.keyNotFound(key);
            this.headers[key].render = !this.headers[key].render;
        }

        popHeader(key:string): void {
            if(!this.isHeaderKey(key)) this.keyNotFound(key);
            if(this.headers[key].render === true) this.switchRender(key);
        }

        pushHeader(key:string): void {
            if(!this.isHeaderKey(key)) this.keyNotFound(key);
            if(this.headers[key].render === false) this.switchRender(key);
        }

        // ---------------------- Getters ---------------------- //

        get array(): Type.JsonArray {
            return this.data_json_array;
        }
        
        get headers(): Type.Headers {
            return this.headers_json_array;
        }

        get render_headers(): Type.Headers {
            const render: Type.Headers = {};
            Object.keys(this.headers).forEach(key => {
                if(this.headers[key].render === true)
                render[key] = this.headers[key];
            })
            return render;
        }

        get keys(): string[] {
            return Object.keys(this.headers);
        }

        get render_keys(): string[] {
            return Object.keys(this.render_headers);
        }

        get titles(): Type.ObjString {
            const result: Type.ObjString = {};
            for(const key in this.headers) {
                result[key] = this.headers[key].title
            }
            return result
        }

        get render_titles(): Type.ObjString {
            const result: Type.ObjString = {};
            for(const key in this.render_headers) {
                result[key] = this.headers[key].title
            }
            return result
        }

        get format(): Type.ObjString {
            const result: Type.ObjString = {}
            this.keys.forEach(key => {
                result[key] = this.headers[key].format_to;
            })
            return result
        }

        get render_format(): Type.ObjString {
            const result: Type.ObjString = {};
            for(const key in this.render_headers) {
                result[key] = this.headers[key].format_to
            }
            return result
        }

        // ---------------------- Setters ---------------------- //

        setHeaderRender(headers: string[]): void {
            for(const key of headers) { if(!this.isHeaderKey(key)) this.keyNotFound(key); }
            this.keys.forEach(key => {
                if(headers.includes(key)) {
                    this.pushHeader(key);
                } else {
                    this.popHeader(key);
                }
            })
        }

        private setHeaderTitleProperty(key: string, title: string): void {
            if(!this.isHeaderKey(key)) this.keyNotFound(key)
            this.headers[key].title = title;
        }

        setHeaderTitle(header:string | Type.ObjString, title?: string): void {
            if(typeof header === "object" && header !== null) {
                for(const key in header) {
                    if(!this.isHeaderKey(key)) this.keyNotFound(key);
                }
                for (const key in header) {
                    this.setHeaderTitleProperty(key, header[key]);
                }
            } else if(typeof header === "string" && title) {
                if(!this.isHeaderKey(header)) this.keyNotFound(header);
                this.setHeaderTitleProperty(header, title);
            } else {
                throw new Error(`Os titulos não foram definidos para: "${header}", "${title}"`)
            }
        }

        private setHeaderFormatToProperty(key:string, type: Type.FormatTo): void {
            if(!this.isHeaderKey(key)) this.keyNotFound(key);
            this.headers[key].format_to = type;
        }

        setFormatTo(header:string | {[prop:string]: Type.FormatTo}, type?: Type.FormatTo): void {
            if(typeof header === "object" && header !== null) {
                for(const key in header) {
                    if(!this.isHeaderKey(key)) this.keyNotFound(key);
                }
                for (const key in header) {
                    this.setHeaderFormatToProperty(key, header[key]);
                }
            } else if(typeof header === "string" && type) {
                if(!this.isHeaderKey(header)) this.keyNotFound(header);
                this.setHeaderFormatToProperty(header, type);
            } else {
                throw new Error(`formatTo não foram definidos para: "${header}", "${type}"`)
            }
        }

        // ---------------------- Message ---------------------- //

        private keyNotFound(key:string) {
            throw new Error(`"${key}" Not Found`)
        }
    }

    export class Compose {
        private formatCellToString(value: unknown, type?: Type.FormatTo): string  {
            if(type) {
                return Utils.Format.valueTo(value, type);
            } else {
                return Utils.Format.valueToString(value)
            }
        }

        private formatRowToString(row: Type.JsonObject, headers: Type.Headers, format_to = true): Type.ObjString  {
            const result: Type.ObjString = {};
            for(const key in headers) {
                if(format_to) {
                    result[key] = this.formatCellToString(Utils.Data.getNestedProperty(row, key), headers[key].format_to)
                } else {
                    result[key] = this.formatCellToString(Utils.Data.getNestedProperty(row, key))
                }
            }
            return result
        }

        tableBody(rows: Type.JsonArray, headers: Type.Headers): Type.ObjString[] {
            const result: Type.ObjString[] = [];
            for (let i = 0; i < rows.length; i++) {
                result[i] = this.formatRowToString(rows[i], headers);
            }
            return result
        }

        tableHead(titles: Type.ObjString, headers: Type.Headers): Type.ObjString {
            return this.formatRowToString(titles, headers, false)
        }
    }
}