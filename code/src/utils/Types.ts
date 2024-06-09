export namespace Type {
    export type Primitive = string | number | boolean | null;

    export type JsonObject = {
        [prop: string]: Primitive | JsonObject | Array<Primitive> | JsonArray;
    }
    
    export type JsonArray = Array<JsonObject>;

    export type Option = {
        [prop: string]: string 
    }
    export type Headers = {
        [prop: string]: {
            title: string
            render: boolean
        }
    }
}