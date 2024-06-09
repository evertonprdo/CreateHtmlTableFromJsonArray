export var Models;
(function (Models) {
    class DataArray {
        data_array;
        data_headers;
        constructor(data) {
            this.data_array = data;
            let aux = {};
            DataArray.getKeysFromJsonObject(data[0]).forEach(key => {
                aux["render"] = "On";
                aux[key] = key;
            });
            this.data_headers = aux;
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
            this.headers[key] = title;
        }
        switchState() {
        }
        removeKey(key) {
            if (this.del_keys.includes(key)) {
                this.del_keys.push(key);
                this.cur_keys.splice(this.cur_keys.indexOf(key), 1);
            }
        }
        appendKey(key) {
            if (this.del_keys.includes(key)) {
                this.cur_keys.push(key);
                delete this.deleted_headers[key];
            }
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
        get del_keys() {
            return this.deleted_keys;
        }
        get cur_keys() {
            return this.current_keys;
        }
    }
    Models.DataArray = DataArray;
})(Models || (Models = {}));
