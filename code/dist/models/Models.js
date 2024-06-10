import { Utils } from "../utils/Utils.js";
export var Models;
(function (Models) {
    class DataArray {
        data_array;
        data_headers;
        constructor(data) {
            this.data_array = data;
            let data_headers = {};
            Utils.Data.getKeysFromJsonObject(data[0]).forEach(key => {
                data_headers[key] = {
                    "render": true,
                    "title": key,
                    "format_to": "default",
                };
            });
            this.data_headers = data_headers;
        }
        isHeaderKey(key) {
            return key in this.headers;
        }
        switchRender(key) {
            if (!this.isHeaderKey(key))
                throw new Error(`"${key}" Not Found`);
            this.headers[key].render = !this.headers[key].render;
        }
        popHeader(key) {
            if (!this.isHeaderKey(key))
                throw new Error(`"${key}" Not Found`);
            if (this.headers[key].render === true)
                this.switchRender(key);
        }
        pushHeader(key) {
            if (!this.isHeaderKey(key))
                throw new Error(`"${key}" Not Found`);
            if (this.headers[key].render === false)
                this.switchRender(key);
        }
        get array() {
            return this.data_array;
        }
        get headers() {
            return this.data_headers;
        }
        get render_headers() {
            const render = this.headers;
            Object.keys(this.headers).forEach(key => {
                if (this.headers[key].render === false)
                    delete render[key];
            });
            return render;
        }
        get keys() {
            return Object.keys(this.headers);
        }
        get render_keys() {
            return Object.keys(this.render_headers);
        }
        get render_titles() {
            const result = {};
            for (const key in this.render_headers) {
                result[key] = this.render_headers[key].title;
            }
            return result;
        }
        setRender(headers) {
            for (const key of headers) {
                if (!this.isHeaderKey(key))
                    throw new Error(`"${key}" Not Found`);
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
        setHeaderTitle(key, title) {
            if (!this.isHeaderKey(key))
                throw new Error(`"${key}" Not Found`);
            this.headers[key].title = title;
        }
        setTitles(header, title) {
            if (typeof header === "object" && header !== null) {
                for (const key in header) {
                    if (!this.isHeaderKey(key))
                        throw new Error(`"${key}" Not Found`);
                }
                for (const key in header) {
                    this.setHeaderTitle(key, header[key]);
                }
            }
            else if (typeof header === "string" && title) {
                if (!this.isHeaderKey(header))
                    throw new Error(`"${header}" Not Found`);
                this.setHeaderTitle(header, title);
            }
            else {
                throw new Error(`Os titulos não foram definidos para: "${header}", "${title}"`);
            }
        }
    }
    Models.DataArray = DataArray;
})(Models || (Models = {}));
