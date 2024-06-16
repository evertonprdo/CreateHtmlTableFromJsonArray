import { Utils, Renderer, Models } from "../CreateTableFromJsonArray.js";
export var Controller;
(function (Controller) {
    class Main {
        json_array_class;
        table_html_class;
        constructor(target, json_array, headers) {
            this.json_array_class = Models.createNewTableDataSource(json_array);
            if (headers) {
                if (Array.isArray(headers)) {
                    this.TableDataSource.Header.turnRenderOnWithIndexArray(headers);
                }
                else {
                    this.TableDataSource.Header.setBatchTitles(headers);
                    this.TableDataSource.Header.turnRenderOnWithIndexArray(Object.keys(headers));
                }
            }
            ;
            this.table_html_class = new Renderer.TableHtml(target);
        }
        get TableDataSource() {
            return this.json_array_class;
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
            this.Main.TableHtml.init(this.Main.TableDataSource.DataRows.getRenderJsonArray(), this.Main.TableDataSource.Header.getRenderTitles());
            this.Main.TableHtml.addEventListener('headerClick', (event) => {
                this.headerClick(event.detail);
            });
        }
        refreshTableBody(teste) {
            this.Main.TableHtml.refreshBody(teste, this.Main.TableDataSource.Header.getRenderKeys());
        }
        headerClick(key) {
            this.refreshTableBody(this.sortByHeader(this.Main.TableDataSource.DataRows.getRenderJsonArray(), key));
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
