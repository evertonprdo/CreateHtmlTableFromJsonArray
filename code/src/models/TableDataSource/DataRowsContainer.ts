import { Type } from "../../CreateTableFromJsonArray.js";

export class DataRowsContainer {
    private readonly data_rows_array: Type.DataRows = [];
    private readonly delete_rows_option = true;
    private current_last_id: number = 0;

    constructor(json_array: Type.JsonArray) {
        for(let i = 1; i <= json_array.length; i++) {
            const data_row = new DataRow(i, json_array[i -1])
            this.data_rows_array.push(data_row);
            this.current_last_id = i;
        }
    }

    addNewRows(json_array: Type.JsonArray) {
        const iterations = json_array.length + this.last_id;
        
        let j = 0;
        for(let i = this.last_id + 1; i <= iterations; i++) {
            const data_row = new DataRow(i, json_array[j])
            this.data_rows_array.push(data_row);
            this.current_last_id = i;
            j++;
        }
    }

    deleteRows(shift_array: number[]) {
        if(!this.isDeleteRowsEnable()) { this.deleteRowsDisabledError() }
        
        const ids = this.ids;
        for(const id of ids) {
            if(shift_array.includes(id)) {
                const revome_index = ids.indexOf(id)
                this.array.splice(revome_index, 1);
            }
        }
    }
    private isDeleteRowsEnable() {
        return this.delete_rows_option;
    }

    getRenderJsonArray() {
        const render_array: Type.JsonArray = [];
        for(const data_row of this.array) {
            if(data_row.render_status === true) {
                render_array.push(data_row.json_object);
            }
        }
        return render_array;
    }

//  # Getters
    get ids(): Array<number> { 
        const ids_array: Array<number> = [];
        for(const row of this.array) {
            ids_array.push(row.id);
        }
        return ids_array;
    }
    get array(): Type.DataRows {
        return this.data_rows_array;
    }
    get last_id(): number {
        return this.current_last_id;
    }

    private deleteRowsDisabledError() {
        throw new Error("deleteRows() is disabled");
    }
}

class DataRow {
    private readonly data_row_id: number;
    private readonly data_row_json_object: Type.JsonObject;
    private data_row_render_status: boolean = true;
    
    constructor(id: number, json_object: Type.JsonObject) {
        this.data_row_id = id;
        this.data_row_json_object = json_object;
    }

    switchRender(): void {
        this.data_row_render_status = !this.data_row_render_status;
    }

//  #Getters
    get id() {
        return this.data_row_id;
    }
    get json_object() {
        return this.data_row_json_object;
    }
    get render_status() {
        return this.data_row_render_status;
    }
}