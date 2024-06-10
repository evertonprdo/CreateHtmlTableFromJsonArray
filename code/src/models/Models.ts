import { Type } from "../utils/Types.js";
import { Utils } from "../utils/Utils.js";

export namespace Models {
    export class DataArray {
        private readonly data_array: Type.JsonArray;
        private readonly data_headers: Type.Headers;

        constructor(data:Type.JsonArray) {
            this.data_array = data;
            let data_headers: Type.Headers = {} as Type.Headers;
            Utils.Data.getKeysFromJsonObject(data[0]).forEach(key => {
                data_headers[key] = {
                    "render": true,
                    "title": key,
                    "format_to": "default",
                }
            });
            this.data_headers = data_headers;
        }

        isHeaderKey(key: string): boolean {
            return key in this.headers;
        }

        switchRender(key:string): void {
            if(!this.isHeaderKey(key)) throw new Error(`"${key}" Not Found`);
            this.headers[key].render = !this.headers[key].render;
        }

        popHeader(key:string): void {
            if(!this.isHeaderKey(key)) throw new Error(`"${key}" Not Found`);
            if(this.headers[key].render === true) this.switchRender(key);
        }

        pushHeader(key:string): void {
            if(!this.isHeaderKey(key)) throw new Error(`"${key}" Not Found`);
            if(this.headers[key].render === false) this.switchRender(key);
        }

        // ---------------------- Getters ---------------------- //

        get array(): Type.JsonArray {
            return this.data_array;
        }
        
        get headers(): Type.Headers {
            return this.data_headers;
        }

        get render_headers(): Type.Headers {
            const render = this.headers;
            Object.keys(this.headers).forEach(key => {
                if(this.headers[key].render === false)
                delete render[key];
            })
            return render;
        }

        get keys(): string[] {
            return Object.keys(this.headers);
        }

        get render_keys(): string[] {
            return Object.keys(this.render_headers);
        }

        get render_titles(): Type.ObjString {
            const result: Type.ObjString = {};
            for(const key in this.render_headers) {
                result[key] = this.render_headers[key].title
            }
            return result
        }

        // ---------------------- Setters ---------------------- //

        setRender(headers: string[]): void {
            for(const key of headers) { if(!this.isHeaderKey(key)) throw new Error(`"${key}" Not Found`); }
            
            this.keys.forEach(key => {
                if(headers.includes(key)) {
                    this.pushHeader(key);
                } else {
                    this.popHeader(key);
                }
            })
        }

        setHeaderTitle(key: string, title: string): void {
            if(!this.isHeaderKey(key)) throw new Error(`"${key}" Not Found`);
            this.headers[key].title = title;
        }

        setTitles(header:string | Type.ObjString, title?: string): void {
            if(typeof header === "object" && header !== null) {
                for(const key in header) {
                    if(!this.isHeaderKey(key)) throw new Error(`"${key}" Not Found`);
                }
                for (const key in header) {
                    this.setHeaderTitle(key, header[key]);
                }
            } else if(typeof header === "string" && title) {
                if(!this.isHeaderKey(header)) throw new Error(`"${header}" Not Found`);
                this.setHeaderTitle(header, title);
            } else {
                throw new Error(`Os titulos não foram definidos para: "${header}", "${title}"`)
            }
        }
    }

    /* temp_backup
    export class DataArray_temp {
        private readonly data_array: Type.JsonArray;
        private readonly data_headers: Type.Headers;

        constructor(data:Type.JsonArray) {
            this.data_array = data;
            let header: Type.Headers = {} as Type.Headers;
            DataArray.getKeysFromJsonObject(data[0]).forEach(key => {
                header[key] = {
                    "render": true,
                    "title": key,
                    "format_to": "default",
                }
            });
            this.data_headers = header;
        }

        static getKeysFromJsonObject(obj: Type.JsonObject, prefix = ''): string[] {
            let paths: string[] = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const new_key = prefix ? `${prefix}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        paths = paths.concat(this.getKeysFromJsonObject(obj[key], new_key));
                    } else {
                        if (Array.isArray(obj[key])) {
                            paths.push(new_key + '[]');
                        } else {
                            paths.push(new_key);
                        }
                    }
                }
            }
            return paths;
        }

        isHeaderKey(key: string): boolean {
            return key in this.headers;
        }

        setHeaderTitle(key: string, title: string): void {
            if(!this.isHeaderKey(key)) throw new Error;
            this.headers[key].title = title;
        }

        setFormatTo(key: string, type: Type.FormatTo) {
            if(!this.isHeaderKey(key)) throw new Error;
            this.headers[key].format_to = type;
        }

        switchRender(key:string): void {
            if(!this.isHeaderKey(key)) throw new Error;
            this.headers[key].render = !this.headers[key].render;
        }

        setRender(headers: string[]): void {
            this.keys.forEach(key => {
                if(headers.includes(key)) {
                    this.headers[key].render = true;
                } else {
                    this.headers[key].render = false;
                }
            })
        }

        getRenderKeys(render = true): string[] {
            const keys: string[] = [];
            Object.keys(this.headers).forEach(key => {
                if(this.headers[key].render === render)
                keys.push(key);
            })
            return keys;
        }

        get data() {
            return this.data_array;
        }

        get keys() {
            return Object.keys(this.data_headers);
        }

        get headers() {
            return this.data_headers;
        }
    }
    */
}