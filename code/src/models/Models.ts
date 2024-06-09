import { Type } from "../utils/Types.js";

export namespace Models {
    export class DataArray {
        private readonly data_array: Type.JsonArray;
        private readonly data_headers: Type.Headers;

        constructor(data:Type.JsonArray) {
            this.data_array = data;
            let header: Type.Headers = {} as Type.Headers;
            DataArray.getKeysFromJsonObject(data[0]).forEach(key => {
                header[key] = {
                    "render": true,
                    "title": key
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
            this.headers[key].title = title;
        }

        switchRender(key:string): void {
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
}