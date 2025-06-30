import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../utils/api";
import HoverDevCards from "../Settings/Settings";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("/upload-img.jpg");
    const [userId, setUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.fromRegister && !localStorage.getItem("showWelcomeMessage")) {
            setShowMessage(true);
            localStorage.setItem("showWelcomeMessage", "true");
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    useEffect(() => {
        if (userId) {
            setAvatarUrl(`https:task-manager-backend-5hkl.onrender.com/users/${userId}/avatar`);
            // setAvatarUrl(`http://localhost:3000/users/${userId}/avatar`);
        }
    }, [userId]);

    useEffect(() => {
        const checkAvatar = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`https://task-manager-backend-5hkl.onrender.com/users/${userId}/avatar`, { method: "HEAD" });
                // const response = await fetch(`http://localhost:3000/users/${userId}/avatar`, { method: "HEAD" });
                if (response.ok) {
                    setAvatarUrl(`https://task-manager-backend-5hkl.onrender.com/users/${userId}/avatar`);
                    // setAvatarUrl(`http://localhost:3000/users/${userId}/avatar`);
                } else {
                    setAvatarUrl("/upload-img.jpg");
                }
            } catch (error) {
                console.error("Error fetching avatar:", error);
                setAvatarUrl("/upload-img.jpg");
            }
        };
        checkAvatar();
    }, [userId]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const res = await fetch(`https://task-manager-backend-5hkl.onrender.com/users/me/avatar`, {
                // const res = await fetch("http://localhost:3000/users/me/avatar", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Upload failed");
            }
            alert("Upload successful!");
            setPreview(null);
            setAvatarUrl(URL.createObjectURL(file));
        } catch (error) {
            console.error("Upload failed:", error);
            alert(error.message);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserDetails();
                setUser(userData);
                setUserId(userData._id);
            } catch (err) {
                setError(err.message || "Failed to fetch user details.");
                navigate("/login");
            }
        };
        fetchUser();
    }, []);

    function ChangeDate(userdate) {
        const date = new Date(userdate);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
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
            const token = localStorage.getItem("token");
            const response = await fetch("https://task-manager-backend-5hkl.onrender.com/users/me", {
                // const response = await fetch("http://localhost:3000/users/me", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message || "Account deleted successfully.");
                localStorage.removeItem("token");
                setUser(null);
                setTimeout(() => navigate("/register"), 500);
            } else {
                alert(data.message || "Failed to delete account.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleUpdate = async (updatedUser) => {
        try {
            const updatedUserRequired = {
                name: updatedUser.name,
                age: updatedUser.age,
            };

            const response = await axios.patch("https://task-manager-backend-5hkl.onrender.com/users/me", updatedUserRequired, {
                // const response = await axios.patch("http://localhost:3000/users/me", updatedUserRequired, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                setUser(response.data);
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile, please try again.");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            alert(`Failed to update profile. Error: ${error.response ? error.response.data : error.message}`);
        }
    };

    return (
        <div className="dashboard-div">
            <h2 className="dashboard-heading">
                {user == null ? "" : `Hey, ${user.name}`}
                <br />
                <span>Welcome to your profile</span>
            </h2>

            <div className="hover-card-container">
                <HoverDevCards />
            </div>

            <div className="dashboard-container">
                {error && <p className="error">{error}</p>}
                {user ? (
                    <div className="user-details">
                        <div className="user-info-card">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Taskly Avatar" className="avatar-img" key={avatarUrl} />
                            ) : (
                                <p>No avatar found</p>
                            )}
                            <div className="user-info-text">
                                <p><strong>Name</strong>: {user.name}</p>
                                <p><strong>Email</strong>: {user.email}</p>
                                <p><strong>Age</strong>: {user.age}</p>
                                <p><strong>Account Creation</strong>: {ChangeDate(user.createdAt)}</p>
                            </div>
                        </div>
                        <div className="button-center">
                            <button style={{ background: "#E14434" }} className="hover-buttons delete-btn" onClick={handleDelete}>Delete account?</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}

                {user && (
                    <div className="img-container">
                        <div className="update-section">
                            <h3>📝 <span>Update your details</span></h3>
                            <button className="hover-buttons update-btn" onClick={() => setIsModalOpen(true)}>Edit</button>
                        </div>

                        <div className="avatar-upload">
                            <h3 style={{ marginBottom: "0" }}>👤 <span>Update your avatar</span></h3>
                            <div className="avatar-box">
                                <input type="file" onChange={handleFileChange} className="dashboard-input" id="fileInput" />
                                <label htmlFor="fileInput" className="file-label">Choose an image</label>
                                {preview && <img src={preview} alt="Preview" className="preview-image" />}
                                <button style={{ width: "90px", height: "40px" }} className="hover-buttons" onClick={handleUpload}>Upload Avatar</button>
                            </div>
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onUpdate={handleUpdate} />
                )}
            </div>

            {showMessage && (
                <div className="welcome-msg">
                    Welcome email was sent to your email address.
                </div>
            )}
        </div>
    );
}

export default DashboardPage;
