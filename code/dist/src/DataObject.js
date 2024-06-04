export class DataObject {
    records;
    default_data;
    constructor(records) {
        this.records = records;
        this.default_data = records;
    }
    static doAllColumnsMatch(data, reff) {
    }
    static makeMyOwnDomTableDataObject() {
    }
}
