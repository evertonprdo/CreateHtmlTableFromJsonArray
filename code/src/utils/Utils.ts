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

        static getNestedProperty(obj: Type.JsonObject, path: string) {          
            let result: any;
            let is_array: boolean = false;
            
            if(path.includes(".")) {
                if(path.endsWith('[]')) {
                    path = path.slice(0, -2);
                    is_array = true;
                }
                let keys = path.split(".")
                result = keys.reduce((acc: any, key) => {
                    if(acc && typeof acc === "object" && acc !== null) {
                        return acc[key];
                    }
                }, obj)
            } else {
                if(path.endsWith('[]')) {
                    result = obj[path.slice(0, -2)];
                    is_array = true;
                } else {
                    result =  obj[path];
                }
            }

            if(is_array) {
                result = this.printArrayResume(result);
            }
            return result;
        }

        static resumeString(str: string) {
            const limit = 20;
            if(str.length > limit) {
                str = str.slice(0, limit) + "...";
            }
            return str;
        }

        static printArrayResume(arr: Array<Type.Primitive>) {
            arr = arr.slice(0, 3);
            let result: string = "Arr["+ this.resumeString(String(arr[0]));
            for (let i = 1; i < arr.length; i++) {
                result += ", " + this.resumeString(String(arr[i]))
            }
            if(arr.length >= 3) { result += ", [...]" }
            return result += "]"
        }
    }
}