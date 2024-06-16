import { Type, Utils } from "../../CreateTableFromJsonArray.js";
import { HeaderContainer } from "./DataHeaderContainer.js";
import { DataRowsContainer } from "./DataRowsContainer.js";

export class TableDataSource {
    private readonly table_data_source_header: HeaderContainer
    private readonly table_data_source_rows: DataRowsContainer

    constructor(json_array: Type.JsonArray) {
        const keys = Utils.Data.getKeysFromJsonObject(json_array[0]);
        
        this.table_data_source_header = new HeaderContainer(keys);
        this.table_data_source_rows = new DataRowsContainer(json_array);
    }

    private buildColumnValues(key: string, only_render: boolean): Type.JsonObject {
        if(!(this.Header.isKey(key))) { this.Header.keyNotFound(key); }
        const column: Type.JsonObject = {};
        const build_array: Type.JsonObject[] = [];
        const rows_array = (
            only_render === true ?
            this.DataRows.getRenderArray() : this.DataRows.array
        );
        for(const row of rows_array) {
            const index_value: Type.JsonObject = {}
            index_value[row.id] = Utils.Data.getNestedProperty(row.json_object, key);
            build_array.push(index_value)
        }
        column[key] = build_array;
        return column
    }

    //  # Getters
    get Header(): HeaderContainer {
        return this.table_data_source_header;
    }
    get DataRows(): DataRowsContainer{
        return this.table_data_source_rows;
    }
    getColumnArrayValues(key: string): Type.JsonObject {
        return this.buildColumnValues(key, false);
    }
    getColumnArrayOnlyRenderValues(key: string): Type.JsonObject {
        return this.buildColumnValues(key, true);
    }
}