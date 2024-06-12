import { Type } from "../utils/Types.js";
import { Utils } from "../utils/Utils.js";

export namespace Models {
    export class JsonArray {
        private readonly class_data: Data;
        private readonly class_headers: Headers;

        constructor(data:Type.JsonArray) {
            this.class_data = new Data(data);
            this.class_headers = new Headers(Utils.Data.getKeysFromJsonObject(data[0]));
        }

        get Data(): Data {
            return this.class_data;
        }

        get Headers(): Headers {
            return this.class_headers;
        }
    }

    class Headers {
        private readonly object_headers: Type.Headers

        constructor(keys: string[]) {
            const headers: Type.Headers = {};
            for(const key of keys) {
                headers[key] = {
                    "title": key,
                    "render": true,
                    "format_to": "default",
                    "is_column_sum": false
                }
            }
            this.object_headers = headers
        }

        isKey(key: string): boolean {
            return key in this.headers;
        }

        switchRender(key:string): void {
            if(!this.isKey(key)) this.keyNotFound(key);
            this.headers[key].render = !this.headers[key].render;
        }

        switchColumnSum(key:string): void {
            if(!this.isKey(key)) this.keyNotFound(key);
            this.headers[key].is_column_sum = !this.headers[key].is_column_sum;
        }

        pop(key:string): void {
            if(!this.isKey(key)) this.keyNotFound(key);
            if(this.headers[key].render === true) this.switchRender(key);
        }

        push(key:string): void {
            if(!this.isKey(key)) this.keyNotFound(key);
            if(this.headers[key].render === false) this.switchRender(key);
        }



        // ---------------------- Getters ---------------------- //

        get headers() {
            return this.object_headers;
        }

        getRender(bol = true): Type.Headers {
            const render: Type.Headers = {};
            Object.keys(this.headers).forEach(key => {
                if(this.headers[key].render === bol)
                render[key] = this.headers[key];
            })
            return render;
        }

        get keys(): string[] {
            return Object.keys(this.headers);
        }

        getRenderKeys(bol = true): string[] {
            return Object.keys(this.getRender(bol));
        }

        get titles(): Type.ObjString {
            const result: Type.ObjString = {};
            for(const key in this.headers) {
                result[key] = this.headers[key].title
            }
            return result
        }

        getRenderTitles(bol = true): Type.ObjString {
            const result: Type.ObjString = {};
            for(const key in this.getRender(bol)) {
                result[key] = this.headers[key].title
            }
            return result
        }

        get format_to(): Type.ObjString {
            const result: Type.ObjString = {}
            this.keys.forEach(key => {
                result[key] = this.headers[key].format_to;
            })
            return result
        }

        get render_format(): Type.ObjString {
            const result: Type.ObjString = {};
            for(const key in this.getRender()) {
                result[key] = this.headers[key].format_to
            }
            return result
        }

        get render_column_some(): string[] {
            const result: string[] = [];
            for(const key in this.getRender()) {
                if(this.headers[key].is_column_sum) {
                    result.push(key);
                }
            }
            return result
        }

        // ---------------------- Setters ---------------------- //

        setRender(headers: string[]): void {
            for(const key of headers) { if(!this.isKey(key)) this.keyNotFound(key); }
            this.keys.forEach(key => {
                if(headers.includes(key)) {
                    this.push(key);
                } else {
                    this.pop(key);
                }
            })
        }

        private setTitleProperty(key: string, title: string): void {
            if(!this.isKey(key)) this.keyNotFound(key)
            this.headers[key].title = title;
        }

        setTitle(header:string | Type.ObjString, title?: string): void {
            if(typeof header === "object" && header !== null) {
                for(const key in header) {
                    if(!this.isKey(key)) this.keyNotFound(key);
                }
                for (const key in header) {
                    this.setTitleProperty(key, header[key]);
                }
            } else if(typeof header === "string" && title) {
                if(!this.isKey(header)) this.keyNotFound(header);
                this.setTitleProperty(header, title);
            } else {
                throw new Error(`Os titulos não foram definidos para: "${header}", "${title}"`)
            }
        }

        private setFormatToProperty(key:string, type: Type.FormatTo): void {
            if(!this.isKey(key)) this.keyNotFound(key);
            this.headers[key].format_to = type;
        }

        setFormatTo(header:string | {[prop:string]: Type.FormatTo}, type?: Type.FormatTo): void {
            if(typeof header === "object" && header !== null) {
                for(const key in header) {
                    if(!this.isKey(key)) this.keyNotFound(key);
                }
                for (const key in header) {
                    this.setFormatToProperty(key, header[key]);
                }
            } else if(typeof header === "string" && type) {
                if(!this.isKey(header)) this.keyNotFound(header);
                this.setFormatToProperty(header, type);
            } else {
                throw new Error(`formatTo não foram definidos para: "${header}", "${type}"`)
            }
        }

        // ---------------------- Message ---------------------- //

        private keyNotFound(key:string) {
            throw new Error(`"${key}" Not Found`)
        }
    }

    class Data {
        private readonly data_json_array: Type.DataRow[]
        
        constructor(data: Type.JsonArray) {
            const arr = []
            for (let i = 0; i < data.length; i++) {
                const data_item = {
                    "id": i,
                    "row": data[i],
                    "render": true
                }
                arr.push(data_item);
            }
            this.data_json_array = arr
        }

        isId(id: number): boolean {           
            return (this.data.length >= id && id >= 0);
        }

        switchRender(id: number): void {
            if(!this.isId(id)) this.IdNotFound(id);
            this.data[id].render = !this.data[id].render;
        }

        pop(id: number): void {
            if(!this.isId(id)) this.IdNotFound(id);
            if(this.data[id].render === true) { 
                this.switchRender(id); 
            }
        }

        push(id: number): void {
            if(!this.isId(id)) this.IdNotFound(id);
            if(this.data[id].render === false) this.switchRender(id);
        }

        // ---------------------- Getters ---------------------- //

        get data(): Type.DataRow[] {
            return this.data_json_array;
        }

        get array(): Type.JsonArray {
            const result: Type.JsonArray = []
            this.data.forEach(item => {
                let row = item.row
                result.push(row);
            })
            return result;
        }

        getRenderArray(bol = true): Type.JsonArray {
            const result: Type.JsonArray = [];
            this.data.forEach(item => {
                if(item.render === bol) {
                    result.push(item.row);
                }
            })
            return result
        }

        // ---------------------- Setters ---------------------- //

        setRender(ids: number[]): void {
            for(const id of ids) {
                if(!this.isId(id)) { this.IdNotFound(id); }
            }
            for (let i = 0; i < this.data.length; i++) {
                if(ids.includes(this.data[i].id)) {
                    this.push(this.data[i].id)
                } else {
                    this.pop(this.data[i].id)
                }
            }
        }

        // ---------------------- Message ---------------------- //

        private IdNotFound(id: number) {
            throw new Error(`Row: "${id}" Not Found`)
        }
    }

    export class Compose {
        private formatCellToString(value: unknown, type?: Type.FormatTo): string  {
            if(type) {
                return Utils.Format.valueTo(value, type);
            } else {
                return Utils.Format.valueToString(value)
            }
        }

        private formatRowToString(row: Type.JsonObject, headers: Type.Headers, format_to = true): Type.ObjString  {
            const result: Type.ObjString = {};
            for(const key in headers) {
                if(format_to) {
                    result[key] = this.formatCellToString(Utils.Data.getNestedProperty(row, key), headers[key].format_to)
                } else {
                    result[key] = this.formatCellToString(Utils.Data.getNestedProperty(row, key))
                }
            }
            return result
        }

        tableBody(rows: Type.JsonArray, headers: Type.Headers): Type.ObjString[] {
            const result: Type.ObjString[] = [];
            for (let i = 0; i < rows.length; i++) {
                result[i] = this.formatRowToString(rows[i], headers);
            }
            return result
        }

        tableHead(titles: Type.ObjString, headers: Type.Headers): Type.ObjString {
            return this.formatRowToString(titles, headers, false)
        }

        tableFoot(values: {[key: string]: number}, headers: Type.Headers): Type.ObjString {
            const result: Type.ObjString = {};
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