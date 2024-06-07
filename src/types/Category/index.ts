import type { IPaginator } from "../paginator.interface";

interface ICagoryCreate {
    nameEn: string;
    nameKh: string;
}

interface ICategory {
    id: string;
    nameEn: string;
    nameKh: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

interface ICategoryQuery extends Partial<IPaginator> {
    keyword?: string;
    sortBy?: "createdAt" | "updatedAt" | keyof ICategory;
    orderBy?: "asc" | "desc";
}

export type { ICagoryCreate, ICategory, ICategoryQuery };