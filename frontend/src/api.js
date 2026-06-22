import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000/api",
});

// Inyecta el token JWT en cada petición si existe
http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Desempaqueta el formato { status, message, data } devuelto por el backend
http.interceptors.response.use(
    (response) => {
        response.data = response.data.data;
        return response;
    },
    (error) => {
        error.message = error.response.data.message;
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.dispatchEvent(new Event("auth:logout"));
        }
        return Promise.reject(error);
    }
);

export default http;
