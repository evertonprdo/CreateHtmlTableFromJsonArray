import { Type } from "../utils/Types.js";
import { Utils as Utl } from "../utils/Utils.js";

export class DataObject {
    public records: Type.DataObject;
    private readonly default_records: Type.DataObject;
    constructor(records: Type.DataObject) {
        this.records = records;
        this.default_records = records;
    }

    get defaultData() {
        return this.default_records;
    }
}