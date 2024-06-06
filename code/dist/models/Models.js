export class DataObject {
    data;
    data_opts;
    default_records;
    constructor(records, headers) {
        this.data = records;
        this.default_records = records;
        this.data_opts = new Option.Data(headers);
    }
    get headers() {
        return this.data_opts.headers;
    }
    get records() {
        return this.data;
    }
    get defaultData() {
        return this.default_records;
    }
}
export var Option;
(function (Option) {
    class Renderer {
        pagination;
        constructor() {
            this.pagination = { 'limit_rows': '25' };
        }
    }
    Option.Renderer = Renderer;
    class Data {
        header;
        constructor(headers) {
            this.header = headers;
        }
        get headers() {
            return this.header;
        }
    }
    Option.Data = Data;
    class Html {
        attribute = {};
        setOption(key, value) {
            this.attribute[key] = value;
        }
        removeOption(key) {
            delete this.attribute[key];
        }
        clearOptions() {
            Object.keys(this.attribute).forEach(key => {
                this.removeOption(key);
            });
        }
        get options() {
            return this.attribute;
        }
    }
    Option.Html = Html;
})(Option || (Option = {}));
