import { Type } from "../utils/Types.js";

export namespace Models {
    export class Main {
        private data: DataArray;
        
        constructor(data: Type.JsonArray, headers?: string[] | Type.Headers) {
            this.data = new DataArray(data)
            this.data.setDataHeaders(data, headers);
        }
    }

    class DataArray {
        private data: Type.JsonArray;
        private headers: Type.Headers = {};

        constructor(data:Type.JsonArray) {
            this.data = data;
        }

        static getHeadersFromJsonArray(data: Type.JsonObject, prefix = ''): Type.Headers {
            const obj:Type.JsonObject = data[0] as Type.JsonObject;
            let paths: Type.Headers = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const new_key = prefix ? `${prefix}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        Object.assign(paths, this.getHeadersFromJsonArray(obj[key], new_key));
                    } else {
                        paths[new_key] = new_key;
                    }
                }
            }
            return paths;
        }

        setDataHeaders(data: Type.JsonArray, headers: string[] | Type.Headers | undefined): Type.Headers {
            let result: Type.Headers = {};
            if(headers) {
                if(headers instanceof Array) {
                    headers.forEach(key => {
                        result[key] = key;
                    })
                }
            } else {
                result = DataArray.getHeadersFromJsonArray(data);
            }
            this.headers = result;
            return result;
        }
    }
}