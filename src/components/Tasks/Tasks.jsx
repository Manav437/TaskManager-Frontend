import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Tasks.css";

const ItemTypes = {
    TASK: "task",
};

function DraggableTask({ task, onEdit, onDelete }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <span
            ref={drag}
            className={`${task.status === "done"
                ? "done-task"
                : task.status === "in-progress"
                    ? "inprogress-task"
                    : "todo-task"
                }`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {task.description}
            <div style={{ display: "flex", gap: "9px" }}>
                <img
                    style={{ background: "#5EABD6" }}
                    className="edit-img"
                    src="/edit-img.png"
                    alt="Edit"
                    onClick={() => onEdit(task)}
                />
                <img
                    style={{ background: "#DA6C6C" }}
                    className="edit-img"
                    src="/delete-img.png"
                    alt="Delete"
                    onClick={() => onDelete(task._id)}
                />
            </div>
        </span>
    );
}

function DropZone({ children, onDropTask, newStatus }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item) => {
            onDropTask(item.id, newStatus);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                backgroundColor: isOver ? "#e0ffe0" : undefined,
                minHeight: "100px",
                maxHeight: "500px",
                overflowY: "auto"
            }}
        >
            {children}
        </div>
    );
}

function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskData, setTaskData] = useState({
        description: "",
        status: "todo",
    });

    const [sortOrder, setSortOrder] = useState("newest");

    const userToken = localStorage.getItem("token");

    useEffect(() => {
        axios.get("https://task-manager-backend-5hkl.onrender.com/tasks", {
            // axios.get("http://localhost:3000/tasks", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }, []);

    const handleCreateClick = () => {
        setSelectedTask(null);
        setTaskData({ description: "", status: "todo" });
        setShowForm(true);
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setTaskData({
            description: task.description,
            status: task.status,
        });
        setShowForm(true);
    };

    const handleSaveTask = (e) => {
        e.preventDefault();

        if (selectedTask) {
            axios.patch(`https://task-manager-backend-5hkl.onrender.com/tasks/${selectedTask._id}`, taskData, {
                // axios.patch(`http://localhost:3000/tasks/${selectedTask._id}`, taskData, {
                headers: { Authorization: `Bearer ${userToken}` },
            })
                .then((response) => {
                    setTasks((prev) =>
                        prev.map((task) =>
                            task._id === response.data._id ? response.data : task
                        )
                    );
                    setShowForm(false);
                })
                .catch((error) => console.error("Error updating task:", error));
        } else {
            axios.post("https://task-manager-backend-5hkl.onrender.com/tasks", taskData, {
                // axios.post("http://localhost:3000/tasks", taskData, {
                headers: { Authorization: `Bearer ${userToken}` },
            })
                .then((response) => {
                    setTasks((prev) => [...prev, response.data]);
                    setShowForm(false);
                })
                .catch((error) => console.error("Error creating task:", error));
        }
    };

    const handleDropTask = (id, newStatus) => {
        axios.patch(`https://task-manager-backend-5hkl.onrender.com/tasks/${id}`,
            // axios.patch(`http://localhost:3000/tasks/${id}`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${userToken}` } }
        )
            .then((response) => {
                setTasks((prev) =>
                    prev.map((t) => (t._id === id ? response.data : t))
                );
            })
            .catch((error) => console.error("Error updating task status:", error));
    };

    const handleDeleteTask = (id) => {
        axios.delete(`https://task-manager-backend-5hkl.onrender.com/tasks/${id}`, {
            // axios.delete(`http://localhost:3000/tasks/${id}`, {
            headers: { Authorization: `Bearer ${userToken}` },
        })
            .then(() => {
                setTasks((prev) => prev.filter((task) => task._id !== id));
            })
            .catch((error) => console.log("Error deleting task", error));
    };

    // Sorting logic
    const sortTasks = (tasks) => {
        return tasks.sort((a, b) => {
            if (sortOrder === "newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            if (sortOrder === "oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            if (sortOrder === "az") {
                return a.description.localeCompare(b.description);
            }
            if (sortOrder === "za") {
                return b.description.localeCompare(a.description);
            }
            return 0;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="tasks-div">
                <div className="tasks-container">
                    <div className="tasks-header">
                        <h1 style={{ fontSize: "2.5rem", marginLeft: "10px" }}>TASKS</h1>
                        <button className="create-task-btn" onClick={handleCreateClick}>
                            <img style={{ height: "15px" }} src="/add.svg" alt="" />
                            New Task
                        </button>
                    </div>

                    <div className="sort-div">
                        <label htmlFor="sortOrder">Sort by:</label>
                        <select
                            value={sortOrder}
                            id="sortOrder"
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                    </div>

                    <div className="row-layout">
                        <div className="task-section">
                            <h2 className="tasks-heading" style={{ color: "#FFA673" }}>
                                To Do
                            </h2>
                            <DropZone onDropTask={handleDropTask} newStatus="todo">
                                <div className="tasks-column">
                                    {sortTasks(
                                        tasks.filter((task) => task.status === "todo")
                                    ).map((task) => (
                                        <DraggableTask
                                            key={task._id}
                                            task={task}
                                            onEdit={handleEditClick}
                                            onDelete={handleDeleteTask}
                                        />
                                    ))}
                                </div>
                            </DropZone>
                        </div>

                        <div className="task-section">
                            <h2 className="tasks-heading" style={{ color: "#FFA500" }}>
                                In Progress
                            </h2>
                            <DropZone onDropTask={handleDropTask} newStatus="in-progress">
                                <div className="tasks-column">
                                    {sortTasks(
                                        tasks.filter((task) => task.status === "in-progress")
                                    ).map((task) => (
                                        <DraggableTask
                                            key={task._id}
                                            task={task}
                                            onEdit={handleEditClick}
                                            onDelete={handleDeleteTask}
                                        />
                                    ))}
                                </div>
                            </DropZone>
                        </div>

                        <div className="task-section">
                            <h2 className="tasks-heading" style={{ color: "#06923E" }}>
                                Done
                            </h2>
                            <DropZone onDropTask={handleDropTask} newStatus="done">
                                <div className="tasks-column">
                                    {sortTasks(
                                        tasks.filter((task) => task.status === "done")
                                    ).map((task) => (
                                        <DraggableTask
                                            key={task._id}
                                            task={task}
                                            onEdit={handleEditClick}
                                            onDelete={handleDeleteTask}
                                        />
                                    ))}
                                </div>
                            </DropZone>
                        </div>
                    </div>

                    {showForm && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2 style={{ fontWeight: "800" }}>
                                    {selectedTask ? "Edit Task" : "Create Task"}
                                </h2>
                                <form onSubmit={handleSaveTask}>
                                    <label className="desc-label">
                                        Description:
                                        <input
                                            className="task-text-input"
                                            type="text"
                                            value={taskData.description}
                                            onChange={(e) =>
                                                setTaskData({
                                                    ...taskData,
                                                    description: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </label>
                                    <label className="desc-label">
                                        Status:
                                        <select
                                            className="task-text-input"
                                            value={taskData.status}
                                            onChange={(e) =>
                                                setTaskData({ ...taskData, status: e.target.value })
                                            }
                                        >
                                            <option value="todo">To Do</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </label>

                                    <div className="modal-buttons">
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => setShowForm(false)}
                                        >
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
                </div>
            </div>
        </DndProvider>
    );
}

export default TasksPage;
