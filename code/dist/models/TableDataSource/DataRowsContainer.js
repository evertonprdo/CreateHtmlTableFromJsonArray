export class DataRowsContainer {
    data_rows_array = [];
    delete_rows_option = true;
    current_last_id = 0;
    constructor(json_array) {
        for (let i = 1; i <= json_array.length; i++) {
            const data_row = new DataRow(i, json_array[i - 1]);
            this.data_rows_array.push(data_row);
            this.current_last_id = i;
        }
    }
    addNewRows(json_array) {
        const iterations = json_array.length + this.last_id;
        let j = 0;
        for (let i = this.last_id + 1; i <= iterations; i++) {
            const data_row = new DataRow(i, json_array[j]);
            this.data_rows_array.push(data_row);
            this.current_last_id = i;
            j++;
        }
    }
    deleteRows(shift_array) {
        if (!this.isDeleteRowsEnable()) {
            this.deleteRowsDisabledError();
        }
        const ids = this.ids;
        for (const id of ids) {
            if (shift_array.includes(id)) {
                const revome_index = ids.indexOf(id);
                this.array.splice(revome_index, 1);
            }
        }
    }
    isDeleteRowsEnable() {
        return this.delete_rows_option;
    }
    getRenderJsonArray() {
        const render_array = [];
        for (const data_row of this.array) {
            if (data_row.render_status === true) {
                render_array.push(data_row.json_object);
            }
        }
        return render_array;
    }
    get ids() {
        const ids_array = [];
        for (const row of this.array) {
            ids_array.push(row.id);
        }
        return ids_array;
    }
    get array() {
        return this.data_rows_array;
    }
    get last_id() {
        return this.current_last_id;
    }
    deleteRowsDisabledError() {
        throw new Error("deleteRows() is disabled");
    }
}
class DataRow {
    data_row_id;
    data_row_json_object;
    data_row_render_status = true;
    constructor(id, json_object) {
        this.data_row_id = id;
        this.data_row_json_object = json_object;
    }
    switchRender() {
        this.data_row_render_status = !this.data_row_render_status;
    }
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
