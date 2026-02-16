import axios from "axios";
import type { AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Session expirée ou non autorisée");
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
