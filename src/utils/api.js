import axios from "axios";

// const API_BASE_URL = "http://localhost:3000"; // Change this to your backend URL
const API_BASE_URL = "https://task-manager-backend-5hkl.onrender.com"


export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Registration Error:", error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/logout`);
        return response.data;
    } catch (error) {
        console.error("Logout Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getUserDetails = async () => {
    try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get(`${API_BASE_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in headers
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error.response?.data || error.message);
        throw error;
    }
};

// export const updateUserDetails = async (userData) => {
//     try {
//         const response = await axios.patch(`${API_BASE_URL}/users/me`, userData, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`, // Bearer token for authentication
//             },
//         });
//         return response.data; // Returning updated user data
//     } catch (error) {
//         console.error("Error updating user details:", error.response?.data || error.message);
//         throw error;
//     }
// };
