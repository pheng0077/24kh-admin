import type { IPaginatorMeta } from "./paginator.interface";

export interface IApiResp<T = any> {
    data?: T;
    error?: string;
    message?: string;
    statusCode?: number | string;
}

export interface IRespPaginate<T = any> extends IApiResp<T[]>, IPaginatorMeta {
    data: T[];
}