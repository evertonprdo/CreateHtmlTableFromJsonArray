import { Resume } from "../config/Config.js";
export var Utils;
(function (Utils) {
    class Common {
        static stringToSlug(texto, keep_dot = false) {
            let result = texto.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\s.-]/g, '')
                .replace(/--+/g, '-')
                .replace(/^-+|-+$/g, '');
            if (!keep_dot)
                result = result.replace(/\./g, '');
            return result;
        }
    }
    Utils.Common = Common;
    class Data {
        static getNestedProperty(obj, path) {
            let result;
            if (path.includes(".")) {
                if (path.endsWith('[]')) {
                    path = path.slice(0, -2);
                }
                let keys = path.split(".");
                result = keys.reduce((acc, key) => {
                    if (acc && typeof acc === "object" && acc !== null) {
                        return acc[key];
                    }
                }, obj);
            }
            else {
                if (path.endsWith('[]')) {
                    result = obj[path.slice(0, -2)];
                }
                else {
                    result = obj[path];
                }
            }
            return result;
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
    }
    Utils.Data = Data;
    class Format {
        static resumeString(str, limit = Resume.content_limit) {
            if (str.length > limit) {
                str = str.slice(0, limit - 3) + "...";
            }
            return str;
        }
        static valueTo(value, type) {
            let result;
            switch (type) {
                case "FLOAT_FIX":
                    result = String(Utils.Format.valueToFloat(value));
                    break;
                case "DATE":
                    result = new Date(String(value)).toLocaleString();
                    break;
                case "CURRENCY":
                    result = "R$ " + Utils.Format.valueToFloat(value, 2).toLocaleString();
                    break;
                case "PERCENT":
                    result = String(Utils.Format.valueToFloat(value, 1)) + "%";
                    break;
                default:
                    result = Utils.Format.valueToString(value);
                    break;
            }
            return result;
        }
        static resumeArrayContent(arr, limit = Resume.content_limit, inner_resume_on = Resume.arr_resume_inner, slice_array = Resume.arr_slice) {
            let size = arr.length;
            if (size === 0)
                return "(0)Arr[]";
            let head = `(${size})Arr[`;
            let end = size > slice_array ? ", [...]]" : "]";
            arr = arr.slice(0, slice_array);
            let inner_limit = Math.round((limit - (((arr.length - 1) * 2) + head.length + end.length)) / arr.length);
            inner_limit = inner_limit < 3 ? 3 : inner_limit;
            let body;
            if (typeof arr[0] === "object" && arr[0] !== null) {
                body = "{...}";
            }
            else {
                if (inner_resume_on) {
                    body = this.resumeString(String(arr[0]), inner_limit);
                }
                else {
                    body = String(arr[0]);
                }
            }
            for (let i = 1; i < arr.length; i++) {
                if (typeof arr[i] === "object" && arr[i] !== null) {
                    body += ", {...}";
                }
                else {
                    if (inner_resume_on) {
                        body += ", " + this.resumeString(String(arr[i]), inner_limit);
                    }
                    else {
                        body += ", " + String(arr[i]);
                    }
                }
            }
            return head + body + end;
        }
        static valueToString(value) {
            if (value === undefined) {
                return "not found";
            }
            if (value === null) {
                return "null";
            }
            if (value === "") {
                return "empty";
            }
            if (Array.isArray(value)) {
                return Utils.Format.resumeArrayContent(value);
            }
            return Utils.Format.resumeString(String(value));
        }
        static valueToFloat(value, fix = Resume.float_fix) {
            if (typeof value === "number") {
                return parseFloat(value.toFixed(fix));
            }
            return Number(parseFloat(String(value)).toFixed(fix));
        }
    }
    Utils.Format = Format;
})(Utils || (Utils = {}));
