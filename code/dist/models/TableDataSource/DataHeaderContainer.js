export class HeaderContainer {
    data_header_items = {};
    constructor(json_object_keys) {
        for (const key of json_object_keys) {
            const header_item = new HeaderItem(key);
            this.data_header_items[key] = header_item;
        }
    }
    isKey(key) {
        return key in this.items;
    }
    isAllKeysValid(keys) {
        for (const key of keys) {
            if (!this.isKey(key)) {
                return key;
            }
        }
        return true;
    }
    turnRenderOnWithIndexArray(keys) {
        const is_valid_key = this.isAllKeysValid(keys);
        if (!(is_valid_key === true)) {
            this.keyNotFound(is_valid_key);
        }
        for (const key in this.items) {
            if (keys.includes(key)) {
                this.items[key].render_status = true;
            }
            else {
                this.items[key].render_status = false;
            }
        }
    }
    buildIndexableProperty(prop, only_render) {
        const option = {};
        const current_items = (only_render === true ?
            this.getRenderItems() :
            this.items);
        for (const key in current_items) {
            option[key] = current_items[key][prop];
        }
        return option;
    }
    getRenderItems() {
        const render_items = {};
        for (const key in this.items) {
            if (this.items[key].render_status === true) {
                render_items[key] = this.items[key];
            }
        }
        return render_items;
    }
    setBatchRenderStatus(index_status, set_omitted_keys_to_false = false) {
        const batch_keys = Object.keys(index_status);
        const is_all_keys_valid = this.isAllKeysValid(batch_keys);
        if (!(is_all_keys_valid === true)) {
            this.keyNotFound(is_all_keys_valid);
        }
        const change_keys = (set_omitted_keys_to_false === true ?
            batch_keys : batch_keys.concat(this.getRenderKeys()));
        for (const key of this.keys) {
            if (!(change_keys.includes(key))) {
                this.items[key].render_status = false;
            }
            else if (batch_keys.includes(key)) {
                this.items[key].render_status = index_status[key];
            }
        }
    }
    setBatchTitles(index_titles) {
        const is_all_keys_valid = this.isAllKeysValid(Object.keys(index_titles));
        if (!(is_all_keys_valid === true)) {
            this.keyNotFound(is_all_keys_valid);
        }
        for (const key in index_titles) {
            this.items[key].title = index_titles[key];
        }
    }
    setBatchFormatOptions(index_format_to) {
        const is_all_keys_valid = this.isAllKeysValid(Object.keys(index_format_to));
        if (!(is_all_keys_valid === true)) {
            this.keyNotFound(is_all_keys_valid);
        }
        for (const key in index_format_to) {
            this.items[key].format_to = index_format_to[key];
        }
    }
    setBatchFooterFunctions(index_footer_function) {
        const is_all_keys_valid = this.isAllKeysValid(Object.keys(index_footer_function));
        if (!(is_all_keys_valid === true)) {
            this.keyNotFound(is_all_keys_valid);
        }
        for (const key in index_footer_function) {
            this.items[key].footer_function = index_footer_function[key];
        }
    }
    getRenderKeys() {
        return Object.keys(this.getRenderItems());
    }
    getRenderTitles() {
        return this.buildIndexableProperty("title", true);
    }
    getRenderFormatTo() {
        return this.buildIndexableProperty("format_to", true);
    }
    getRenderFooterFunction() {
        return this.buildIndexableProperty("footer_function", true);
    }
    get items() {
        return this.data_header_items;
    }
    get keys() {
        return Object.keys(this.items);
    }
    getTitles() {
        return this.buildIndexableProperty("title", false);
    }
    getRenderStatus() {
        return this.buildIndexableProperty("render_status", false);
    }
    getFormatOptions() {
        return this.buildIndexableProperty("format_to", false);
    }
    getFooterFnOptions() {
        return this.buildIndexableProperty("footer_function", false);
    }
    keyNotFound(key) { throw new Error(`Key: "${key}" Not Found`); }
}
class HeaderItem {
    header_key;
    title;
    render_status = true;
    format_to = "default";
    footer_function = "default";
    constructor(key) {
        this.header_key = key;
        this.title = key;
    }
    switchRenderStatus() {
        this.render_status = !this.render_status;
    }
    get key() {
        return this.header_key;
    }
}
