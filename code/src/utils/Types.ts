export namespace Type {
    export namespace Option {
        export type Header = "title" | "format_to" | "footer_function" | "render_status";

        export type FormatTo = "DATE" | "CURRENCY" | "FLOAT_FIX" | "PERCENT" | "default";

        export type FooterFunction = "columnSome" | "columnMax" | "columnMin" | "columnMed" | "vadilidCount" | "default";

        export type DataRow = "id" | "json_object" | "render_status";
    }

    export type Primitive = string | number | boolean | null

    export type JsonObject = {
        [prop: string]: Primitive | JsonObject | Array<Primitive> | JsonArray
    }
    
    export type JsonArray = Array<JsonObject>

    type HeaderItem = {
        title: string
        render_status: boolean
        format_to: Option.FormatTo
        footer_function: Option.FooterFunction
        switchRenderStatus: () => void
    }

    export type Header = {
        [prop: string]: HeaderItem
    }

    export type DataRows = DataRow[]

    export type DataRow = {
        id: number
        json_object: JsonObject
        render_status: boolean
    }

    export namespace Indexable  {

        export type Primitive = {
            [prop: string]: Type.Primitive
        }

        export type String = {
            [prop: string]: string
        }

        export type Boolean = {
            [prop: string]: boolean
        }

        export type Number = {
            [prop: string]: number
        }

        export type FormatTo = {
            [prop: string]: Type.Option.FormatTo
        }

        export type FooterFunction = {
            [prop: string]: Type.Option.FooterFunction
        }

        export type JsonObject = {
            [prop: string]: Type.JsonObject
        }
    }
}