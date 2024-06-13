import { Utils, Renderer, Models } from "../CreateTableFromJsonArray.js";
export var Controller;
(function (Controller) {
    class Main {
        json_array_class;
        compose_data_class = new Models.Compose();
        table_html_class;
        constructor(target, json_array, headers) {
            this.json_array_class = Models.createNewTableDataSource(json_array);
            if (headers) {
                if (Array.isArray(headers)) {
                    this.TableDataSource.Header.setRenderWithKeys(headers);
                }
                else {
                    this.TableDataSource.Header.titles = headers;
                    this.TableDataSource.Header.setRenderWithKeys(Object.keys(headers));
                }
            }
            ;
            this.table_html_class = new Renderer.TableHtml(target);
        }
        get TableDataSource() {
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
            this.Main.TableHtml.init(this.Main.Compose.tableBody(this.Main.TableDataSource.DataRows.getRenderArray(), this.Main.TableDataSource.Header.getRenderItems()), this.Main.TableDataSource.Header.getRenderTitles());
            this.Main.TableHtml.addEventListener('headerClick', (event) => {
                this.headerClick(event.detail);
            });
        }
        refreshTableBody(teste) {
            this.Main.TableHtml.refreshBody(teste, this.Main.TableDataSource.Header.getRenderKeys());
        }
        headerClick(key) {
            this.refreshTableBody(this.Main.Compose.tableBody(this.sortByHeader(this.Main.TableDataSource.DataRows.getRenderArray(), key), this.Main.TableDataSource.Header.getRenderItems()));
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
        options() {
            this.Main.TableDataSource.Header.setRenderWithKeys([
                "title",
                "description",
                "discountPercentage",
                "dimensions.width",
                "dimensions.height",
                "dimensions.depth",
                "price",
                "meta.createdAt"
            ]);
            this.Main.TableDataSource.Header.titles = {
                "title": "Titulo",
                "description": "Descrição",
                "discountPercentage": "Desconto",
                "price": "Preço",
                "dimensions.width": "Largura",
                "dimensions.height": "Altura",
                "dimensions.depth": "Comprimento",
                "meta.createdAt": "Criando em"
            };
            this.Main.TableDataSource.Header.format_options = {
                "price": "CURRENCY",
                "meta.createdAt": "DATE",
                "discountPercentage": "PERCENT",
                "weight": "FLOAT_FIX"
            };
            this.Main.TableDataSource.Header.items["dimensions.width"].footer_function = "columnSome";
            this.Main.TableDataSource.Header.items["dimensions.height"].footer_function = "columnSome";
            this.Main.TableDataSource.Header.items["dimensions.depth"].footer_function = "columnSome";
        }
        get Main() {
            return this.main_class;
        }
    }
    Controller.EventManager = EventManager;
})(Controller || (Controller = {}));
