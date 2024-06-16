import { Type } from "../../CreateTableFromJsonArray.js";

export class HeaderContainer {
    private readonly data_header_items: Type.Header = {};
    
    constructor(json_object_keys: Array<string>) {
        for(const key of json_object_keys) {
            const header_item = new HeaderItem(key)
            this.data_header_items[key] = header_item;
        }
    }

    isKey(key: string): boolean { 
        return key in this.items; 
    }
    private isAllKeysValid(keys: string[]): true | string {
        for(const key of keys) {
            if(!this.isKey(key)) { 
                return key;
            }
        }
        return true
    }

    turnRenderOnWithIndexArray(keys: string[]): void {
        const is_valid_key = this.isAllKeysValid(keys)
        if(!(is_valid_key === true)) { this.keyNotFound(is_valid_key) }

        for(const key in this.items) {
            if(keys.includes(key)) {
                this.items[key].render_status = true;
            } else {
                this.items[key].render_status = false;
            }
        }
    }

    private buildIndexableProperty(prop: Type.Option.Header, only_render: boolean): Type.Indexable.Primitive {
        const option: Type.Indexable.Primitive = {};
        const current_items: Type.Header = (
            only_render === true ?
            this.getRenderItems() :
            this.items
        );
        for(const key in current_items) {
            option[key] = current_items[key][prop];
        }
        return option;
    }

    getRenderItems(): Type.Header {
        const render_items: Type.Header = {};
        for(const key in this.items) {
            if(this.items[key].render_status === true) { 
                render_items[key] = this.items[key] 
            }
        }
        return render_items;
    }

//  # Batch Setters
    setBatchRenderStatus(
        index_status: Type.Indexable.Boolean,
        set_omitted_keys_to_false = false
    ): void 
    { 
        const batch_keys = Object.keys(index_status);
        
        const is_all_keys_valid = this.isAllKeysValid(batch_keys)
        if(!(is_all_keys_valid === true)) { this.keyNotFound(is_all_keys_valid as string); }
        
        const change_keys = (set_omitted_keys_to_false === true ?
            batch_keys : batch_keys.concat(this.getRenderKeys())
        )
        for(const key of this.keys) {
            if(!(change_keys.includes(key))) {
                this.items[key].render_status = false;
            } else if(batch_keys.includes(key)) {
                this.items[key].render_status = index_status[key];
            }
        }
    }
    setBatchTitles(index_titles: Type.Indexable.String): void { 
        const is_all_keys_valid = this.isAllKeysValid(Object.keys(index_titles))
        if(!(is_all_keys_valid === true)) { this.keyNotFound(is_all_keys_valid as string); }

        for(const key in index_titles) {
            this.items[key].title = index_titles[key]
        }
    }
    setBatchFormatOptions(index_format_to: Type.Indexable.FormatTo): void { 
        const is_all_keys_valid = this.isAllKeysValid(Object.keys(index_format_to))
        if(!(is_all_keys_valid === true)) { this.keyNotFound(is_all_keys_valid as string); }

        for(const key in index_format_to) {
            this.items[key].format_to = index_format_to[key]
        }
    }
    setBatchFooterFunctions(index_footer_function: Type.Indexable.FooterFunction): void { 
        const is_all_keys_valid = this.isAllKeysValid(Object.keys(index_footer_function))
        if(!(is_all_keys_valid === true)) { this.keyNotFound(is_all_keys_valid as string); }

        for(const key in index_footer_function) {
            this.items[key].footer_function = index_footer_function[key]
        }
    }

//  # Getters
    getRenderKeys(): string[] {
        return Object.keys(this.getRenderItems());
    }
    getRenderTitles(): Type.Indexable.String {
        return this.buildIndexableProperty("title", true) as Type.Indexable.String;
    }
    getRenderFormatTo(): Type.Indexable.FormatTo {
        return this.buildIndexableProperty("format_to", true) as Type.Indexable.FormatTo;
    }
    getRenderFooterFunction(): Type.Indexable.String { 
        return this.buildIndexableProperty("footer_function", true) as Type.Indexable.FooterFunction; 
    }

    get items(): Type.Header {
        return this.data_header_items;
    }
    get keys(): string[] {
        return Object.keys(this.items);
    }
    getTitles(): Type.Indexable.Primitive {
        return this.buildIndexableProperty("title", false);
    }
    getRenderStatus(): Type.Indexable.Primitive {
        return this.buildIndexableProperty("render_status", false);
    }
    getFormatOptions(): Type.Indexable.Primitive {
        return this.buildIndexableProperty("format_to", false);
    }
    getFooterFnOptions(): Type.Indexable.Primitive {
        return this.buildIndexableProperty("footer_function", false);
    }

//  # Alerts
    keyNotFound(key: string): void { throw new Error(`Key: "${key}" Not Found`); }
}

class HeaderItem {
    private readonly header_key: string;
    public title: string;
    public render_status: boolean = true;
    public format_to: Type.Option.FormatTo = "default";
    public footer_function: Type.Option.FooterFunction = "default";

    constructor(key: string) {
        this.header_key = key;
        this.title = key;
    }

    switchRenderStatus(): void {
        this.render_status = !this.render_status;
    }
    get key() { 
        return this.header_key;
    }
}