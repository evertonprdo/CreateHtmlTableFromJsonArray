import { Type } from "./Types.js";

export namespace Utils {
    const content_limit = 50;
    const arr_slice = 2;
    const arr_resume_inner = true;

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
    }

    export abstract class Format {
        static resumeString(str: string, limit:number = content_limit) {
            if(str.length > limit) {
                str = str.slice(0, limit - 3) + "...";
            }
            return str;
        }

        static resumeArrayContent(arr: Array<Type.Primitive>) {
            let size: number = arr.length
            if(size === 0) return "(0)Arr[]";
            arr = arr.slice(0, arr_slice);

            let inner_limit = (Math.round(content_limit / arr.length) - 9);
            inner_limit = inner_limit < 3 ? 3: inner_limit;

            let head: string = `(${size})Arr[`;
            let body: string;
            let end: string;
            if(size > arr_slice) { end = ", [...]" } else { end = "]" }

            if(typeof arr[0] === "object" && arr[0] !== null) {
                body = "{...}";
            } else {
                if(arr_resume_inner) {
                    body = this.resumeString(String(arr[0]), inner_limit)
                } else {
                    body = String(arr[0])
                }
            }
            
            for (let i = 1; i < arr.length; i++) {
                if(typeof arr[i] === "object" && arr[i] !== null) {
                    head += ", {...}"
                } else {
                    if(arr_resume_inner) {
                        head += ", " + this.resumeString(String(arr[i]), inner_limit)
                    } else {
                        head += ", " + String(arr[i])
                    }
                }
            }
            if(size > arr_slice) { head += ", [...]" }
            return head += "]"
        }
    }
}