import React, { useState, useEffect } from "react";
import { api } from "../../Configuration/Axios/AxiosConfiguration";
import ConfirmationModal from "./../modal/ConfirmationModal";
import AddTaskForm from "./../components/AddTaskForm";
import FilterSection from "./../components/FilterSection";
import TaskList from "./../components/TaskList";
import '../styles/TaskContainer.css';
import {AddTaskInput} from "../inputs/AddTaskInput";
import {UpdateTaskInput} from "../inputs/UpdateTaskInput";
import {UpdateTaskStatusInput} from "../inputs/UpdateTaskStatusInput";

const TaskContainer = () => {
    const [tasks, setTasks] = useState([]);
    const [taskDescription, setTaskDescription] = useState("");
    const [filter, setFilter] = useState("all");
    const [error, setError] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setError("");
            const response = await api.get(`${apiUrl}.todo`);
            setTasks(response.data.results);
        } catch (error) {
            handleError("Error fetching tasks.", error);
        }
    };

    const handleError = (errorMessage, error) => {
        setError(errorMessage);
        console.error(errorMessage, error);
    };

    const handleInputChange = (event) => {
        setError("");
        setTaskDescription(event.target.value);
    };

    const handleAddTask = async () => {
        if (taskDescription.trim() === "") {
            setError("Task description cannot be empty.");
            return;
        }

        try {
            setError("");
            const addTaskInput = new AddTaskInput(taskDescription, false);
            const response = await api.post(`${apiUrl}.todo`, addTaskInput);
            setTasks([...tasks, response.data]);
            setTaskDescription("");
        } catch (error) {
            handleError("Error creating task.", error);
        }
    };

    const handleTaskAction = async (taskId, data) => {
        try {
            setError("");
            const response = await api.put(`${apiUrl}.todo/${taskId}`, data);
            const updatedTasks = tasks.map((task) =>
                task.id === taskId ? response.data : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            handleError("Error updating task.", error);
        }
    };

    const handleTaskCompletion = async (taskId) => {
        const taskToUpdate = tasks.find((task) => task.id === taskId);
        const updatedCompletedStatus = !taskToUpdate.completed;
        const updateTaskStatusInput = new UpdateTaskStatusInput(updatedCompletedStatus);
        await handleTaskAction(taskId, updateTaskStatusInput);
    };

    const handleTaskEdit = async (taskId, updatedDescription) => {
        const updateTaskInput = new UpdateTaskInput(updatedDescription);

        await handleTaskAction(taskId, updateTaskInput);
    };

    const handleTaskDelete = (taskId) => {
        setShowConfirmation(true);
        setTaskIdToDelete(taskId);
    };

    const handleConfirmDelete = async () => {
        try {
            setError("");
            await api.delete(`${apiUrl}.todo/${taskIdToDelete}`);
            const updatedTasks = tasks.filter((task) => task.id !== taskIdToDelete);
            setTasks(updatedTasks);
            setShowConfirmation(false);
        } catch (error) {
            handleError("Error deleting task.", error);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            <AddTaskForm
                taskDescription={taskDescription}
                onInputChange={handleInputChange}
                onAddTask={handleAddTask}
            />
            {error && <div className="error">{error}</div>}
            <FilterSection
                filter={filter}
                onFilterChange={handleFilterChange}
            />
            <TaskList
                tasks={tasks}
                filter={filter}
                onComplete={handleTaskCompletion}
                onDelete={handleTaskDelete}
                onEdit={handleTaskEdit}
            />
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

export default TaskContainer;
