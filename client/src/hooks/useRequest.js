import { useCallback } from "react";
import { useUserContext } from "../contexts/UserContext.js";

const baseurl = 'http://localhost:3030';

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

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: "Request failed" };
            }

            // Optional: still show alert
            alert(`❌ ${errorData.message || "Unable to complete request."}`);

            // Important: THROW, don't return the error object
            throw new Error(errorData.message || "Request failed");
        }

        if (response.status === 204) {
            return {};
        }

        return await response.json();
    }, [user, isAuthenticated]);

    return { request };
}
