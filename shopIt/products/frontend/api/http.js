import { getAccessToken, getRefreshToken } from './auth.js';

// Fetch Helper
async function authFetch(url, options = {}) {
    const access = getAccessToken();

    const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
            ...options.headers
        };
    
    let response = await fetch(url, {
        ...options,
        headers
    });
    console.log("Url fetched: ", url)

    if (response.status === 401) {
        const refresh = getRefreshToken();

        if (!refresh) {
            return response;
        }

        const refreshResponse = await fetch(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    refresh: refresh
                })
            }
        );

        if (!refreshResponse.ok) {
            console.error("Unable to refresh access token.");
            return response;
        }

        const data = await refreshResponse.json()

        // Update stored toke access
        const sessionData = localStorage.getItem("userSession");
        const session = JSON.parse(sessionData);

        session.access = data.access;

        localStorage.setItem(
            "userSession",
            JSON.stringify(session)
        );

        // Retry original request with new token
        response = await fetch(url, {
            ...options,
            headers: {
                ...headers,
                "Authorization": `Bearer ${data.access}`
            }
        });
    }

    return response;
}

export { authFetch };
