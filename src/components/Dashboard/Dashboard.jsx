import "./Dashboard.css"
import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("/upload-img.jpg"); // Default fallback
    const [userId, setUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.fromRegister && !localStorage.getItem('showWelcomeMessage')) {
            setShowMessage(true);
            localStorage.setItem('showWelcomeMessage', 'true');
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [location.state]);

    useEffect(() => {
        if (userId) {
            setAvatarUrl(`https://task-manager-backend-5hkl.onrender.com/users/${userId}/avatar`);
            // setAvatarUrl(`http://localhost:3000/users/${userId}/avatar`);
        }       //https://task-manager-backend-5hkl.onrender.com/
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
                setAvatarUrl("/upload-img.png");
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
            const res = await fetch(`https://task-manager-backend-5hkl.onrender.com/users/${userId}/avatar`, {
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
            setPreview(null)
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
                    "Authorization": `Bearer ${token}`,
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

            const response = await fetch("https://task-manager-backend-5hkl.onrender.com/users/me", {
                // const response = await axios.patch("http://localhost:3000/users/me", updatedUserRequired, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
            <h2 style={{ paddingBottom: "20px", textAlign: "center", margin: "10px auto 20px auto", width: "60%", color: "white", fontSize: "3rem" }}>
                {(user == null ? "" : `Hey, ${user.name}`)} <br />
                <span style={{ textDecoration: "underline", textUnderlineOffset: "5px", fontSize: "1.5rem" }}> Welcome to your dashboard</span>
            </h2>
            <div className="dashboard-container">
                {error && <p className="error">{error}</p>}
                {user ? (
                    <div className="user-details">
                        <div style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", height: "70%", background: "#2C2C2C", width: "60%", padding: "7px", margin: "25px auto", border: "2px solid #DDE6ED", borderRadius: "20px" }}>
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Taskly Avatar" className="avatar-img" style={{ background: "black", margin: "10px auto", border: "1px solid white" }} key={avatarUrl} />
                            ) : (
                                <p>No avatar found</p>
                            )}
                            <div style={{ height: "45%", width: "90%", margin: "0 auto" }}>
                                <p style={{ width: "100%", textAlign: "left", color: "white" }}>
                                    <strong style={{ color: "lightblue", textDecoration: "underline", textUnderlineOffset: "2px" }}>Name</strong>: {user.name}
                                </p>
                                <p style={{ width: "100%", textAlign: "left", color: "white" }}>
                                    <strong style={{ color: "lightblue", textDecoration: "underline", textUnderlineOffset: "2px" }}>Email</strong>: {user.email}
                                </p>
                                <p style={{ width: "100%", textAlign: "left", color: "white" }}>
                                    <strong style={{ color: "lightblue", textDecoration: "underline", textUnderlineOffset: "2px" }}>Age</strong>: {user.age}
                                </p>
                                <p style={{ width: "100%", textAlign: "left", color: "white" }}>
                                    <strong style={{ color: "lightblue", textDecoration: "underline", textUnderlineOffset: "2px" }}>Account Creation</strong> : {ChangeDate(user.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <button
                                className="delete-acc"

                                onClick={handleDelete}
                            >
                                Delete account?
                            </button>
                        </div>

                    </div>
                ) : (
                    <div style={{ margin: "0 auto" }}>
                        <p>Loading user details...</p>
                    </div>
                )}

                {user && (
                    <div className="img-container">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto", height: "30%", width: "100%", borderBottom: "2px solid #2C2C2C" }}>
                            <h3 style={{ fontSize: "1.4rem", fontWeight: "800" }}>📝  <span style={{ textDecoration: "underline", textUnderlineOffset: "5px" }}>Update your details</span> </h3>
                            <button className="hover-buttons" style={{ background: "#547792", color: "white", margin: "auto", height: "40px", width: "75px" }} onClick={() => setIsModalOpen(true)}>Edit</button>
                        </div>

                        <div style={{ margin: "0 auto", width: "60%", display: "flex", flexDirection: "column", height: "70%", textAlign: "center", justifyContent: "flex-start", alignItems: "center" }}>
                            <h3 style={{
                                margin: "0",
                                marginTop: "20px", fontSize: "1.4rem",
                                height: "10%",
                                textAlign: "center", width: "100%",
                                borderRadius: "10px", fontWeight: "800"
                            }}>
                                👤  <span style={{ textDecoration: "underline", textUnderlineOffset: "5px", }}>Update your avatar</span>
                            </h3>
                            <div style={{ gap: "5px", minHeight: "28%", width: "60%", border: "2px solid #2C2C2C", borderRadius: "10px", padding: "7px", maxHeight: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", marginTop: "20px" }}>
                                <input
                                    style={{
                                        padding: 0,
                                        opacity: "0", textAlign: "center", margin: "-1px",
                                        overflow: "hidden",
                                        clip: "rect(0,0,0,0)",
                                        border: 0
                                    }}
                                    type="file"
                                    onChange={handleFileChange}
                                    className="dashboard-input"
                                    id="fileInput"
                                />

                                <label
                                    htmlFor="fileInput"
                                    style={{
                                        width: "120px",
                                        backgroundColor: "#2c2c2c", // Change the background color
                                        color: "white", // Change the text color
                                        padding: "5px", // Padding for the label
                                        borderRadius: "5px", // Rounded corners
                                        cursor: "pointer", // Change cursor to pointer
                                        display: "inline-block", // Align the label like a button
                                        textAlign: "center",
                                        margin: "5px auto"
                                    }}
                                >
                                    Choose an image
                                </label>

                                {preview && <img src={preview} alt="Preview" className="preview-image" />}
                                <button style={{ margin: "0 auto", width: "130px", height: "35px", marginTop: "6px" }} onClick={handleUpload} className="hover-buttons">
                                    Upload Avatar
                                </button>
                            </div>
                        </div>

                    </div>
                )}

                {isModalOpen && <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onUpdate={handleUpdate} />}
            </div>

            {
                showMessage && (
                    <div style={{ textAlign: "center", background: "white", color: "black", height: "50px", width: "200px", position: "absolute", bottom: "30px", right: "80px" }}>
                        Welcome email was sent to your email address.
                    </div>
                )
            }
        </div >
    );
}

export default DashboardPage;
