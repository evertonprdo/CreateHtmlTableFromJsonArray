import { Utils as Utl } from "../utils/Utils.js";
export var Renderer;
(function (Renderer) {
    class Main {
        static createTableFromJson(json) {
            let jsonArray = Array.isArray(json) ? json : [json];
            const paths = jsonArray.flatMap(obj => Utl.Data.getAllPaths(obj));
            const uniquePaths = [...new Set(paths.map(path => path.replace(/\[\d+\]/g, '[]')))];
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');
            const headerRow = document.createElement('tr');
            uniquePaths.forEach(path => {
                const th = document.createElement('th');
                th.textContent = path;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            const maxRows = Utl.Data.getMaxArrayLength(jsonArray);
            jsonArray.forEach(obj => {
                for (let i = 0; i < maxRows; i++) {
                    const dataRow = document.createElement('tr');
                    uniquePaths.forEach(path => {
                        const td = document.createElement('td');
                        const arrayPath = path.replace('[]', `[${i}]`);
                        td.textContent = new String(Utl.Data.getValueByPath(obj, arrayPath)).toString() || '';
                        dataRow.appendChild(td);
                    });
                    tbody.appendChild(dataRow);
                }
            });
            table.appendChild(thead);
            table.appendChild(tbody);
            return table;
        }
    }
    Renderer.Main = Main;
})(Renderer || (Renderer = {}));
var HtmlManage;
(function (HtmlManage) {
    class Main {
    }
    HtmlManage.Main = Main;
    class Table {
    }
    class Caption {
    }
    class Head {
    }
    class Body {
    }
    class Foot {
    }
    class Row {
    }
    class Cell {
    }
    class Attributes {
    }
})(HtmlManage || (HtmlManage = {}));
