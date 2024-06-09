import { Type } from "../utils/Types.js";
import { Models } from "../models/Models.js";

export namespace Controller {
    export class DataArray {
        private data: Models.DataArray;
        
        constructor(data: Type.JsonArray, headers?: string[] | Type.Headers) {
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

        setHeaderTitle(header:string | Type.Headers, title?: string): void {
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
            return this.data.removeHeader(key);
        }

        pushHeader(key:string) {
            if(!this.data.isHeaderKey(key)) throw new Error;
            return this.data.bringHeaderBack(key);
        }

        setHeaders(set_headers: string[]) {
            set_headers.forEach(key => {
                if(!this.data.isHeaderKey(key)) throw new Error;
            })

            this.data.keys.forEach(key => {
                if(set_headers.includes(key)) {
                    if((key in this.data.deleted_headers)) {
                        this.data.bringHeaderBack(key);
                    }
                } else if (key in this.data.headers) {
                    this.data.removeHeader(key);
                }
            })
        }

        get keys() {
            return this.data.keys;
        }

        get del_headers() {
            return this.data.deleted_headers;
        }

        get cur_headers() {
            return this.data.headers;
        }

        get headers() {
            return Object.assign(this.data.headers, this.data.deleted_headers);
        }
    }
}