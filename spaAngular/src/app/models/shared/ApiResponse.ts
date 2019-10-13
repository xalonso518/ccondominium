import { PaginatorResponse } from './PaginatorResponse';
import { PaginatorToken } from './PaginatorToken';

export interface ApiResponse<T> {
    success: boolean;
    payload: T;
    error: string;
    paginator: PaginatorResponse;
    pagintoken: PaginatorToken;
}
