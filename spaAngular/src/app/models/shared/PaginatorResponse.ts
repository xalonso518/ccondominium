export class PaginatorResponse {
    constructor(
        public total: number,
        public pageIndex: string,
        public pageSize: number
    ) { }
}
