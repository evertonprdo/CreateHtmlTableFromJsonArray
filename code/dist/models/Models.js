import { Utils } from "../utils/Utils.js";
export var Models;
(function (Models) {
    class JsonArray {
        data_json_array;
        headers_json_array;
        constructor(data) {
            this.data_json_array = data;
            let headers = {};
            Utils.Data.getKeysFromJsonObject(data[0]).forEach(key => {
                headers[key] = {
                    "render": true,
                    "title": key,
                    "format_to": "default",
                };
            });
            this.headers_json_array = headers;
        }
        isHeaderKey(key) {
            return key in this.headers;
        }
        switchRender(key) {
            if (!this.isHeaderKey(key))
                this.keyNotFound(key);
            this.headers[key].render = !this.headers[key].render;
        }
        popHeader(key) {
            if (!this.isHeaderKey(key))
                this.keyNotFound(key);
            if (this.headers[key].render === true)
                this.switchRender(key);
        }
        pushHeader(key) {
            if (!this.isHeaderKey(key))
                this.keyNotFound(key);
            if (this.headers[key].render === false)
                this.switchRender(key);
        }
        get array() {
            return this.data_json_array;
        }
        get headers() {
            return this.headers_json_array;
        }
        get render_headers() {
            const render = {};
            Object.keys(this.headers).forEach(key => {
                if (this.headers[key].render === true)
                    render[key] = this.headers[key];
            });
            return render;
        }
        get keys() {
            return Object.keys(this.headers);
        }
        get render_keys() {
            return Object.keys(this.render_headers);
        }
        get titles() {
            const result = {};
            for (const key in this.headers) {
                result[key] = this.headers[key].title;
            }
            return result;
        }
        get render_titles() {
            const result = {};
            for (const key in this.render_headers) {
                result[key] = this.headers[key].title;
            }
            return result;
        }
        get format() {
            const result = {};
            this.keys.forEach(key => {
                result[key] = this.headers[key].format_to;
            });
            return result;
        }
        get render_format() {
            const result = {};
            for (const key in this.render_headers) {
                result[key] = this.headers[key].format_to;
            }
            return result;
        }
        setHeaderRender(headers) {
            for (const key of headers) {
                if (!this.isHeaderKey(key))
                    this.keyNotFound(key);
            }
            this.keys.forEach(key => {
                if (headers.includes(key)) {
                    this.pushHeader(key);
                }
                else {
                    this.popHeader(key);
                }
            });
        }
        setHeaderTitleProperty(key, title) {
            if (!this.isHeaderKey(key))
                this.keyNotFound(key);
            this.headers[key].title = title;
        }
        setHeaderTitle(header, title) {
            if (typeof header === "object" && header !== null) {
                for (const key in header) {
                    if (!this.isHeaderKey(key))
                        this.keyNotFound(key);
                }
                for (const key in header) {
                    this.setHeaderTitleProperty(key, header[key]);
                }
            }
            else if (typeof header === "string" && title) {
                if (!this.isHeaderKey(header))
                    this.keyNotFound(header);
                this.setHeaderTitleProperty(header, title);
            }
            else {
                throw new Error(`Os titulos não foram definidos para: "${header}", "${title}"`);
            }
        }
        setHeaderFormatToProperty(key, type) {
            if (!this.isHeaderKey(key))
                this.keyNotFound(key);
            this.headers[key].format_to = type;
        }
        setFormatTo(header, type) {
            if (typeof header === "object" && header !== null) {
                for (const key in header) {
                    if (!this.isHeaderKey(key))
                        this.keyNotFound(key);
                }
                for (const key in header) {
                    this.setHeaderFormatToProperty(key, header[key]);
                }
            }
            else if (typeof header === "string" && type) {
                if (!this.isHeaderKey(header))
                    this.keyNotFound(header);
                this.setHeaderFormatToProperty(header, type);
            }
            else {
                throw new Error(`formatTo não foram definidos para: "${header}", "${type}"`);
            }
        }
        keyNotFound(key) {
            throw new Error(`"${key}" Not Found`);
        }
    }
    Models.JsonArray = JsonArray;
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
    }
    Models.Compose = Compose;
})(Models || (Models = {}));
