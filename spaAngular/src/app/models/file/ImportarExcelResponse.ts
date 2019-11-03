import { ImportDataLog } from "./ImportDataLog";

export class ImportarExcelResponse {
    constructor(
        public totalOk: number,
        public errorList: ImportDataLog[]
    ) { }
}