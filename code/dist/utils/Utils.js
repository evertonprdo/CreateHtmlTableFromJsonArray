export var Utils;
(function (Utils) {
    const content_limit = 50;
    const arr_slice = 2;
    const arr_resume_inner = true;
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
    }
    Utils.Common = Common;
    class Format {
        static resumeString(str, limit = content_limit) {
            if (str.length > limit) {
                str = str.slice(0, limit - 3) + "...";
            }
            return str;
        }
        static resumeArrayContent(arr) {
            let size = arr.length;
            if (size === 0)
                return "(0)Arr[]";
            arr = arr.slice(0, arr_slice);
            let inner_limit = (Math.round(content_limit / arr.length) - 9);
            inner_limit = inner_limit < 3 ? 3 : inner_limit;
            let head = `(${size})Arr[`;
            let body;
            let end;
            if (size > arr_slice) {
                end = ", [...]";
            }
            else {
                end = "]";
            }
            if (typeof arr[0] === "object" && arr[0] !== null) {
                body = "{...}";
            }
            else {
                if (arr_resume_inner) {
                    body = this.resumeString(String(arr[0]), inner_limit);
                }
                else {
                    body = String(arr[0]);
                }
            }
            for (let i = 1; i < arr.length; i++) {
                if (typeof arr[i] === "object" && arr[i] !== null) {
                    head += ", {...}";
                }
                else {
                    if (arr_resume_inner) {
                        head += ", " + this.resumeString(String(arr[i]), inner_limit);
                    }
                    else {
                        head += ", " + String(arr[i]);
                    }
                }
            }
            if (size > arr_slice) {
                head += ", [...]";
            }
            return head += "]";
        }
    }
    Utils.Format = Format;
})(Utils || (Utils = {}));
