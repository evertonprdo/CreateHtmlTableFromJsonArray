export namespace Type {
    export type Option = {
        [prop: string]: string;
    }

    export type NestedOption = {
        [prop:string]: Option
    }
    
    export type DataObject = {
        [prop: string]: any
    }[]
    
    export type DataItem = {
        [prop: string]: any
    }
}