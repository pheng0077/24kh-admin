import type { CREATE_UPDATE, ORDER_BY } from "..";
import type { IPaginator } from "../paginator.interface";

interface ICountry {
    nameEn: string;
    nameKh: string;
}

interface IQueryCountry extends Partial<IPaginator> {
    keyword?: string;
    sortBy?: CREATE_UPDATE | keyof ICountry
    orderBy?: ORDER_BY;
}

interface ICountryDetail extends ICountry {
    id: string;
    slug: string;
}

export type { ICountry, IQueryCountry, ICountryDetail };