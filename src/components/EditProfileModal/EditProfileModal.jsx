import React, { useState, useEffect } from "react";
import { updateUserDetails } from "../../utils/api.js"; // Assuming the API helper is created for PATCH request
import "./EditProfileModal.css"
function EditProfileModal({ isOpen, onClose, user, onUpdate }) {
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [error, setError] = useState("");


    useEffect(() => {
        setName(user?.name || "");
        setAge(user?.age || "");
    }, [user]);

    const handleSave = () => {
        const updatedUser = { ...user, name, age };
        onUpdate(updatedUser); // Pass the updated user data to the parent component
        onClose(); // Close the modal after saving
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Profile</h2>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <label>Age</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                />
                {error && <p className="error">{error}</p>}
                <div className="modal-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfileModal;
