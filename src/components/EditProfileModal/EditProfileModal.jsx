import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, user, onUpdate }) {
    const [name, setName] = useState(user?.name || "");
    const [age, setAge] = useState(user?.age || "");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setAge(user.age || "");
        }
    }, [user]);

    const handleSave = () => {
        if (!name.trim()) {
            return;
        }
        const updatedUser = { ...user, name, age };
        onUpdate(updatedUser);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose}>
                    <motion.div
                        style={{ width: "100%" }}
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="modal-header">
                            <h2>Edit Profile</h2>
                            <button className="close-button" onClick={onClose}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input
                                    id="age"
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="Enter your age"
                                />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="save-btn" onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default EditProfileModal;
