import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});
const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];
axiosConfig.defaults.withCredentials = true;
//request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
        return config.url?.includes(endpoint)
    });

    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response) {
        if (error.response.status === 401) {
            console.log("Unauthorized - token invalid or missing");

        } else if (error.response.status === 500) {
            console.error("Server error. Please try again later");
        }
    } else if(error.code === "ECONNABORTED") {
        console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
})


export default axiosConfig;