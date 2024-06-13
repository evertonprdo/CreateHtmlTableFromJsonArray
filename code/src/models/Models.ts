import { Utils, Type } from "../CreateTableFromJsonArray";
import { TableDataSource } from "./TableDataSource";

export namespace Models {
    export function createNewTableDataSource(json_array: Type.JsonArray): TableDataSource {
        return new TableDataSource(json_array)
    }

    export class Compose {
        private formatCellToString(value: unknown, type?: Type.Option.FormatTo): string  {
            if(type) {
                return Utils.Format.valueTo(value, type);
            } else {
                return Utils.Format.valueToString(value)
            }
        }

        private formatRowToString(row: Type.JsonObject, headers: Type.Header, format_to = true): Type.Indexable.String  {
            const result: Type.Indexable.String = {};
            for(const key in headers) {
                if(format_to) {
                    result[key] = this.formatCellToString(Utils.Data.getNestedProperty(row, key), headers[key].format_to)
                } else {
                    result[key] = this.formatCellToString(Utils.Data.getNestedProperty(row, key))
                }
            }
            return result
        }

        tableBody(rows: Type.JsonArray, headers: Type.Header): Type.Indexable.String[] {
            const result: Type.Indexable.String[] = [];
            for (let i = 0; i < rows.length; i++) {
                result[i] = this.formatRowToString(rows[i], headers);
            }
            return result
        }

        tableHead(titles: Type.Indexable.String, headers: Type.Header): Type.Indexable.String {
            return this.formatRowToString(titles, headers, false)
        }

        tableFoot(values: {[key: string]: number}, headers: Type.Header): Type.Indexable.String {
            const result: Type.Indexable.String = {};
            for(const key in headers) {
                if(Object.keys(values).includes(key)) {
                    result[key] = String(Utils.Format.valueToFloat(values[key]));
                } else {
                    result[key] = " - ";
                }
            }
            return result;
        }
    }
}