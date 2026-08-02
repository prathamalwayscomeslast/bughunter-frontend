export interface PaginationMeta {
    total: number;
    page: number;
    page_size: number;
    has_next: boolean;
}

export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
}

export interface ApiError {
    detail: string;
    status: number;
}

// Query param base — every domain's QueryParams extends this
export interface BasePaginationParams {
    page?: number;
    page_size?: number;
}

export type SortOrder = "asc" | "desc";