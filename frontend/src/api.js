export const apiUrl = import.meta.env.VITE_API_URL;

export function authFetch(url, options = {}, token){
    return fetch(url,{
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    });
}