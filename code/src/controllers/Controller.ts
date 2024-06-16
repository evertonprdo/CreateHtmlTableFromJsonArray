import { Type } from "../utils/Types.js";
import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";
import { Utils } from "../utils/Utils.js";

export namespace Controller {
    export class Main {
        private json_array_class: Models.JsonArray;
        private compose_data_class: Models.Compose = new Models.Compose();
        private table_html_class: Renderer.TableHtml;

        constructor(target: HTMLElement, json_array: Type.JsonArray, headers?: string[] | Type.ObjString) {
            this.json_array_class = new Models.JsonArray(json_array);
            if(headers) {
                if(Array.isArray(headers)) {
                    this.JsonArray.Headers.setRender(headers);
                } else {
                    this.JsonArray.Headers.setTitle(headers);
                    this.JsonArray.Headers.setRender(Object.keys(headers));
                }
            };
            this.table_html_class = new Renderer.TableHtml(target);
        }

        get JsonArray() {
            return this.json_array_class;
        }

        get Compose() {
            return this.compose_data_class;
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
            this.Main.TableHtml.init(
                this.Main.Compose.tableBody(
                    this.Main.JsonArray.Data.getRenderArray(),
                    this.Main.JsonArray.Headers.getRender(),
                ), 
                this.Main.JsonArray.Headers.getRenderTitles(),
                this.footerSome()
            )
            this.Main.TableHtml.addEventListener('headerClick', (event) => {
                this.headerClick((event as CustomEvent).detail);
            })
        }

        footerSome() {
            const result: {[key: string]: number} = {};
            const som = this.Main.JsonArray.Headers.render_column_some
            for(const key of som) {
                let soma = 0;
                this.Main.JsonArray.Data.getRenderArray().forEach(item => {
                    soma += Utils.Data.getNestedProperty(item, key) as number;
                })
                result[key] = soma;
            }

            return this.Main.Compose.tableFoot(result, this.Main.JsonArray.Headers.getRender())
        }

        refreshTableBody(teste?: any) {
            this.Main.TableHtml.refreshBody(
                teste,
                this.Main.JsonArray.Headers.getRenderKeys()
            );
        }

        private headerClick(key: string) {
            this.refreshTableBody(
                this.Main.Compose.tableBody(
                    this.sortByHeader(
                        this.Main.JsonArray.Data.getRenderArray(),
                        key
                    ),
                    this.Main.JsonArray.Headers.getRender()
                )
            );
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