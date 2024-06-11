import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";
export var Controller;
(function (Controller) {
    class Main {
        json_array_class;
        compose_data_class = new Models.Compose();
        html_table_renderer_class;
        constructor(target, json_array, headers) {
            this.json_array_class = new Models.JsonArray(json_array);
            if (headers) {
                if (Array.isArray(headers)) {
                    this.JsonArray.setHeaderRender(headers);
                }
                else {
                    this.JsonArray.setHeaderTitle(headers);
                    this.JsonArray.setHeaderRender(Object.keys(headers));
                }
            }
            ;
            this.html_table_renderer_class = new Renderer.TableHtml(target);
            this.startTable();
        }
        startTable() {
            const rows = this.Compose.tableBody(this.JsonArray.array, this.JsonArray.render_headers);
            this.RendererHtmlTable.startRender(rows, this.JsonArray.render_titles);
        }
        get JsonArray() {
            return this.json_array_class;
        }
        get RendererHtmlTable() {
            return this.html_table_renderer_class;
        }
        get Compose() {
            return this.compose_data_class;
        }
        logTests() {
            this.JsonArray.setHeaderTitle("meta.createdAt", "Criado em");
            this.JsonArray.popHeader("meta.createdAt");
            this.JsonArray.popHeader("meta.updatedAt");
            this.JsonArray.switchRender("description");
            this.JsonArray.setHeaderTitle("description", "Descrição");
            this.JsonArray.setHeaderTitle({
                "thumbnail": "Imagem Principal",
                "dimensions.depth": "Comprimento",
                "dimensions.width": "Largura",
                "dimensions.height": "Altura"
            });
            this.JsonArray.setHeaderRender(["title", "description", "stock", "price"]);
            this.JsonArray.setFormatTo("price", "CURRENCY");
            this.JsonArray.setFormatTo({
                "meta.createdAt": "DATE",
                "meta.updatedAt": "DATE",
                "discountPercentage": "PERCENT",
                "weight": "FLOAT_FIX"
            });
            console.log(this.JsonArray);
        }
    }
    Controller.Main = Main;
})(Controller || (Controller = {}));
