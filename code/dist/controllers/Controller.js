import { Utils as Utl } from "../utils/Utils.js";
import { Option as Opt } from "../models/Models.js";
import { Renderer } from "../views/Renderer.js";
import { DataObject } from "../models/Models.js";
export var Controller;
(function (Controller) {
    class Main {
        data;
        view;
        constructor(data, headers) {
            const header = headers ? headers : Utl.Data.getAllPaths(data[0]);
            this.data = data instanceof DataObject ? data : new DataObject(data, header);
            this.view = new View();
        }
        funcaoTemporariaParaTestarCertasCoisasEnquantoEuMeResolvoDeComoDefinitivamenteVaiFicarAArquitetura() {
            document.body.appendChild(this.view.renderer.renderTable(this.data));
        }
    }
    Controller.Main = Main;
    class View {
        renderer;
        render_opts;
        constructor() {
            this.renderer = new Renderer.HtmlTable();
            this.render_opts = new Opt.Renderer();
        }
    }
})(Controller || (Controller = {}));
