export namespace Type {
    export type Primitive = string | number | boolean | null;

    export type JsonObject = {
        [prop: string]: Primitive | JsonObject | Array<Primitive> | JsonArray;
    }
    
    export type JsonArray = Array<JsonObject>;

    export type ObjString = {
        [prop: string]: string
    }
    export type Headers = {
        [prop: string]: {
            title: string
            render: boolean
            format_to: FormatTo
            is_column_sum: boolean
        }
    }

    export type FormatTo = "DATE" | "CURRENCY" | "FLOAT_FIX" | "PERCENT" | "default"

    export type DataRow = {
        "id": number
        "row": JsonObject
        "render": boolean,
    }
}