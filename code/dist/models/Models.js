import { Utils } from "../utils/Utils.js";
export var Models;
(function (Models) {
    class JsonArray {
        class_data;
        class_headers;
        constructor(data) {
            this.class_data = new Data(data);
            this.class_headers = new Headers(Utils.Data.getKeysFromJsonObject(data[0]));
        }
        get Data() {
            return this.class_data;
        }
        get Headers() {
            return this.class_headers;
        }
    }
    Models.JsonArray = JsonArray;
    class Headers {
        object_headers;
        constructor(keys) {
            const headers = {};
            for (const key of keys) {
                headers[key] = {
                    "title": key,
                    "render": true,
                    "format_to": "default",
                    "is_column_sum": false
                };
            }
            this.object_headers = headers;
        }
        isKey(key) {
            return key in this.headers;
        }
        switchRender(key) {
            if (!this.isKey(key))
                this.keyNotFound(key);
            this.headers[key].render = !this.headers[key].render;
        }
        switchColumnSum(key) {
            if (!this.isKey(key))
                this.keyNotFound(key);
            this.headers[key].is_column_sum = !this.headers[key].is_column_sum;
        }
        pop(key) {
            if (!this.isKey(key))
                this.keyNotFound(key);
            if (this.headers[key].render === true)
                this.switchRender(key);
        }
        push(key) {
            if (!this.isKey(key))
                this.keyNotFound(key);
            if (this.headers[key].render === false)
                this.switchRender(key);
        }
        get headers() {
            return this.object_headers;
        }
        getRender(bol = true) {
            const render = {};
            Object.keys(this.headers).forEach(key => {
                if (this.headers[key].render === bol)
                    render[key] = this.headers[key];
            });
            return render;
        }
        get keys() {
            return Object.keys(this.headers);
        }
        getRenderKeys(bol = true) {
            return Object.keys(this.getRender(bol));
        }
        get titles() {
            const result = {};
            for (const key in this.headers) {
                result[key] = this.headers[key].title;
            }
            return result;
        }
        getRenderTitles(bol = true) {
            const result = {};
            for (const key in this.getRender(bol)) {
                result[key] = this.headers[key].title;
            }
            return result;
        }
        get format_to() {
            const result = {};
            this.keys.forEach(key => {
                result[key] = this.headers[key].format_to;
            });
            return result;
        }
        get render_format() {
            const result = {};
            for (const key in this.getRender()) {
                result[key] = this.headers[key].format_to;
            }
            return result;
        }
        get render_column_some() {
            const result = [];
            for (const key in this.getRender()) {
                if (this.headers[key].is_column_sum) {
                    result.push(key);
                }
            }
            return result;
        }
        setRender(headers) {
            for (const key of headers) {
                if (!this.isKey(key))
                    this.keyNotFound(key);
            }
            this.keys.forEach(key => {
                if (headers.includes(key)) {
                    this.push(key);
                }
                else {
                    this.pop(key);
                }
            });
        }
        setTitleProperty(key, title) {
            if (!this.isKey(key))
                this.keyNotFound(key);
            this.headers[key].title = title;
        }
        setTitle(header, title) {
            if (typeof header === "object" && header !== null) {
                for (const key in header) {
                    if (!this.isKey(key))
                        this.keyNotFound(key);
                }
                for (const key in header) {
                    this.setTitleProperty(key, header[key]);
                }
            }
            else if (typeof header === "string" && title) {
                if (!this.isKey(header))
                    this.keyNotFound(header);
                this.setTitleProperty(header, title);
            }
            else {
                throw new Error(`Os titulos não foram definidos para: "${header}", "${title}"`);
            }
        }
        setFormatToProperty(key, type) {
            if (!this.isKey(key))
                this.keyNotFound(key);
            this.headers[key].format_to = type;
        }
        setFormatTo(header, type) {
            if (typeof header === "object" && header !== null) {
                for (const key in header) {
                    if (!this.isKey(key))
                        this.keyNotFound(key);
                }
                for (const key in header) {
                    this.setFormatToProperty(key, header[key]);
                }
            }
            else if (typeof header === "string" && type) {
                if (!this.isKey(header))
                    this.keyNotFound(header);
                this.setFormatToProperty(header, type);
            }
            else {
                throw new Error(`formatTo não foram definidos para: "${header}", "${type}"`);
            }
        }
        keyNotFound(key) {
            throw new Error(`"${key}" Not Found`);
        }
    }
    class Data {
        data_json_array;
        constructor(data) {
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                const data_item = {
                    "id": i,
                    "row": data[i],
                    "render": true
                };
                arr.push(data_item);
            }
            this.data_json_array = arr;
        }
        isId(id) {
            return (this.data.length >= id && id >= 0);
        }
        switchRender(id) {
            if (!this.isId(id))
                this.IdNotFound(id);
            this.data[id].render = !this.data[id].render;
        }
        pop(id) {
            if (!this.isId(id))
                this.IdNotFound(id);
            if (this.data[id].render === true) {
                this.switchRender(id);
            }
        }
        push(id) {
            if (!this.isId(id))
                this.IdNotFound(id);
            if (this.data[id].render === false)
                this.switchRender(id);
        }
        get data() {
            return this.data_json_array;
        }
        get array() {
            const result = [];
            this.data.forEach(item => {
                let row = item.row;
                result.push(row);
            });
            return result;
        }
        getRenderArray(bol = true) {
            const result = [];
            this.data.forEach(item => {
                if (item.render === bol) {
                    result.push(item.row);
                }
            });
            return result;
        }
        setRender(ids) {
            for (const id of ids) {
                if (!this.isId(id)) {
                    this.IdNotFound(id);
                }
            }
            for (let i = 0; i < this.data.length; i++) {
                if (ids.includes(this.data[i].id)) {
                    this.push(this.data[i].id);
                }
                else {
                    this.pop(this.data[i].id);
                }
            }
        }
        IdNotFound(id) {
            throw new Error(`Row: "${id}" Not Found`);
        }
    }
    class Compose {
        formatCellToString(value, type) {
            if (type) {
                return Utils.Format.valueTo(value, type);
            }
            else {
                return Utils.Format.valueToString(value);
            }
        }
        formatRowToString(row, headers, format_to = true) {
            const result = {};
            for (const key in headers) {
                if (format_to) {
                    result[key] = this.formatCellToString(Utils.Data.getNestedProperty(row, key), headers[key].format_to);
                }
                else {
                    result[key] = this.formatCellToString(Utils.Data.getNestedProperty(row, key));
                }
            }
            return result;
        }
        tableBody(rows, headers) {
            const result = [];
            for (let i = 0; i < rows.length; i++) {
                result[i] = this.formatRowToString(rows[i], headers);
            }
            return result;
        }
        tableHead(titles, headers) {
            return this.formatRowToString(titles, headers, false);
        }
        tableFoot(values, headers) {
            const result = {};
            for (const key in headers) {
                if (Object.keys(values).includes(key)) {
                    result[key] = String(Utils.Format.valueToFloat(values[key]));
                }
                else {
                    result[key] = " - ";
                }
            }
            return result;
        }
    }
    Models.Compose = Compose;
})(Models || (Models = {}));
