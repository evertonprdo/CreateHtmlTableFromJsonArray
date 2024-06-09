export var Models;
(function (Models) {
    class DataArray {
        data_array;
        data_headers;
        constructor(data) {
            this.data_array = data;
            let header = {};
            DataArray.getKeysFromJsonObject(data[0]).forEach(key => {
                header[key] = {
                    "render": true,
                    "title": key
                };
            });
            this.data_headers = header;
        }
        static getKeysFromJsonObject(obj, prefix = '') {
            let paths = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const new_key = prefix ? `${prefix}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        paths = paths.concat(this.getKeysFromJsonObject(obj[key], new_key));
                    }
                    else {
                        if (Array.isArray(obj[key])) {
                            paths.push(new_key + '[]');
                        }
                        else {
                            paths.push(new_key);
                        }
                    }
                }
            }
            return paths;
        }
        isHeaderKey(key) {
            return key in this.headers;
        }
        setHeaderTitle(key, title) {
            this.headers[key].title = title;
        }
        switchRender(key) {
            this.headers[key].render = !this.headers[key].render;
        }
        setRender(headers) {
            this.keys.forEach(key => {
                if (headers.includes(key)) {
                    this.headers[key].render = true;
                }
                else {
                    this.headers[key].render = false;
                }
            });
        }
        getRenderKeys(render = true) {
            const keys = [];
            Object.keys(this.headers).forEach(key => {
                if (this.headers[key].render === render)
                    keys.push(key);
            });
            return keys;
        }
        get data() {
            return this.data_array;
        }
        get keys() {
            return Object.keys(this.data_headers);
        }
        get headers() {
            return this.data_headers;
        }
    }
    Models.DataArray = DataArray;
})(Models || (Models = {}));
