import type { IApiResp, IRespPaginate } from "~/types/apiResp.interface";
import type { ICountry, ICountryCreate, ICountryQuery } from "~/types/Country";

export default () => {
    const create = async (country: ICountryCreate): Promise<IApiResp<ICountry>> => {
        return await useClientFetch<IApiResp<ICountry>>("/country", {
            method: "POST",
            body: country,
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const update = async (id: string, country: Partial<ICountryCreate>): Promise<IApiResp<ICountry>> => {
        return await useClientFetch<IApiResp<ICountry>>(`/country/${id}`, {
            method: "PATCH",
            body: country,
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getAll = async (query: ICountryQuery): Promise<IRespPaginate<ICountry>> => {
        return await useClientFetch<IRespPaginate<ICountry>>("/country", {
            method: "GET",
            query
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getById = async (id: string): Promise<IApiResp<ICountry>> => {
        return await useClientFetch<IApiResp<ICountry>>(`/country/${id}`, {
            method: "GET",
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getBySlug = async (slug: string): Promise<IApiResp<ICountry>> => {
        return await useClientFetch<IApiResp<ICountry>>(`/country/slug/${slug}`, {
            method: "GET",
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const remove = async (id: string): Promise<IApiResp<{ data: string }>> => {
        return await useClientFetch<IApiResp<{ data: string }>>(`/country/${id}`, {
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