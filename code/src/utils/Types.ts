export namespace Type {
    type Primitive = string | number | boolean | null;

    export type JsonObject = {
        [prop: string]: Primitive | JsonArray | JsonObject;
    }
    
    export type JsonArray = Array<JsonObject>;

    export type Headers = {
        render: string
        [prop: string]: string
    }
}