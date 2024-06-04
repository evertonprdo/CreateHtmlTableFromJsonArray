import { DataObjectType, DataItemType } from "../tools/types.js";

export class DataObject {
    public records: DataObjectType;
    private readonly default_data: DataObjectType;
    constructor(records: DataObjectType) {
        this.records = records;
        this.default_data = records;
    }
    

    static doAllColumnsMatch(data: DataObjectType, reff: DataItemType) {

    }

    static makeMyOwnDomTableDataObject() {

    }
}