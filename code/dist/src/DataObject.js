export class DataObject {
    records;
    default_records;
    constructor(records) {
        this.records = records;
        this.default_records = records;
    }
    get defaultData() {
        return this.default_records;
    }
}
