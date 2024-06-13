import { Type } from "../CreateTableFromJsonArray.js";
import { Utils } from "../CreateTableFromJsonArray.js";

export class TableDataSource {
    private readonly table_data_source_header: HeaderContainer
    private readonly table_data_source_rows: DataRowsContainer

    constructor(json_array: Type.JsonArray) {
        const keys = Utils.Data.getKeysFromJsonObject(json_array[0]);
        
        this.table_data_source_header = new HeaderContainer(keys);
        this.table_data_source_rows = new DataRowsContainer(json_array);
    }

    get Header(): HeaderContainer {
        return this.table_data_source_header;
    }

    get DataRows(): DataRowsContainer {
        return this.table_data_source_rows;
    }
}


class HeaderContainer {
    private readonly initial_data_header_items: Type.Header = {};
    private current_data_header_render_items: Type.Header = {};
    private current_data_header_render_items_change = false;
    
    constructor(json_object_keys: Array<string>) {
        for(const key of json_object_keys) {
            const header_item = new HeaderItem(key)
            this.initial_data_header_items[key] = header_item;
            this.current_data_header_render_items[key] = header_item;
        }
    }

    isKey(key: string): boolean {
        return key in this.items;
    }

    refreshCurrentRenderItems(): void {
        if(this.current_data_header_render_items_change === false) {
            this.setCurrentRenderItems();
        }
    }

    private setCurrentRenderItems() {
        const render_items: Type.Header = {}
        for(const key in this.items) {
            if(this.items[key].render_status === true) {
                render_items[key] = this.items[key]
            }
        }
        this.current_data_header_render_items = render_items;
        this.current_data_header_render_items_change = false;
    }
    
    // # Render Section
    // ## Render Setters 

    setRenderWithKeys(keys: string[]) {
        if(this.isAllKeysValid(keys)) { 
            for(const key in this.items) {
                if(keys.includes(key)) {
                    this.items[key].render_status = true;
                } else {
                    this.items[key].render_status = false;
                }
            }
            this.current_data_header_render_items_change = true;
            this.refreshCurrentRenderItems();
        }
    }

    // ## Render Getters

    private getRenderOption(prop: Type.Option.Header): Type.Indexable.Primitive {
        const option: Type.Indexable.Primitive = {};
        const current_items = this.getRenderItems();
        for(const key in current_items) {
            option[key] = current_items[key][prop];
        }
        return option;
    }

    getRenderItems(): Type.Header {
        this.refreshCurrentRenderItems();
        return this.current_data_header_render_items;
    }

    getRenderKeys(): string[] {
        this.refreshCurrentRenderItems();
        return Object.keys(this.getRenderItems());
    }

    // ## Render Options Getters

    getRenderTitles(): Type.Indexable.Primitive {
        this.refreshCurrentRenderItems();
        return this.getRenderOption("title")
    }

    getRenderFormatTo(): Type.Indexable.Primitive {
        this.refreshCurrentRenderItems();
        return this.getRenderOption("format_to");
    }

    getRenderFooterFunction(): Type.Indexable.Primitive {
        this.refreshCurrentRenderItems();
        return this.getRenderOption("footer_function");
    }
    
    // # Vanilla Section
    // ## Getters

    private getOption(prop: Type.Option.Header): Type.Indexable.Primitive {
        const option: Type.Indexable.Primitive = {}
        for(const key in this.items) {
            option[key] = this.items[key][prop];
        }
        return option;
    }

    get items(): Type.Header {
        return this.initial_data_header_items;
    }

    get keys(): string[] {
        return Object.keys(this.items);
    }

    // ## Options Getters

    get titles(): Type.Indexable.Primitive {
        return this.getOption("title");
    }

    get render_status(): Type.Indexable.Primitive {
        return this.getOption("render_status");
    }

    get format_options(): Type.Indexable.Primitive {
        return this.getOption("format_to");
    }

    get footer_fn_options(): Type.Indexable.Primitive {
        return this.getOption("footer_function");
    }

    // ## Options Setters

    private isAllKeysValid(keys: string[]): boolean {
        for(const key of keys) {
            if(!this.isKey(key)) { 
                this.keyNotFound(key)
                return false;
            }
        }
        return true
    }
    
    set titles(option_header_titles: Type.Indexable.String) {
        if(this.isAllKeysValid(Object.keys(option_header_titles))) { 
            for(const key in option_header_titles) {
                this.items[key].title = option_header_titles[key]
            }
        }
    }

    set format_options(option_header_format_to: Type.Indexable.FormatTo) {
        if(this.isAllKeysValid(Object.keys(option_header_format_to))) { 
            for(const key in option_header_format_to) {
                this.items[key].format_to = option_header_format_to[key]
            }
        }
    }

    set footer_fn_options(option_header_footer_function: Type.Indexable.FooterFunction) {
        if(this.isAllKeysValid(Object.keys(option_header_footer_function))) { 
            for(const key in option_header_footer_function) {
                this.items[key].footer_function = option_header_footer_function[key]
            }
        }
    }

    // # Alerts Section

    private keyNotFound(key: string) {
        throw new Error(`Key: "${key}" Not Found`);
    }
}

class DataRowsContainer {
    private readonly data_rows_array: Type.DataRows = [];
    private data_row_current_last_id: number = 0;

    private current_data_rows_render: Type.DataRows = [];
    private current_data_rows_render_change = false;

    constructor(json_array: Type.JsonArray) {
        for(let i = 1; i <= json_array.length; i++) {
            const data_row = new DataRow(i, json_array[i])
            this.data_rows_array.push(data_row);
            this.current_data_rows_render.push(data_row);
            this.data_row_current_last_id = i;
        }
    }

    refreshCurrentRenderArray() {
        if(this.current_data_rows_render_change === true) {
            this.setCurrentRenderArray();
        }
    }

    // # Getters

    getRenderArray() {
        this.refreshCurrentRenderArray();
        return this.current_data_rows_render;
    }

    get array() {
        return this.data_rows_array;
    }

    get ids() {
        const rows_id: Array<number> = []
        for(const data_row of this.array) {
            rows_id.push(data_row.id)
        }
        return rows_id;
    }

    get json_array() {
        const json_array: Type.JsonArray = []
        for(const data_row of this.array) {
            json_array.push(data_row);
        }
        return json_array
    }

    get current_last_id() {
        return this.data_row_current_last_id;
    }

    // # Setters

    private setCurrentRenderArray() {
        const current_render = [];
        for (const data_row of this.array) {
            if(data_row.render_status === true) {
                current_render.push(data_row);
            }
        }
        this.current_data_rows_render = current_render;
        this.current_data_rows_render_change = false;
    }
}

class HeaderItem {
    private readonly header_own_key: string; // Provavelmente essa propriedade será removida
    private header_title: string;
    private header_render_status: boolean = true;
    private header_format_to: Type.Option.FormatTo = "default";
    private header_footer_function: string = "default";

    constructor(key: string) {
        this.header_own_key = key;
        this.header_title = key;
    }

    switchRenderStatus(): void {
        this.render_status = !this.render_status;
    }

    // ---------------------- Getters ---------------------- //

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

    // ---------------------- Setters ---------------------- //

    set title(title: string) {
        this.header_title = title;
    }

    set render_status(render: boolean) {
        this.header_render_status = render;
    }

    set format_to(format_to: Type.Option.FormatTo) {
        this.header_format_to = format_to;
    }

    set footer_function(footer_function: string) {
        this.header_footer_function = footer_function;
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
        this.render = !this.render
    }

    // ---------------------- Getters ---------------------- //

    get id() {
        return this.data_row_id;
    }

    get json_object() {
        return this.data_row_json_object;
    }

    get render_status() {
        return this.data_row_render_status;
    }

    // ---------------------- Setters ---------------------- //

    set render(render: boolean) {
        this.data_row_render_status = render;
    }
}