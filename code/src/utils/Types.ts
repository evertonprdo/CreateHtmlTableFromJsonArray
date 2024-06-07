export namespace Type {
    type Primitive = string | number | boolean | null;

    type JsonArray = Array<Primitive | JsonObject | JsonArray>;
    
    export type JsonObject = {
        [prop: string]: Primitive | JsonObject | JsonArray;
    }
}