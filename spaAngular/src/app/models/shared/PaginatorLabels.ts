import { MatPaginatorIntl } from '@angular/material';

export class PaginatorLabels extends MatPaginatorIntl {
    itemsPerPageLabel = 'Resultados por página';
    nextPageLabel = 'Siguiente';
    previousPageLabel = 'Anterior';
    firstPageLabel = 'Inicio';
    lastPageLabel = 'Final';

    // tslint:disable-next-line: max-line-length
    getRangeLabel = (page: number, pageSize: number, length: number) => { if (length === 0 || pageSize === 0) { return `0 of ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} - ${endIndex} de ${length}`; };
}
