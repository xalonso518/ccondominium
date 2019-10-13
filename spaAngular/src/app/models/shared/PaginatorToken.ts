export class PaginatorToken {
    constructor(
        public total: number,
        // tslint:disable-next-line: ban-types
        public token: Object
    ) { }
}
