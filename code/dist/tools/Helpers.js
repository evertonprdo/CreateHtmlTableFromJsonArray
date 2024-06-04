export class Helpers {
    static getNestedProperty(obj, path) {
        const keys = path.split('.');
        return keys.reduce((prev, curr) => {
            return prev && prev[curr] !== undefined ? prev[curr] : undefined;
        }, obj);
    }
    static getAllPaths(obj, is_header = false, prefix = '') {
        let paths = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const new_key = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    Object.assign(paths, this.getAllPaths(obj[key], is_header, new_key));
                }
                else {
                    paths[new_key] = is_header ? obj[key] : new_key;
                }
            }
        }
        return paths;
    }
}
