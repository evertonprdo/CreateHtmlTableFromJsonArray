import { Type } from "../utils/Types.js";
import { Utils as Utl } from "../utils/Utils.js";
import { Option as Opt } from "../models/Models.js";

import { Renderer as Rdr, Renderer } from "../views/Renderer.js";
import { DataObject } from "../models/Models.js";


export namespace Controller {
    export class Main {
        private data: DataObject;
    
        private view: View
    
        /**
         * @alert Lista de dados não padronizados podem apresentar um resultado inesperado.
         * @param data Array de dados
         * @param headers paths das colunas e seus respectivos titulos, quando omitido todas as chaves seram consideradas.
         */
        constructor(data: Type.DataObject, headers?: Type.Option) {
            const header = headers ? headers : Utl.Data.getAllPaths(data[0]);
            
            this.data = data instanceof DataObject ? data : new DataObject(data, header);
            this.view = new View();
        }

        funcaoTemporariaParaTestarCertasCoisasEnquantoEuMeResolvoDeComoDefinitivamenteVaiFicarAArquitetura(): void {
            document.body.appendChild(this.view.renderer.renderTable(this.data));
        }
    }

    class View {
        renderer: Renderer.HtmlTable;
        render_opts: Opt.Renderer;

        constructor() {
            this.renderer = new Renderer.HtmlTable();
            this.render_opts = new Opt.Renderer();
        }
    }
}