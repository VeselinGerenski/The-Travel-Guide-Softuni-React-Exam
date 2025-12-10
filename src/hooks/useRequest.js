import { useCallback } from "react";
import { useUserContext } from "../contexts/UserContext.js";

const baseurl = 'http://127.0.0.1:5001/the-travel-guide-cc78e/us-central1/server';

export default function useRequest() {
    const { user, isAuthenticated } = useUserContext();

    const request = useCallback(async (url, method, data, config = {}) => {
        let options = {};

        if (method) options.method = method;

        if (data !== undefined) {
            options.headers = {
                'content-type': 'application/json'
            };
            options.body = JSON.stringify(data);
        }

        if (config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user.accessToken
            };
        }

        const response = await fetch(`${baseurl}${url}`, options);

        if (response.status === 204) {
            return {};
        }
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: "Request failed" };
            }

            const err = new Error(errorData.message || "Request failed");
            err.status = response.status;
            err.data = errorData;
            throw err;
        }

        return await response.json();
    }, [user, isAuthenticated]);

    return { request };
}
