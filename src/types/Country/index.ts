import type { CREATE_UPDATE, ORDER_BY } from "..";
import type { IPaginator } from "../paginator.interface";

interface ICountryCreate {
    nameEn: string;
    nameKh: string;
}

interface ICountryQuery extends Partial<IPaginator> {
    keyword?: string;
    sortBy?: CREATE_UPDATE | keyof ICountryCreate
    orderBy?: ORDER_BY;
}

interface ICountry extends ICountryCreate {
    id: string;
    slug: string;
}

export type { ICountryCreate, ICountryQuery, ICountry };