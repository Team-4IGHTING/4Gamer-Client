import axios from 'axios';

export const apiClient = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'http://www.turbspace.kr:8081/api/v1',
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});

apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access_token");

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
})