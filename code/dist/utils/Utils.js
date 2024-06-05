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
        static makeMyOwnDomTableDataObject(html_query) {
            const my_table = document.querySelector(html_query);
            if (!(my_table instanceof HTMLTableElement))
                throw new Error(`"${html_query}" não é um HTMLTableElement`);
            const ths = my_table.querySelectorAll('thead th, thead td');
            const trs = my_table.querySelectorAll('tbody tr');
            if (ths.length === 0 && trs.length === 0)
                throw new Error(`Nenhuma tr, th ou td econtrada em "${html_query}"`);
            function pushKeys(ths) {
                const keys = [];
                let sufix = 1;
                ths.forEach(th => {
                    let x = Common.stringToSlug(th.innerText, true);
                    if (keys.includes(x)) {
                        x += '-d-' + sufix;
                        sufix++;
                    }
                    keys.push(x);
                });
                return keys;
            }
            const has_ths = ths.length > 0 ? true : false;
            const result = [];
            let arr_key = [];
            if (has_ths) {
                arr_key = arr_key.concat(arr_key, pushKeys(ths));
            }
            else {
                let body_ths = null;
                let count = 0;
                for (let i = 0; i < trs.length; i++) {
                    let tr = trs[i];
                    let l_ths = tr.querySelectorAll('td, th');
                    if (l_ths.length > count) {
                        count = l_ths.length;
                        body_ths = l_ths;
                    }
                }
                if (body_ths === null || body_ths.length === 0)
                    throw new Error(`Nenhuma th ou td econtrada em "${html_query}"`);
                arr_key = arr_key.concat(arr_key, pushKeys(body_ths));
            }
            if (trs.length > 0) {
                trs.forEach(tr => {
                    const item = {};
                    const body_tds = tr.querySelectorAll('td, th');
                    for (let i = 0; i < arr_key.length; i++) {
                        if (body_tds[i]) {
                            let inner_text = body_tds[i].innerText;
                            if (inner_text) {
                                item[arr_key[i]] = inner_text;
                            }
                            else {
                                item[arr_key[i]] = body_tds[i].innerHTML;
                            }
                        }
                        else {
                            item[arr_key[i]] = null;
                        }
                    }
                    result.push(item);
                });
            }
            return result;
        }
        static doAllColumnsMatch(data, reff) {
        }
    }
    Utils.Data = Data;
    class Html {
    }
    Utils.Html = Html;
})(Utils || (Utils = {}));
