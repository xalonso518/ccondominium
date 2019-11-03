import { ImportDataLog } from "./ImportDataLog";

export class ImportarXmlResponse {
    constructor(
        public totalOk: number,
        public dataLog: ImportDataLog[]
    ) { }
}