import { Utils } from "../CreateTableFromJsonArray.js";
import { TableDataSource } from "./TableDataSource.js";
export var Models;
(function (Models) {
    function createNewTableDataSource(json_array) {
        return new TableDataSource(json_array);
    }
    Models.createNewTableDataSource = createNewTableDataSource;
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
        tableFoot(values, headers) {
            const result = {};
            for (const key in headers) {
                if (Object.keys(values).includes(key)) {
                    result[key] = String(Utils.Format.valueToFloat(values[key]));
                }
                else {
                    result[key] = " - ";
                }
            }
            return result;
        }
    }
    Models.Compose = Compose;
})(Models || (Models = {}));
