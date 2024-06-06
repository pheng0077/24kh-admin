import type { NitroFetchOptions } from "nitropack";

export default async <T = any>(
    url: string,
    options: NitroFetchOptions<any> = {}
): Promise<T> => {
    const user = userStore();
    const config = useRuntimeConfig();

    return await $fetch<T>(url, {
        baseURL: config.public.apiUrl,
        retry: 2,
        // credentials: "include", // Important ('include' to allow setCookie from server)
        // parseResponse: JSON.parse,
        ...options,
        headers: {
            ...options.headers,
            Authorization: user.accessToken ? `Bearer ${user.accessToken}` : "",
        },
    });
};
