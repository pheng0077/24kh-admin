import type { IApiResp, IRespPaginate } from "~/types/apiResp.interface";
import type { ICagoryCreate, ICategory, ICategoryQuery } from "~/types/Category";

export default () => {
    const create = async (category: ICagoryCreate): Promise<IApiResp<ICategory>> => {
        return await useClientFetch<IApiResp<ICategory>>("/category", {
            method: "POST",
            body: category,
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const update = async (id: string, category: Partial<ICagoryCreate>): Promise<IApiResp<ICategory>> => {
        return await useClientFetch<IApiResp<ICategory>>(`/category/${id}`, {
            method: "PATCH",
            body: category,
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getAll = async (query: ICategoryQuery): Promise<IRespPaginate<ICategory>> => {
        return await useClientFetch<IRespPaginate<ICategory>>("/category", {
            method: "GET",
            query
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getById = async (id: string): Promise<IApiResp<ICategory>> => {
        return await useClientFetch<IApiResp<ICategory>>(`/category/${id}`, {
            method: "GET",
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getBySlug = async (slug: string): Promise<IApiResp<ICategory>> => {
        return await useClientFetch<IApiResp<ICategory>>(`/category/slug/${slug}`, {
            method: "GET",
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const remove = async (id: string): Promise<IApiResp<{ data: string }>> => {
        return await useClientFetch<IApiResp<{ data: string }>>(`/category/${id}`, {
            method: "DELETE",
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    return {
        create,
        update,
        getAll,
        getById,
        getBySlug,
        remove
    }
}