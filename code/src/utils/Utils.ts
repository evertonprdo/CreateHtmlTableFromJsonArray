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
        /**
         * Função para pegar um valor pelo caminho ('path.value') dentro do objeto, funciona para caminhos não aninhados.
         * @param obj um item do array de dados
         * @param path caminho para o valor do item ex: 'categoria.nome'
         * @returns Retorna o valor dentro do objeto.
         */
        static getNestedProperty(obj: object, path: string) {
            const keys = path.split('.');
            return keys.reduce((prev: {[prop: string]: any}, curr: string) => {
                return prev && prev[curr] !== undefined ? prev[curr] : undefined;
            }, obj);
        }

        /**
         * Função que recebe um item do array de dados e horizontaliza as chaves dos objetos.
         * @param obj um item do array de dados.
         * @param is_header o item recebido possui valores do cabeçalho?
         * @param prefix parametro auxiliar para chamada própria
         * @returns Retorna um objeto no formato OptionType, com todas as chaves horizontalizadas.
         */
        static getAllPaths(obj: Type.DataItem, is_header = false, prefix = ''): Type.Option {
            let paths: Type.Option = {};
            
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const new_key = prefix ? `${prefix}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        Object.assign(paths, this.getAllPaths(obj[key], is_header, new_key));
                    } else {
                        paths[new_key] = is_header ? obj[key] : new_key
                    }
                }
            }
            return paths;
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

        static doAllColumnsMatch(data: Type.DataObject, reff: Type.DataItem) {

        }
    }

    export abstract class Html {

    }
}