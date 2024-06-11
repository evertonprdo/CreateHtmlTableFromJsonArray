import { Type } from "../utils/Types.js";
import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";
import { Utils } from "../utils/Utils.js";

export namespace Controller {
    export class Main {
        private json_array_class: Models.JsonArray;
        private compose_data_class: Models.Compose = new Models.Compose();
        private html_table_renderer_class: Renderer.TableHtml;

        constructor(target: HTMLElement, json_array: Type.JsonArray, headers?: string[] | Type.ObjString) {
            this.json_array_class = new Models.JsonArray(json_array);
            if(headers) {
                if(Array.isArray(headers)) {
                    this.JsonArray.setHeaderRender(headers);
                } else {
                    this.JsonArray.setHeaderTitle(headers);
                    this.JsonArray.setHeaderRender(Object.keys(headers));
                }
            };
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
            this.JsonArray.popHeader("meta.createdAt")
            this.JsonArray.popHeader("meta.updatedAt")
            this.JsonArray.switchRender("description")
            this.JsonArray.setHeaderTitle("description", "Descrição")

            this.JsonArray.setHeaderTitle({
                "thumbnail": "Imagem Principal",
                "dimensions.depth": "Comprimento",
                "dimensions.width": "Largura",
                "dimensions.height": "Altura"
            })

            this.JsonArray.setHeaderRender(["title", "description", "stock", "price"])
            this.JsonArray.setFormatTo("price", "CURRENCY");
            this.JsonArray.setFormatTo({
                "meta.createdAt": "DATE",
                "meta.updatedAt": "DATE",
                "discountPercentage": "PERCENT",
                "weight": "FLOAT_FIX"
            })
            console.log(this.JsonArray);
        }
    }
}