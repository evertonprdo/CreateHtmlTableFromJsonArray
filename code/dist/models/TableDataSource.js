import { Utils } from "../CreateTableFromJsonArray.js";
export class TableDataSource {
    table_data_source_header;
    table_data_source_rows;
    constructor(json_array) {
        const keys = Utils.Data.getKeysFromJsonObject(json_array[0]);
        this.table_data_source_header = new HeaderContainer(keys);
        this.table_data_source_rows = new DataRowsContainer(json_array);
    }
    get Header() {
        return this.table_data_source_header;
    }
    get DataRows() {
        return this.table_data_source_rows;
    }
}
class HeaderContainer {
    initial_data_header_items = {};
    current_data_header_render_items = {};
    current_data_header_render_items_change = false;
    constructor(json_object_keys) {
        for (const key of json_object_keys) {
            const header_item = new HeaderItem(key);
            this.initial_data_header_items[key] = header_item;
            this.current_data_header_render_items[key] = header_item;
        }
    }
    isKey(key) {
        return key in this.items;
    }
    refreshCurrentRenderItems() {
        if (this.current_data_header_render_items_change === false) {
            this.setCurrentRenderItems();
        }
    }
    setCurrentRenderItems() {
        const render_items = {};
        for (const key in this.items) {
            if (this.items[key].render_status === true) {
                render_items[key] = this.items[key];
            }
        }
        this.current_data_header_render_items = render_items;
        this.current_data_header_render_items_change = false;
    }
    setRenderWithKeys(keys) {
        if (this.isAllKeysValid(keys)) {
            for (const key in this.items) {
                if (keys.includes(key)) {
                    this.items[key].render_status = true;
                }
                else {
                    this.items[key].render_status = false;
                }
            }
            this.current_data_header_render_items_change = true;
            this.refreshCurrentRenderItems();
        }
    }
    getRenderOption(prop) {
        const option = {};
        const current_items = this.getRenderItems();
        for (const key in current_items) {
            option[key] = current_items[key][prop];
        }
        return option;
    }
    getRenderItems() {
        this.refreshCurrentRenderItems();
        return this.current_data_header_render_items;
    }
    getRenderKeys() {
        this.refreshCurrentRenderItems();
        return Object.keys(this.getRenderItems());
    }
    getRenderTitles() {
        this.refreshCurrentRenderItems();
        return this.getRenderOption("title");
    }
    getRenderFormatTo() {
        this.refreshCurrentRenderItems();
        return this.getRenderOption("format_to");
    }
    getRenderFooterFunction() {
        this.refreshCurrentRenderItems();
        return this.getRenderOption("footer_function");
    }
    getOption(prop) {
        const option = {};
        for (const key in this.items) {
            option[key] = this.items[key][prop];
        }
        return option;
    }
    get items() {
        return this.initial_data_header_items;
    }
    get keys() {
        return Object.keys(this.items);
    }
    get titles() {
        return this.getOption("title");
    }
    get render_status() {
        return this.getOption("render_status");
    }
    get format_options() {
        return this.getOption("format_to");
    }
    get footer_fn_options() {
        return this.getOption("footer_function");
    }
    isAllKeysValid(keys) {
        for (const key of keys) {
            if (!this.isKey(key)) {
                this.keyNotFound(key);
                return false;
            }
        }
        return true;
    }
    set titles(option_header_titles) {
        if (this.isAllKeysValid(Object.keys(option_header_titles))) {
            for (const key in option_header_titles) {
                this.items[key].title = option_header_titles[key];
            }
        }
    }
    set format_options(option_header_format_to) {
        if (this.isAllKeysValid(Object.keys(option_header_format_to))) {
            for (const key in option_header_format_to) {
                this.items[key].format_to = option_header_format_to[key];
            }
        }
    }
    set footer_fn_options(option_header_footer_function) {
        if (this.isAllKeysValid(Object.keys(option_header_footer_function))) {
            for (const key in option_header_footer_function) {
                this.items[key].footer_function = option_header_footer_function[key];
            }
        }
    }
    keyNotFound(key) {
        throw new Error(`Key: "${key}" Not Found`);
    }
}
class DataRowsContainer {
    data_rows_array = [];
    data_row_current_last_id = 0;
    current_data_rows_render = [];
    current_data_rows_render_change = false;
    constructor(json_array) {
        for (let i = 1; i <= json_array.length; i++) {
            const data_row = new DataRow(i, json_array[i]);
            this.data_rows_array.push(data_row);
            this.current_data_rows_render.push(data_row);
            this.data_row_current_last_id = i;
        }
    }
    refreshCurrentRenderArray() {
        if (this.current_data_rows_render_change === true) {
            this.setCurrentRenderArray();
        }
    }
    getRenderArray() {
        this.refreshCurrentRenderArray();
        return this.current_data_rows_render;
    }
    get array() {
        return this.data_rows_array;
    }
    get ids() {
        const rows_id = [];
        for (const data_row of this.array) {
            rows_id.push(data_row.id);
        }
        return rows_id;
    }
    get json_array() {
        const json_array = [];
        for (const data_row of this.array) {
            json_array.push(data_row);
        }
        return json_array;
    }
    get current_last_id() {
        return this.data_row_current_last_id;
    }
    setCurrentRenderArray() {
        const current_render = [];
        for (const data_row of this.array) {
            if (data_row.render_status === true) {
                current_render.push(data_row);
            }
        }
        this.current_data_rows_render = current_render;
        this.current_data_rows_render_change = false;
    }
}
class HeaderItem {
    header_own_key;
    header_title;
    header_render_status = true;
    header_format_to = "default";
    header_footer_function = "default";
    constructor(key) {
        this.header_own_key = key;
        this.header_title = key;
    }
    switchRenderStatus() {
        this.render_status = !this.render_status;
    }
    get key() {
        return this.header_own_key;
    }
    get title() {
        return this.header_title;
    }
    get render_status() {
        return this.header_render_status;
    }
    get format_to() {
        return this.header_format_to;
    }
    get footer_function() {
        return this.header_footer_function;
    }
    set title(title) {
        this.header_title = title;
    }
    set render_status(render) {
        this.header_render_status = render;
    }
    set format_to(format_to) {
        this.header_format_to = format_to;
    }
    set footer_function(footer_function) {
        this.header_footer_function = footer_function;
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
        this.render = !this.render;
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
    set render(render) {
        this.data_row_render_status = render;
    }
}
