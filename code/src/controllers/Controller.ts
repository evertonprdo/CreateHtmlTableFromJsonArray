import { Type, Utils, Renderer, Models } from "../CreateTableFromJsonArray.js";
import { TableDataSource } from "../models/TableDataSource/TableDataSource.js";

export namespace Controller {
    export class Main {
        private json_array_class: TableDataSource;
        private table_html_class: Renderer.TableHtml;

        constructor(target: HTMLElement, json_array: Type.JsonArray, headers?: string[] | Type.Indexable.String) {
            this.json_array_class = Models.createNewTableDataSource(json_array);
            if(headers) {
                if(Array.isArray(headers)) {
                    this.TableDataSource.Header.turnRenderOnWithIndexArray(headers);
                } else {
                    this.TableDataSource.Header.setBatchTitles(headers)
                    this.TableDataSource.Header.turnRenderOnWithIndexArray(Object.keys(headers))
                }
            };
            this.table_html_class = new Renderer.TableHtml(target);
        }

        get TableDataSource() {
            return this.json_array_class;
        }

        get TableHtml() {
            return this.table_html_class;
        }
    }

    export class EventManager extends EventTarget {
        private readonly main_class: Main
        private temp_order_key: string = "";
        
        constructor(controller: Main) {
            super();
            this.main_class = controller;
            this.start();
        }

        start() {
            //this.options();
            this.Main.TableHtml.init(
                this.Main.TableDataSource.DataRows.getRenderJsonArray(), 
                this.Main.TableDataSource.Header.getRenderTitles(),
            )
            this.Main.TableHtml.addEventListener('headerClick', (event) => {
                this.headerClick((event as CustomEvent).detail);
            })
        }

        refreshTableBody(teste?: any) {
            this.Main.TableHtml.refreshBody(
                teste,
                this.Main.TableDataSource.Header.getRenderKeys()
            );
        }

        private headerClick(key: string) {
            this.refreshTableBody(this.sortByHeader(this.Main.TableDataSource.DataRows.getRenderJsonArray(), key))
        }

        private sortByHeader(table: Type.JsonArray, key: string): Type.JsonArray {
            const ord: number[] = []
            if(this.temp_order_key === key) {
                this.temp_order_key = "";
                ord.push(1, -1);
            } else {
                this.temp_order_key = key;
                ord.push(-1, 1);
            }
            return table.sort((a, b) => {
                const value_a = Utils.Data.getNestedProperty(a, key);
                const value_b = Utils.Data.getNestedProperty(b, key);
                if(value_a && value_b) {
                    if (value_a < value_b) {
                        return ord[0];
                    }
                    if (value_a > value_b) {
                        return ord[1];
                    }
                }
                return 0;
            });
        }

        get Main() {
            return this.main_class
        }
    }
}