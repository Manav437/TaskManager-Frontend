import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Tasks.css"

const ItemTypes = {
    TASK: "task",
};

function DraggableTask({ task, onEdit }) {
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
            className={task.completed ? "completed-task" : "incompleted-task"}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {task.description}
            <img
                className="edit-img"
                src="/edit-img.png"
                alt="Edit"
                onClick={() => onEdit(task)}
            />
        </span>
    );
}

function DropZone({ children, onDropTask, acceptCompleted }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item) => {
            onDropTask(item.id, acceptCompleted);
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
            }}
        >
            {children}
        </div>
    );
}


function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskData, setTaskData] = useState({ description: "", completed: false });

    const userToken = localStorage.getItem("token");

    useEffect(() => {
        axios.get("https://task-manager-backend-5hkl.onrender.com/tasks", {
            // axios.get("http://localhost:3000/tasks", {
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
            axios.patch(`https://task-manager-backend-5hkl.onrender.com/tasks/${selectedTask._id}`, taskData, {
                // axios.patch(`http://localhost:3000/tasks/${selectedTask._id}`, taskData, {

                headers: { Authorization: `Bearer ${userToken}` }
            })
                .then(response => {
                    setTasks(tasks.map(task => task._id === response.data._id ? response.data : task));
                    setShowForm(false);
                })
                .catch(error => console.error("Error updating task:", error));
        } else {
            // Create new task
            axios.post("https://task-manager-backend-5hkl.onrender.com/tasks", taskData, {
                // axios.post("http://localhost:3000/tasks", taskData, {
                headers: { Authorization: `Bearer ${userToken}` }
            })
                .then(response => {
                    setTasks([...tasks, response.data]);
                    setShowForm(false);
                })
                .catch(error => console.error("Error creating task:", error));
        }
    };

    const handleDropTask = (id, completedStatus) => {
        // const task = tasks.find((t) => t._id === id);
        // if (!task || task.completed === completedStatus) return;

        axios
            .patch(
                `https://task-manager-backend-5hkl.onrender.com/tasks/${id}`,
                // `http://localhost:3000/tasks/${id}`,
                { completed: completedStatus },
                { headers: { Authorization: `Bearer ${userToken}` } }
            )
            .then((response) => {
                setTasks((prev) =>
                    prev.map((t) => (t._id === id ? response.data : t))
                );
            })
            .catch((error) => console.error("Error updating task status:", error));
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="tasks-div">
                <div className="tasks-container">
                    <div className="tasks-header">
                        <h1 style={{ fontSize: "2.5rem", marginLeft: "10px" }}>TASKS</h1>
                        <button
                            style={{ padding: "5px", gap: "5px", display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "100px", marginRight: "10px" }}
                            className="create-task-btn"
                            onClick={handleCreateClick}
                        >
                            <img style={{ height: "15px" }} src="/add.svg" alt="" />
                            New Task
                        </button>
                    </div>

                    <div className="task-section">
                        <h2 className="tasks-heading" >
                            Pending tasks
                        </h2>
                        <DropZone onDropTask={handleDropTask} acceptCompleted={false}>
                            <div className="incompleted-tasks">
                                {tasks
                                    .filter((task) => !task.completed)
                                    .map((task) => (
                                        <DraggableTask
                                            key={task._id}
                                            task={task}
                                            onEdit={handleEditClick}
                                        />
                                    ))}
                            </div>
                        </DropZone>
                    </div>

                    <button
                        className="toggle-btn"
                        style={{ cursor: "pointer", border: "none", borderRadius: "5px", marginLeft: "0px", height: "40px", width: "120px" }}
                        onClick={() => setShowCompleted(!showCompleted)}
                    >
                        {showCompleted ? "Hide Completed Tasks ↑" : "Show Completed Tasks ↓"}
                    </button>

                    {showCompleted && (
                        <div className="task-section" style={{ marginTop: "20px" }}>
                            <h2
                                className="tasks-heading"
                                style={{
                                    // marginLeft: "7px",
                                    // marginTop: "7px",
                                    // width: "180px",
                                    color: "green",
                                }}
                            >
                                Completed Tasks
                            </h2>
                            <DropZone onDropTask={handleDropTask} acceptCompleted={true}>
                                <div className="completed-tasks">
                                    {tasks
                                        .filter((task) => task.completed)
                                        .map((task) => (
                                            <DraggableTask
                                                key={task._id}
                                                task={task}
                                                onEdit={handleEditClick}
                                            />
                                        ))}
                                </div>
                            </DropZone>
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
                                            onChange={(e) =>
                                                setTaskData({ ...taskData, description: e.target.value })
                                            }
                                            required
                                        />
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            className="checkbox-input"
                                            type="checkbox"
                                            checked={taskData.completed}
                                            onChange={(e) =>
                                                setTaskData({ ...taskData, completed: e.target.checked })
                                            }
                                        />
                                        Mark as Completed
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
    )
}

export default TasksPage