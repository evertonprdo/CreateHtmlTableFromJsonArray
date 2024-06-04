export class DataObject {
    records;
    default_records;
    constructor(records) {
        this.records = records;
        this.default_records = records;
    }
    get def_data() {
        return this.default_records;
    }
}
