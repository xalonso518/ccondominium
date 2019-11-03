import { ImportDataLog } from "./ImportDataLog";
import { FileInput } from "./FileInput";

export class ImportMultipleXml extends Object {
    public id: number;
    public importDataLog: ImportDataLog;
    public fileInput: FileInput;
    public estado: number; // 1 = pendiente, 2 = enviado, 3 = procesado, 4 = cancelar
}