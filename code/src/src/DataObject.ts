import { Helpers } from "../tools/Helpers.js";
import { DataObjectType, DataItemType } from "../tools/types.js";

export class DataObject {
    public records: DataObjectType;
    private readonly default_records: DataObjectType;
    constructor(records: DataObjectType) {
        this.records = records;
        this.default_records = records;
    }

    get def_data() {
        return this.default_records;
    }
}