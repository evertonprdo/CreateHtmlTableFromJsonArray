import { Resume } from "../config/Config.js";
import { Type } from "./Types.js";

export namespace Utils {
    export abstract class Common {
        static stringToSlug(texto:string, keep_dot:boolean = false): string {
            let result = texto.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove caracteres diacríticos
                .toLowerCase() // Converte para minúsculas
                .replace(/\s+/g, '-') // Substitui espaços em branco por traços
                .replace(/[^\w\s.-]/g, '') // Remove caracteres não alfanuméricos, exceto pontos e traços
                .replace(/--+/g, '-') // Substitui múltiplos traços consecutivos por um único traço
                .replace(/^-+|-+$/g, ''); // Remove traços do início e do final
            if(!keep_dot) result = result.replace(/\./g, '');
            return result;
        }
    }

    export abstract class Data {
        static getNestedProperty(obj: Type.JsonObject, path: string) {          
            let result: Type.Primitive | Array<Type.JsonObject | Type.Primitive>;
            
            if(path.includes(".")) {
                if(path.endsWith('[]')) {
                    path = path.slice(0, -2);
                }
                let keys = path.split(".")
                result = keys.reduce((acc: any, key) => {
                    if(acc && typeof acc === "object" && acc !== null) {
                        return acc[key];
                    }
                }, obj)
            } else {
                if(path.endsWith('[]')) {
                    result = (obj[path.slice(0, -2)] as Array<Type.Primitive | Type.JsonObject>);
                } else {
                    result =  (obj[path] as Type.Primitive);
                }
            }
            return result;
        }

        static getKeysFromJsonObject(obj: Type.JsonObject, prefix = ''): string[] {
            let paths: string[] = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const new_key = prefix ? `${prefix}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        paths = paths.concat(this.getKeysFromJsonObject((obj[key] as Type.JsonObject), new_key));
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
    }

    export abstract class Format {
        static resumeString(str: string, limit:number = Resume.content_limit) {
            if(str.length > limit) {
                str = str.slice(0, limit - 3) + "...";
            }
            return str;
        }

        static valueTo(value: unknown, type: Type.FormatTo): string {
            let result: Type.Primitive | object;
            switch (type) {               
                case "FLOAT_FIX":
                    result = String(Utils.Format.valueToFloat(value));
                    break;
                case "DATE":
                    result = new Date(String(value)).toLocaleString();
                    break;
                case "CURRENCY":
                    result = "R$ " + Utils.Format.valueToFloat(value, 2).toLocaleString();
                    break;
                case "PERCENT":
                    result = String(Utils.Format.valueToFloat(value, 1))+"%";
                    break;
                default:
                    result = Utils.Format.valueToString(value);
                    break;
            }
            return result
        }

        static resumeArrayContent(
            arr: Array<Type.Primitive>, 
            limit = Resume.content_limit, 
            inner_resume_on = Resume.arr_resume_inner, 
            slice_array = Resume.arr_slice
        ): string {
            
            let size: number = arr.length
            if(size === 0) return "(0)Arr[]";
            
            let head: string = `(${size})Arr[`;
            let end: string = size > slice_array ? ", [...]]" : "]";
            
            arr = arr.slice(0, slice_array);
            let inner_limit = Math.round((limit - (((arr.length -1) * 2) + head.length + end.length)) / arr.length) ;
            inner_limit = inner_limit < 3 ? 3: inner_limit;
            
            let body: string;
            if(typeof arr[0] === "object" && arr[0] !== null) {
                body = "{...}";
            } else {
                if(inner_resume_on) {
                    body = this.resumeString(String(arr[0]), inner_limit)
                } else {
                    body = String(arr[0])
                }
            }
            for (let i = 1; i < arr.length; i++) {
                if(typeof arr[i] === "object" && arr[i] !== null) {
                    body += ", {...}"
                } else {
                    if(inner_resume_on) {
                        body += ", " + this.resumeString(String(arr[i]), inner_limit)
                    } else {
                        body += ", " + String(arr[i])
                    }
                }
            }
            return head + body + end
        }

        static valueToString(value: unknown): string {
            if (value === undefined) { return "not found" }
            if (value === null) { return "null" }
            if (value === "") { return "empty" }
            if (Array.isArray(value)) { return Utils.Format.resumeArrayContent(value) }
            return Utils.Format.resumeString(String(value));
        }

        static valueToFloat(value: unknown, fix: number = Resume.float_fix): number {
            if(typeof value === "number") { return parseFloat(value.toFixed(fix)) }
            return Number(parseFloat(String(value)).toFixed(fix));
        }
    }
}