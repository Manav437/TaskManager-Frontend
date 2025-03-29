import "./Dashboard.css"
import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../utils/api"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            setAvatarUrl(`https://task-manager-backend-5hkl.onrender.com/users/${userId}/avatar`);
        }
    }, [userId]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile)); // Show preview before upload
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", file); // Must match `upload.single("avatar")`

        try {
            const res = await fetch("https://task-manager-backend-5hkl.onrender.com/users/me/avatar", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: localStorage.getItem("token"), // Add token if needed
                    // "Content-Type": "multipart/form-data", // ❌ DO NOT manually set this, browser will handle it
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Upload failed");
            }
            alert("Upload successful!");
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserDetails();
                setUser(userData); // Set user details in state
                setUserId(userData._id);
            } catch (err) {
                setError(err.message || "Failed to fetch user details.");
                navigate("/login"); // Redirect if not authenticated
            }
        };

        fetchUser();
    }, []);

    function ChangeDate(userdate) {
        const date = new Date(userdate);
        if (isNaN(date.getTime())) {
            return "Invalid Date"; // Handle invalid date inputs
        }

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = String(date.getFullYear()).slice(-2); // Last 2 digits of year

        return `${day}-${month}-${year}`;
    }

    const handleDelete = async () => {
        if (!user) {
            alert("Unauthorized: No token found.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://task-manager-backend-5hkl.onrender.com0/users/me`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            let data;
            if (response.headers.get("content-type")?.includes("application/json")) {
                data = await response.json();
            } else {
                data = { message: "Unknown response from server" };
            }

            if (response.ok) {
                alert(data.message || "Account deleted successfully.");
                localStorage.removeItem("token");
                setUser(null);

                setTimeout(() => {
                    router.push("/login");
                }, 500);
            } else {
                const data = await response.json();
                alert(data.message || "Failed to delete account.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <div className="dashboard-container">
                <h2>WELCOME USER!</h2>
                {error && <p className="error">{error}</p>}
                {user ? (
                    <div className="user-details">
                        <p style={{ color: "brown" }} ><strong style={{ color: "black" }}>Name:</strong> {user.name}</p>
                        <p style={{ color: "brown" }} ><strong style={{ color: "black" }}>Email:</strong> {user.email}</p>
                        <p style={{ color: "brown" }} ><strong style={{ color: "black" }}>Account Creation:</strong> {ChangeDate(user.createdAt)}</p>
                        <p style={{ textAlign: "center" }}><a style={{ color: "red", cursor: "pointer" }} onClick={handleDelete}>Delete account</a></p>
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
            <div className="img-container">
                <input type="file" onChange={handleFileChange} className="dashboard-input" />
                {preview && <img src={preview} alt="Preview" className="preview-image object-cover mb-2" />}
                <button onClick={handleUpload} className="dashboard-button">
                    Upload Avatar
                </button>
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="avatar-img rounded-full border border-gray-300"
                        key={avatarUrl}
                    />
                ) : (
                    <p>No avatar found</p>
                )}

            </div>
        </>
    )
}

export default DashboardPage