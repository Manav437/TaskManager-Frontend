import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    getUserDetails,
    updateUser,
    deleteUser,
    uploadAvatar,
} from "../../utils/api";
import HoverDevCards from "../Settings/Settings";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./Dashboard.css";

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const location = useLocation();
    const navigate = useNavigate();

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(
            () => setToast({ show: false, message: "", type: "" }),
            3000,
        );
    };

    const fetchUser = useCallback(async () => {
        try {
            const response = await getUserDetails();
            setUser(response.data);
        } catch (err) {
            setError(err.message || "Failed to fetch user details.");
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (
            location.state?.fromRegister &&
            !localStorage.getItem("welcomeShown")
        ) {
            showToast("Welcome! Your account has been created successfully.");
            localStorage.setItem("welcomeShown", "true");
        }
    }, [location.state]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) return showToast("Please select a file first.", "error");

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            await uploadAvatar(formData);
            showToast("Avatar updated successfully!");
            setPreview(null);
            setFile(null);
            // Force browser to refetch the image by adding a cache-busting query param
            setUser((prevUser) => ({
                ...prevUser,
                avatarUrl: `${import.meta.env.VITE_API_URL}/users/${prevUser._id}/avatar?t=${new Date().getTime()}`,
            }));
        } catch (error) {
            showToast(error.response?.data?.error || "Upload failed.", "error");
        }
    };

    const handleUpdate = async (updatedUserData) => {
        try {
            const response = await updateUser({
                name: updatedUserData.name,
                age: updatedUserData.age,
            });
            setUser(response.data);
            showToast("Profile updated successfully!");
        } catch (error) {
            showToast(error.response?.data?.error || "Update failed.", "error");
        }
    };

    const handleDelete = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone.",
            )
        ) {
            try {
                await deleteUser();
                showToast("Account deleted successfully.");
                localStorage.removeItem("token");
                window.dispatchEvent(new Event("storage"));
                navigate("/register");
            } catch (error) {
                showToast(
                    error.response?.data?.error || "Deletion failed.",
                    "error",
                );
            }
        }
    };
    if (!user) {
        return (
            <div className="dashboard-page">
                <header className="dashboard-header">
                    {/* Shimmer for the main heading */}
                    <div className="skeleton-header-text shimmer"></div>
                    <div className="skeleton-header-welcome">
                        Welcome to your personal dashboard
                    </div>
                </header>
                <div className="dashboard-grid">
                    {/* The User Card Skeleton */}
                    <div className="skeleton-card">
                        <div className="skeleton-avatar shimmer"></div>
                        <div style={{ width: "80%", marginTop: "10px" }}>
                            <div
                                className="skeleton-text shimmer"
                                style={{ height: "28px", marginBottom: "15px" }}
                            ></div>
                            <div className="skeleton-text shimmer"></div>
                            <div
                                className="skeleton-text shimmer"
                                style={{ width: "60%" }}
                            ></div>
                        </div>
                        <div className="skeleton-button shimmer"></div>
                    </div>

                    <div className="avatar-card"></div>
                    <div className="settings-card"></div>
                    <div className="danger-zone-card"></div>
                </div>
            </div>
        );
    }

    // Construct avatar URL once user data is available
    const avatarUrl = `${import.meta.env.VITE_API_URL}/users/${user._id}/avatar`;

    return (
        <div className="dashboard-page">
            {toast.show && (
                <div className={`toast ${toast.type}`}>{toast.message}</div>
            )}

            <header className="dashboard-header">
                <h1>Hey, {user.name}</h1>
                <p>Welcome to your personal dashboard.</p>
            </header>

            <div className="dashboard-grid">
                <div className="user-card">
                    <img
                        src={user.avatarUrl || avatarUrl}
                        onError={(e) => (e.target.src = "/upload-img.jpg")}
                        alt="User Avatar"
                        className="user-avatar"
                    />
                    <div className="user-info">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>Age: {user.age || "Not set"}</p>
                        <p>
                            Joined:{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        className="edit-profile-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="avatar-card">
                    <h3 style={{ textAlign: "center" }}>Update Avatar</h3>
                    <p style={{ textAlign: "center" }}>
                        Upload a new profile picture.
                    </p>
                    <div className="avatar-upload-area">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input"
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className="file-label">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="preview-image"
                                />
                            ) : (
                                <span
                                    style={{
                                        textAlign: "center",
                                        fontSize: "10px",
                                    }}
                                >
                                    Choose Image
                                </span>
                            )}
                        </label>
                        {file && (
                            <button
                                onClick={handleUpload}
                                className="upload-btn"
                            >
                                Upload
                            </button>
                        )}
                    </div>
                </div>

                <div className="settings-card">
                    <h3 style={{ textAlign: "center" }}>Settings</h3>
                    <HoverDevCards />
                </div>

                <div className="danger-zone-card">
                    <h3 style={{ textAlign: "center" }}>Delete Account?</h3>
                    <p style={{ textAlign: "center" }}>
                        Permanently delete your account and all associated data.
                    </p>
                    <button onClick={handleDelete} className="delete-btn">
                        Delete Account
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <EditProfileModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={user}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}

export default DashboardPage;
