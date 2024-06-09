import { Type } from "../utils/Types.js";

export namespace Models {
    /*
    export class Main {
        private data: DataArray;
        
        constructor(data: Type.JsonArray, headers?: string[] | Type.Headers) {
            this.data = new DataArray(data)
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
    }
*/
    export class DataArray {
        private readonly data_array: Type.JsonArray;
        private readonly data_headers: Type.Headers;

        constructor(data:Type.JsonArray) {
            this.data_array = data;
            let aux:Type.Headers = {} as Type.Headers;
            DataArray.getKeysFromJsonObject(data[0]).forEach(key => {
                aux["render"] = "On";
                aux[key] = key
            });
            this.data_headers = aux;
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
            this.headers[key] = title;
        }

        switchState() {

        }

        removeKey(key:string): void {           
            if(this.del_keys.includes(key)) {
                this.del_keys.push(key);
                this.cur_keys.splice(this.cur_keys.indexOf(key), 1) ;
            }
        }

        appendKey(key: string): void {
            if(this.del_keys.includes(key)) {
                this.cur_keys.push(key);
                delete this.deleted_headers[key];
            }
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

        get del_keys() {
            return this.deleted_keys;
        }

        get cur_keys() {
            return this.current_keys;
        }
    }
}