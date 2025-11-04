import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TaskModal.css";

function TaskModal({ task, onSave, onClose }) {
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (task) {
            setDescription(task.description);
        } else {
            setDescription("");
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        onSave({ description });
    };

    return (
        <AnimatePresence>
            <div className="task-modal-overlay" onClick={onClose}>
                <motion.div
                    className="task-modal-content"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                >
                    <div className="task-modal-header">
                        <h2>{task ? "Edit Task" : "Create New Task"}</h2>
                        <button className="close-button" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="task-modal-form">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What do you need to do?"
                                required
                            />
                        </div>
                        <div className="task-modal-actions">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="save-btn">
                                {task ? "Update Task" : "Save Task"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default TaskModal;
