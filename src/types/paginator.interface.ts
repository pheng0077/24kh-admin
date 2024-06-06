export interface IPaginator {
    /**
     * The number of items in this page.
     */
    page?: number;
    /**
     * The number of items per page.
     */
    limit?: number;
}

export interface IPaginateMeta {
    /**
     * Whether this is the first page.
     * @type {boolean}
     */
    isFirstPage: boolean;
    /**
     * Whether this is the last page.
     * @type {boolean}
     */
    isLastPage: boolean;
    /**
     * The current page number.
     * @type {number}
     */
    currentPage: number;
    /**
     * The previous page number. If there is no previous page, this value is null.
     * @type {number | null}
     */
    previousPage: null;
    /**
     * The next page number. If there is no next page, this value is null.
     * @type {number | null}
     */
    nextPage: null;
    /**
     * The total number of pages in the collection.
     * @type {number}
     */
    pageCount: number;
    /**
     * The total number of items in the collection.
     * @type {number}
     */
    totalCount: number;
}

export interface IPaginatorMeta {
    meta: IPaginateMeta;
}