import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tasks.css"

function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskData, setTaskData] = useState({ description: "", completed: false });

    const userToken = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:3000/tasks", {
            headers: {
                Authorization: `Bearer ${userToken}`, // Send JWT token for authentication
            }
        })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
            });
    }, []);

    const handleCreateClick = () => {
        setSelectedTask(null);  // Reset for new task
        setTaskData({ description: "", completed: false });
        setShowForm(true);
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setTaskData({ description: task.description, completed: task.completed });
        setShowForm(true);
    };

    const handleSaveTask = (e) => {
        e.preventDefault();

        if (selectedTask) {
            // Update existing task
            axios.patch(`http://localhost:3000/tasks/${selectedTask._id}`, taskData, {
                headers: { Authorization: `Bearer ${userToken}` }
            })
                .then(response => {
                    setTasks(tasks.map(task => task._id === response.data._id ? response.data : task));
                    setShowForm(false);
                })
                .catch(error => console.error("Error updating task:", error));
        } else {
            // Create new task
            axios.post("http://localhost:3000/tasks", taskData, {
                headers: { Authorization: `Bearer ${userToken}` }
            })
                .then(response => {
                    setTasks([...tasks, response.data]);
                    setShowForm(false);
                })
                .catch(error => console.error("Error creating task:", error));
        }
    };

    return (
        <>
            <div className="tasks-container">
                <div className="tasks-header">
                    <h1>Tasks</h1>
                    <button style={{ width: "100px", margin: "0px" }} className="create-task-btn" onClick={handleCreateClick}>Create Task</button>
                </div>
                <div className="task-section">
                    <h2 className="tasks-heading">Pending tasks</h2>
                    <div className="incompleted-tasks">
                        {tasks.filter(task => !task.completed).map(task => (
                            <span key={task._id} className="incompleted-task">{task.description}<img className="edit-img" onClick={() => handleEditClick(task)} src="/edit-img.png" /></span>
                        ))}
                    </div>
                </div>

                <button style={{ margin: "0 auto" }} className="toggle-btn" onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
                </button>

                {showCompleted && (
                    <div className="task-section">
                        <h2 className="tasks-heading" >Completed Tasks</h2>
                        <div className="completed-tasks">
                            {tasks.filter(task => task.completed).map(task => (
                                <span key={task._id} className="completed-task">
                                    {task.description}
                                    <img className="edit-img" src="/edit-img.png" alt="Edit" onClick={() => handleEditClick(task)} />
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{selectedTask ? "Edit Task" : "Create Task"}</h2>
                            <form onSubmit={handleSaveTask}>
                                <label className="desc-label">
                                    Description:
                                    <input
                                        className="task-text-input"
                                        type="text"
                                        value={taskData.description}
                                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                        required
                                    />
                                </label>
                                <label className="checkbox-label">
                                    <input className="checkbox-input"
                                        type="checkbox"
                                        checked={taskData.completed}
                                        onChange={(e) => setTaskData({ ...taskData, completed: e.target.checked })}
                                    />
                                    Mark as Completed
                                </label>
                                <div className="modal-buttons">
                                    <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="submit-btn">
                                        {selectedTask ? "Update Task" : "Save Task"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div >

        </>
    )
}

export default TasksPage