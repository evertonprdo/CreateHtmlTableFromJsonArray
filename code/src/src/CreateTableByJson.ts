import { Type } from "../utils/Types.js";
import { Utils as Utl } from "../utils/Utils.js";
import { Option as Opt } from "./Option.js";

import { DataObject } from "./DataObject.js";

//Render Dados
export namespace TableByJson {
    export class Controller {
        data: DataObject;
        headers: Type.Option;

        renderer: Renderer

        /**
         * @alert Lista de dados não padronizados podem apresentar um resultado inesperado.
         * @param data Array de dados
         * @param headers paths das colunas e seus respectivos titulos, quando omitido todas as chaves seram consideradas.
         */
        constructor(data: DataObject | Type.DataObject, headers?: Type.Option) {
            this.data = data instanceof DataObject ? data : new DataObject(data);
            this.headers = headers ? headers : Utl.Data.getAllPaths(this.data.records[0]);
            this.renderer = new Renderer(this);
        }
    }

    export class Renderer {
        private html_table: HTMLTableElement;
        private thead: HTMLTableSectionElement;
        private tbody: HTMLTableSectionElement;
        private tfoot: HTMLTableSectionElement;

        private fragment: DocumentFragment;
        
        private atr_opts: Opt.HtmlAttribute[];
        private rend_opts: Opt.Renderer;
        
        constructor(table: Controller, html_table?: HTMLTableElement) {
            this.fragment = document.createDocumentFragment();
            this.html_table = this.setHtmlTable(html_table);
            this.atr_opts = {} as Opt.HtmlAttribute[];
            this.rend_opts = new Opt.Renderer();
        }

        /**
         * Função para criar a tabela html com thead, theady e tfoot.
         * @param html_table Tabela html enviada como parametro pelo construtor da classe.
         * @returns Retorna um tabela html reorganizada com thead, tbody e tfoot em ordem.
         */
        private setHtmlTable(html_table?: HTMLTableElement): HTMLTableElement {
            let query: any = null;
            let table: HTMLTableElement;
            let thead: HTMLTableSectionElement;
            let tbody: HTMLTableSectionElement;
            let tfoot: HTMLTableSectionElement;
            
            if (html_table instanceof HTMLTableElement) {
                table = html_table;
                query = table.querySelector('caption');
                const caption = query ? query : null;
                
                query = table.querySelector('colgroup');
                const colgroup =  query ? query : null;
                
                query = table.querySelector('thead');
                thead = query ? query : document.createElement('thead');
                
                query = table.querySelector('tbody');
                tbody = query ? query : document.createElement('tbody');
                
                query = table.querySelector('tfoot');
                tfoot = query ? query : document.createElement('tfoot');

                if (caption || colgroup) {
                    if(caption) {
                        if (colgroup) {
                            table.append(caption, colgroup, thead, tbody, tfoot);
                        } else {
                            table.append(caption, thead, tbody, tfoot);
                        }
                    } else {
                        table.append(colgroup, thead, tbody, tfoot);
                    }
                } else {
                    table.append(thead, tbody, tfoot);
                }
            } else {
                table = document.createElement('table');
                thead = document.createElement('thead');
                tbody = document.createElement('tbody');
                tfoot = document.createElement('tfoot');

                table.append(thead, tbody, tfoot);
            }

            this.thead = thead;
            this.tbody = tbody;
            this.tfoot = tfoot;

            return table;
        }

        createCell(type: "th" | "td", inner_text: string, option?: (cell: HTMLTableCellElement) => void): HTMLTableCellElement {
            const cell = document.createElement(type);
            if (option) {
                option(cell);
            }
            cell.innerText = inner_text;
            return cell;
        }
    
        createRow(str: "th" | "td", item: Type.Option, thead:boolean = false, headers: Type.Option): HTMLTableRowElement {
            const tr = document.createElement('tr');
            for (const key in headers) {
                if (thead) {
                    const cell = this.createCell(str, `${headers[key]}`);
                    tr.appendChild(cell);
                } else {
                    const cell = this.createCell(str, `${Utl.Data.getNestedProperty(item, key)}`);
                    tr.appendChild(cell);
                }
            }
            return tr;
        }
    
        createThead(headers: Type.Option): HTMLTableSectionElement {
            const thead = document.createElement('thead');
            thead.appendChild(this.createRow('th', headers, true, headers));
            return thead;
        }
    
        createTbody(headers: Type.Option, data: DataObject): HTMLTableSectionElement {
            let limit_rows = Number.parseFloat(this.rend_opts.pagination.limit_rows);
            const tbody = document.createElement('tbody');
            for (let i = 0; i < limit_rows; i++) {
                tbody.appendChild(this.createRow('td', data.records[i], false, headers));
            }
            return tbody;
        }
    
        createTfoot(headers: Type.Option): HTMLTableSectionElement {
            const tfoot = document.createElement('tfoot');
            tfoot.appendChild(this.createRow('td', headers, true, headers));
            return tfoot;
        }
    
        createTable(data: DataObject, headers: Type.Option): HTMLTableElement {
            this.html_table.appendChild(this.createThead(headers));
            this.html_table.appendChild(this.createTbody(headers, data));
            this.html_table.appendChild(this.createTfoot(headers));
            return this.html_table;
        }
    }
}