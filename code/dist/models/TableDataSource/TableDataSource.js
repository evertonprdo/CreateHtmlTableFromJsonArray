import { Utils } from "../../CreateTableFromJsonArray.js";
import { HeaderContainer } from "./DataHeaderContainer.js";
import { DataRowsContainer } from "./DataRowsContainer.js";
export class TableDataSource {
    table_data_source_header;
    table_data_source_rows;
    constructor(json_array) {
        const keys = Utils.Data.getKeysFromJsonObject(json_array[0]);
        this.table_data_source_header = new HeaderContainer(keys);
        this.table_data_source_rows = new DataRowsContainer(json_array);
    }
    buildColumnValues(key, only_render) {
        if (!(this.Header.isKey(key))) {
            this.Header.keyNotFound(key);
        }
        const column = {};
        const build_array = [];
        const rows_array = (only_render === true ?
            this.DataRows.getRenderArray() : this.DataRows.array);
        for (const row of rows_array) {
            const index_value = {};
            index_value[row.id] = Utils.Data.getNestedProperty(row.json_object, key);
            build_array.push(index_value);
        }
        column[key] = build_array;
        return column;
    }
    get Header() {
        return this.table_data_source_header;
    }
    get DataRows() {
        return this.table_data_source_rows;
    }
    getColumnArrayValues(key) {
        return this.buildColumnValues(key, false);
    }
    getColumnArrayOnlyRenderValues(key) {
        return this.buildColumnValues(key, true);
    }
}
