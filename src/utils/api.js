import axios from "axios";

// const API_BASE_URL = "http://localhost:3000"; // Change this to your backend URL
// // const API_BASE_URL = "https://task-manager-backend-5hkl.onrender.com"

const apiClient = axios.create({
    baseURL:
        // import.meta.env.VITE_API_URL ||
        "https://task-manager-backend-5hkl.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// auth
export const registerUser = (userData) => apiClient.post("/users", userData);
export const loginUser = async (credentials) => {
    const response = await apiClient.post("/users/login", credentials);
    return response.data;
};
export const logoutUser = () => apiClient.post("/users/logout");

// user mngmnt
export const getUserDetails = () => apiClient.get("/users/me");
export const updateUser = (userData) => apiClient.patch("/users/me", userData);
export const deleteUser = () => apiClient.delete("/users/me");
export const uploadAvatar = (formData) =>
    apiClient.post("/users/me/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// tasks
export const getTasks = () => apiClient.get("/tasks");
export const createTask = (taskData) => apiClient.post("/tasks", taskData);
export const updateTask = (id, taskData) =>
    apiClient.patch(`/tasks/${id}`, taskData);
export const deleteTask = (id) => apiClient.delete(`/tasks/${id}`);

export default apiClient;
