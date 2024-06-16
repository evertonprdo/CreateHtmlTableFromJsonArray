import { Type } from "../CreateTableFromJsonArray.js";
import { TableDataSource } from "./TableDataSource/TableDataSource.js";

export namespace Models {
    export function createNewTableDataSource(json_array: Type.JsonArray): TableDataSource {
        return new TableDataSource(json_array)
    }
}