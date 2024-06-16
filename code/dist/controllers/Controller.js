import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";
import { Utils } from "../utils/Utils.js";
export var Controller;
(function (Controller) {
    class Main {
        json_array_class;
        compose_data_class = new Models.Compose();
        table_html_class;
        constructor(target, json_array, headers) {
            this.json_array_class = new Models.JsonArray(json_array);
            if (headers) {
                if (Array.isArray(headers)) {
                    this.JsonArray.Headers.setRender(headers);
                }
                else {
                    this.JsonArray.Headers.setTitle(headers);
                    this.JsonArray.Headers.setRender(Object.keys(headers));
                }
            }
            ;
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
    Controller.Main = Main;
    class EventManager extends EventTarget {
        main_class;
        temp_order_key = "";
        constructor(controller) {
            super();
            this.main_class = controller;
            this.start();
        }
        start() {
            this.Main.TableHtml.init(this.Main.Compose.tableBody(this.Main.JsonArray.Data.getRenderArray(), this.Main.JsonArray.Headers.getRender()), this.Main.JsonArray.Headers.getRenderTitles(), this.footerSome());
            this.Main.TableHtml.addEventListener('headerClick', (event) => {
                this.headerClick(event.detail);
            });
        }
        footerSome() {
            const result = {};
            const som = this.Main.JsonArray.Headers.render_column_some;
            for (const key of som) {
                let soma = 0;
                this.Main.JsonArray.Data.getRenderArray().forEach(item => {
                    soma += Utils.Data.getNestedProperty(item, key);
                });
                result[key] = soma;
            }
            return this.Main.Compose.tableFoot(result, this.Main.JsonArray.Headers.getRender());
        }
        refreshTableBody(teste) {
            this.Main.TableHtml.refreshBody(teste, this.Main.JsonArray.Headers.getRenderKeys());
        }
        headerClick(key) {
            this.refreshTableBody(this.Main.Compose.tableBody(this.sortByHeader(this.Main.JsonArray.Data.getRenderArray(), key), this.Main.JsonArray.Headers.getRender()));
        }
        sortByHeader(table, key) {
            const ord = [];
            if (this.temp_order_key === key) {
                this.temp_order_key = "";
                ord.push(1, -1);
            }
            else {
                this.temp_order_key = key;
                ord.push(-1, 1);
            }
            return table.sort((a, b) => {
                const value_a = Utils.Data.getNestedProperty(a, key);
                const value_b = Utils.Data.getNestedProperty(b, key);
                if (value_a && value_b) {
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
            return this.main_class;
        }
    }
    Controller.EventManager = EventManager;
})(Controller || (Controller = {}));
