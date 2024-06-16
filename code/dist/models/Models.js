import { TableDataSource } from "./TableDataSource/TableDataSource.js";
export var Models;
(function (Models) {
    function createNewTableDataSource(json_array) {
        return new TableDataSource(json_array);
    }
    Models.createNewTableDataSource = createNewTableDataSource;
})(Models || (Models = {}));
