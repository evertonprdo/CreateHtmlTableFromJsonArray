import { Type } from "../utils/Types.js";
import { Utils as Utl } from "../utils/Utils.js";

import { Renderer as Rdr, Renderer } from "../views/Renderer.js";
import { Models } from "../models/Models.js";


export namespace Controller {
    export class Main {
        private models: Models.Main;
        private view: Renderer.Main;
    
        constructor(data: Type.DataObject, headers?: Type.Option) {
            //Atribuição dos Models
            //Atribuição do Renderizador
        }

        renderTable(): void {

        }
    }
}