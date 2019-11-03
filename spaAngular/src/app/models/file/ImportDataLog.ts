export class ImportDataLog {
    constructor(
        public id: string,
        public row: string,
        public column: string,
        public value: string,
        public errorDescription: string,
        public status: boolean
    ) { }
}