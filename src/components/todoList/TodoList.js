import React, { useState, useEffect } from "react";
import Task from "../task/Task";
import ConfirmationModal from "../task/modal/confimation/ConfirmationModal";
import './todoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [taskDescription, setTaskDescription] = useState("");
    const [filter, setFilter] = useState("all"); // "all", "completed", or "uncompleted"
    const [error, setError] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (event) => {
        setError("");
        setTaskDescription(event.target.value);
    };

    const handleAddTask = () => {
        if (taskDescription.trim() === "") {
            setError("Task description cannot be empty.");
            return;
        }

        const newTask = {
            id: Date.now(),
            description: taskDescription,
            completed: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskDescription("");
    };

    const handleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleTaskEdit = (taskId, newDescription) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, description: newDescription } : task
        );
        setTasks(updatedTasks);
    };

    const handleTaskDelete = (taskId) => {
        setShowConfirmation(true);
        setTaskIdToDelete(taskId);
    };

    const handleConfirmDelete = () => {
        const confirmed = true;
        if (confirmed) {
            const updatedTasks = tasks.filter((task) => task.id !== taskIdToDelete);
            if (updatedTasks.length === tasks.length) {
                setError("Task does not exist.");
            } else {
                setTasks(updatedTasks);
                setError("");
            }
        }
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") {
            return task.completed;
        } else if (filter === "uncompleted") {
            return !task.completed;
        } else {
            return true;
        }
    });

    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            <div className="add-task-form">
                <input
                    type="text"
                    value={taskDescription}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="filter-section">
                <label htmlFor="filter">Filter:</label>
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed Tasks</option>
                    <option value="uncompleted">Uncompleted Tasks</option>
                </select>
            </div>
            <div className="task-list">
                {filteredTasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onComplete={handleTaskCompletion}
                        onDelete={handleTaskDelete}
                        onEdit={handleTaskEdit}
                    />
                ))}
            </div>

            {showConfirmation && (
                <ConfirmationModal
                    message="Are you sure you want to delete this task?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default TodoList;
