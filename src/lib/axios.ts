
import axios from "axios";

// Read the backend URL from the frontend environment variables.
const apiOrigin = import.meta.env.VITE_API_URL;

if (!apiOrigin) {
    throw new Error("Set VITE_API_URL in the frontend .env file.");
}

// Automatically include /api because the backend mounts routes at /api.
// Remove trailing slashes to prevent malformed URLs.
const baseURL = `${apiOrigin.replace(/\/+$/, "")}/api`;

export const http = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Keep the CSRF token in memory.
let csrfToken: string | null = null;

// Share one refresh operation between simultaneous requests.
let refreshPromise: Promise<void> | null = null;

const writeMethods = ["post", "put", "patch", "delete"];

const authEndpoints = [
    "/auth/v1/login",
    "/auth/v1/signup",
    "/auth/v1/refresh-token",
    "/auth/v1/logout",
];

function isAuthEndpoint(url = "") {
    return authEndpoints.includes(url.split("?")[0]);
}

export function clearCsrfToken() {
    csrfToken = null;
}

export async function ensureCsrfToken() {
    if (csrfToken) return;

    // Fetch a CSRF token from the correct backend URL.
    // Plain axios avoids triggering this client's interceptors.
    const response = await axios.get(
        `${baseURL}/auth/v1/csrf-token`,
        {
            withCredentials: true,
        }
    );

    csrfToken = response.data.data.csrfToken as string;
}

async function refreshSession() {
    await http.post("/auth/v1/refresh-token", {});

    // Fetch a fresh CSRF token after cookies change.
    await ensureCsrfToken();
}

// Attach CSRF protection to requests that modify data.
http.interceptors.request.use(async (config) => {
    const method = config.method?.toLowerCase() || "get";

    if (writeMethods.includes(method)) {
        await ensureCsrfToken();
        config.headers.set("x-csrf-token", csrfToken);
    }

    return config;
});

http.interceptors.response.use(
    (response) => {
        // Authentication requests may change session cookies.
        if (isAuthEndpoint(response.config.url)) {
            clearCsrfToken();
        }

        return response;
    },
    async (error) => {
        const request = error.config;

        // Only refresh when an authenticated request receives 401.
        if (!request || error.response?.status !== 401) {
            throw error;
        }

        // Do not refresh authentication endpoints or retry repeatedly.
        if (request._retry || isAuthEndpoint(request.url)) {
            throw error;
        }

        request._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = refreshSession().finally(() => {
                    refreshPromise = null;
                });
            }

            await refreshPromise;
        } catch (refreshError) {
            clearCsrfToken();

            window.dispatchEvent(new Event("auth:expired"));

            throw refreshError;
        }

        // Retry the original request with the refreshed session.
        return http(request);
    }
);
