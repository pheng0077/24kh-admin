import type { IApiResp, IRespPaginate } from "~/types/apiResp.interface";
import type { ICountry, ICountryDetail, IQueryCountry } from "~/types/Country";

export default () => {
    const create = async (country: ICountry): Promise<IApiResp<ICountry>> => {
        return await useClientFetch<IApiResp<ICountry>>("/country", {
            method: "POST",
            body: country,
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const update = async (id: string, country: Partial<ICountry>): Promise<IApiResp<ICountry>> => {
        return await useClientFetch<IApiResp<ICountry>>(`/country/${id}`, {
            method: "PATCH",
            body: country,
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getAll = async (query: IQueryCountry): Promise<IRespPaginate<ICountryDetail>> => {
        return await useClientFetch<IRespPaginate<ICountryDetail>>("/country", {
            method: "GET",
            query
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getById = async (id: string): Promise<IApiResp<ICountryDetail>> => {
        return await useClientFetch<IApiResp<ICountryDetail>>(`/country/${id}`, {
            method: "GET",
        }).catch((error: any) => {
            console.log(error);
            return error.data;
        });
    }

    const getBySlug = async (slug: string): Promise<IApiResp<ICountryDetail>> => {
        return await useClientFetch<IApiResp<ICountryDetail>>(`/country/slug/${slug}`, {
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