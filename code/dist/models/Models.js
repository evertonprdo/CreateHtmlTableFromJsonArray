export var Models;
(function (Models) {
    class Main {
        data;
        constructor(data, headers) {
            this.data = new DataArray(data);
            this.data.setDataHeaders(data, headers);
        }
    }
    Models.Main = Main;
    class DataArray {
        data;
        headers = {};
        constructor(data) {
            this.data = data;
        }
        static getHeadersFromJsonArray(data, prefix = '') {
            const obj = data[0];
            let paths = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const new_key = prefix ? `${prefix}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        Object.assign(paths, this.getHeadersFromJsonArray(obj[key], new_key));
                    }
                    else {
                        paths[new_key] = new_key;
                    }
                }
            }
            return paths;
        }
        setDataHeaders(data, headers) {
            let result = {};
            if (headers) {
                if (headers instanceof Array) {
                    headers.forEach(key => {
                        result[key] = key;
                    });
                }
            }
            else {
                result = DataArray.getHeadersFromJsonArray(data);
            }
            this.headers = result;
            return result;
        }
    }
})(Models || (Models = {}));
