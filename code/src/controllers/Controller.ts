import { Type } from "../utils/Types.js";
import { Models } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";

export namespace Controller {
    export class Main {
        private json_array_class: Models.JsonArray;
        private compose_data_class: Models.Compose = new Models.Compose();
        private html_table_renderer_class: Renderer.TableHtml;

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
            this.html_table_renderer_class = new Renderer.TableHtml(target);
            this.startTable();
        }

        startTable() {                    
            const rows = this.Compose.tableBody(this.JsonArray.Data.getRenderArray(), this.JsonArray.Headers.getRender());
            this.RendererHtmlTable.startRender(rows, this.JsonArray.Headers.getRenderTitles());
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
            this.JsonArray.Headers.setTitle("meta.createdAt", "Criado em");
            this.JsonArray.Headers.pop("meta.createdAt")
            this.JsonArray.Headers.pop("meta.updatedAt")
            this.JsonArray.Headers.switchRender("description")
            this.JsonArray.Headers.setTitle("description", "Descrição")

            this.JsonArray.Headers.setTitle({
                "thumbnail": "Imagem Principal",
                "dimensions.depth": "Comprimento",
                "dimensions.width": "Largura",
                "dimensions.height": "Altura"
            })

            this.JsonArray.Headers.setRender(["title", "description", "stock", "price"])
            this.JsonArray.Headers.setFormatTo("price", "CURRENCY");
            this.JsonArray.Headers.setFormatTo({
                "meta.createdAt": "DATE",
                "meta.updatedAt": "DATE",
                "discountPercentage": "PERCENT",
                "weight": "FLOAT_FIX"
            })
            this.JsonArray.Data.setRender([0,1,2,3,4,5,6,7,8,9,10])
            this.JsonArray.Data.push(15)
            this.JsonArray.Data.switchRender(3);

            console.log(this.JsonArray.Data.getRenderArray());
            console.log(this.JsonArray.Headers.headers);
            console.log(this.JsonArray.Data.data);
        }
    }
}