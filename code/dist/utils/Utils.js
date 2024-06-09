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
        static getNestedProperty(obj, path) {
            let result;
            let is_array = false;
            if (path.includes(".")) {
                if (path.endsWith('[]')) {
                    path = path.slice(0, -2);
                    is_array = true;
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
                    is_array = true;
                }
                else {
                    result = obj[path];
                }
            }
            if (is_array) {
                result = this.printArrayResume(result);
            }
            return result;
        }
        static resumeString(str) {
            const limit = 20;
            if (str.length > limit) {
                str = str.slice(0, limit) + "...";
            }
            return str;
        }
        static printArrayResume(arr) {
            arr = arr.slice(0, 3);
            let result = "Arr[" + this.resumeString(String(arr[0]));
            for (let i = 1; i < arr.length; i++) {
                result += ", " + this.resumeString(String(arr[i]));
            }
            if (arr.length >= 3) {
                result += ", [...]";
            }
            return result += "]";
        }
    }
    Utils.Common = Common;
})(Utils || (Utils = {}));
