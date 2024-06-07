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
        static getValueByPath(obj: Type.JsonObject, path: string) {
            const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
            let value: Type.JsonObject = obj;
            for (const key of keys) {
                value = value[key];
                if (value === undefined) {
                    return null;
                }
            }
            return value;
        }

        static getAllPaths(obj: Type.JsonObject, currentPath = '') {
            let paths: string[] = [];
            
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newPath = currentPath ? `${currentPath}.${key}` : key;
                    
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        paths = paths.concat(this.getAllPaths(obj[key], newPath));
                    } else if (Array.isArray(obj[key])) {
                        obj[key].forEach((item, index) => {
                            if (typeof item === 'object' && item !== null) {
                                paths = paths.concat(this.getAllPaths(item, `${newPath}[${index}]`));
                            } else {
                                paths.push(`${newPath}[${index}]`);
                            }
                        });
                    } else {
                        paths.push(newPath);
                    }
                }
            }
            
            return paths;
        }

        static getMaxArrayLength(jsonArray: Type.JsonObject[]) {
            let max = 1;
        
            jsonArray.forEach(obj => {
                function findMaxLength(obj: Type.JsonObject[]) {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (Array.isArray(obj[key])) {
                                max = Math.max(max, obj[key].length);
                                obj[key].forEach(item => {
                                    if (typeof item === 'object' && item !== null) {
                                        findMaxLength(item);
                                    }
                                });
                            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                                findMaxLength(obj[key]);
                            }
                        }
                    }
                }
                
                findMaxLength(obj);
            });
        
            return max;
        }

        /**
         * Função para transformar um HTMLTableElement em um DataObjectType
         * @param html_query string para querySelector de table.
         * @alert - Tabelas com colgroup ou colspan pode obter resultados inconsistentes;
         * @alert - Headers repetidos receberam um sufixo.
         */
        static makeMyOwnDomTableDataObject(html_query:string): Type.DataObject {
            const my_table = document.querySelector(html_query);
            if(!(my_table instanceof HTMLTableElement)) throw new Error(`"${html_query}" não é um HTMLTableElement`);

            const ths: NodeList = my_table.querySelectorAll('thead th, thead td');
            const trs: NodeList = my_table.querySelectorAll('tbody tr');
            
            if (ths.length === 0 && trs.length === 0) throw new Error(`Nenhuma tr, th ou td econtrada em "${html_query}"`)

            function pushKeys(ths: NodeList): string[] {
                const keys: string[] = [];
                let sufix = 1;
                ths.forEach(th => {               
                    let x = Common.stringToSlug((th as HTMLTableCellElement).innerText, true);
                    if (keys.includes(x)) {
                        x += '-d-' + sufix;
                        sufix++;
                    }
                    keys.push(x);
                })
                return keys;
            }
            const has_ths: boolean = ths.length > 0 ? true : false;
            
            const result: Type.DataObject = []
            let arr_key: string[] = [];

            if (has_ths) {
                arr_key = arr_key.concat(arr_key, pushKeys(ths))
            } else {
                let body_ths: NodeList | null = null;
                let count = 0;
                for (let i = 0; i < trs.length; i++) {
                    let tr: HTMLTableRowElement = trs[i] as HTMLTableRowElement;
                    let l_ths = tr.querySelectorAll('td, th');
                    if(l_ths.length > count){
                        count = l_ths.length;
                        body_ths = l_ths;
                    }
                }
                if (body_ths === null || body_ths.length === 0) throw new Error(`Nenhuma th ou td econtrada em "${html_query}"`)
                arr_key = arr_key.concat(arr_key, pushKeys(body_ths))
            }

            if (trs.length > 0) {            
                trs.forEach(tr => {
                    const item: Type.DataItem = {};
                    const body_tds = (tr as HTMLTableRowElement).querySelectorAll('td, th')
                    for (let i = 0; i < arr_key.length; i++) {
                        if (body_tds[i]) {
                            let inner_text = (body_tds[i] as HTMLTableCellElement).innerText;
                            if (inner_text) {
                                item[arr_key[i]] = inner_text;
                            } else {
                                item[arr_key[i]] = (body_tds[i] as HTMLTableCellElement).innerHTML;
                            }
                        } else {
                            item[arr_key[i]] = null;
                        }
                    }
                    result.push(item);
                })
            }
            return result;
        }
    }
}