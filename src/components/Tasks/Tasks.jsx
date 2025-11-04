import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getTasks, createTask, updateTask, deleteTask } from "../../utils/api";
import TaskModal from "../TaskModal/TaskModal";
import "./Tasks.css";

const ItemTypes = { TASK: "task" };

function DraggableTask({ task, onEdit, onDelete }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: { id: task._id, from: task.status },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }));

    return (
        <div ref={drag} className={`task-card ${isDragging ? "dragging" : ""}`}>
            <p>{task.description}</p>
            <div className="task-card-actions">
                <button onClick={() => onEdit(task)} className="icon-button">
                    <img
                        style={{ height: "15px" }}
                        src="/edit-img.png"
                        alt="Edit"
                    />
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="icon-button"
                >
                    <img
                        style={{ height: "15px" }}
                        src="/delete-img.png"
                        alt="delete"
                    />
                </button>
            </div>
        </div>
    );
}

function Column({ title, status, tasks, onDropTask, onEdit, onDelete }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item) => {
            if (item.from !== status) {
                onDropTask(item.id, status);
            }
        },
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }));

    return (
        <div className="task-column">
            <div className={`column-header ${status}-header`}>
                <h3>{title}</h3>
                <span>{tasks.length}</span>
            </div>
            <div ref={drop} className={`drop-zone ${isOver ? "over" : ""}`}>
                {tasks.map((task) => (
                    <DraggableTask
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}

function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [sortOrder, setSortOrder] = useState("newest");
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(
            () => setToast({ show: false, message: "", type: "" }),
            3000,
        );
    };

    const fetchTasks = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            showToast("Failed to fetch tasks.", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    // In TasksPage component

    const handleSaveTask = async (data) => {
        try {
            if (selectedTask) {
                await updateTask(selectedTask._id, data);
                showToast("Task updated successfully!");
            } else {
                // Create logic
                await createTask({ ...data, status: "todo" });
                showToast("Task created successfully!");
            }

            fetchTasks();
        } catch (error) {
            showToast("Failed to save task.", error);
        } finally {
            setShowModal(false);
            setSelectedTask(null);
        }
    };

    const handleDropTask = async (id, newStatus) => {
        const originalTasks = tasks;
        const updatedTasks = tasks.map((t) =>
            t._id === id ? { ...t, status: newStatus } : t,
        );
        setTasks(updatedTasks);

        try {
            await updateTask(id, { status: newStatus });
        } catch (error) {
            showToast("Failed to move task.", error);
            setTasks(originalTasks);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(id);
                // Add "error" as the second argument here
                showToast("Task deleted.", "error");
                fetchTasks();
            } catch (error) {
                showToast("Failed to delete task.", error);
            }
        }
    };

    const sortedAndGroupedTasks = useMemo(() => {
        const sorted = [...tasks].sort((a, b) => {
            if (sortOrder === "newest")
                return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortOrder === "oldest")
                return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortOrder === "az")
                return a.description.localeCompare(b.description);
            if (sortOrder === "za")
                return b.description.localeCompare(a.description);
            return 0;
        });

        return {
            todo: sorted.filter((t) => t.status === "todo"),
            "in-progress": sorted.filter((t) => t.status === "in-progress"),
            done: sorted.filter((t) => t.status === "done"),
        };
    }, [tasks, sortOrder]);

    if (isLoading) {
        return <TasksSkeleton />;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="tasks-page">
                {toast.show && (
                    <div className={`toast ${toast.type}`}>{toast.message}</div>
                )}

                <header className="tasks-header">
                    <h1>My Tasks</h1>
                    <div className="header-actions">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="newest">Sort: Newest</option>
                            <option value="oldest">Sort: Oldest</option>
                            <option value="az">Sort: A-Z</option>
                            <option value="za">Sort: Z-A</option>
                        </select>
                        <button
                            onClick={() => {
                                setSelectedTask(null);
                                setShowModal(true);
                            }}
                            className="create-task-btn"
                        >
                            + New Task
                        </button>
                    </div>
                </header>

                <div className="kanban-board">
                    <Column
                        title="To Do"
                        status="todo"
                        tasks={sortedAndGroupedTasks.todo}
                        onDropTask={handleDropTask}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTask}
                    />
                    <Column
                        title="In Progress"
                        status="in-progress"
                        tasks={sortedAndGroupedTasks["in-progress"]}
                        onDropTask={handleDropTask}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTask}
                    />
                    <Column
                        title="Done"
                        status="done"
                        tasks={sortedAndGroupedTasks.done}
                        onDropTask={handleDropTask}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTask}
                    />
                </div>

                {showModal && (
                    <TaskModal
                        task={selectedTask}
                        onSave={handleSaveTask}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedTask(null);
                        }}
                    />
                )}
            </div>
        </DndProvider>
    );
}

const TasksSkeleton = () => (
    <div className="tasks-page">
        <header className="tasks-header">
            <h1>My Tasks</h1>
        </header>
        <div className="kanban-board">
            {[1, 2, 3].map((i) => (
                <div key={i} className="task-column">
                    <div
                        className="column-header shimmer"
                        style={{ height: "25px" }}
                    ></div>
                    <div className="drop-zone">
                        <div
                            className="task-card shimmer"
                            style={{ height: "30px" }}
                        ></div>
                        <div
                            className="task-card shimmer"
                            style={{ height: "30px" }}
                        ></div>
                        <div
                            className="task-card shimmer"
                            style={{ height: "30px" }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default TasksPage;
