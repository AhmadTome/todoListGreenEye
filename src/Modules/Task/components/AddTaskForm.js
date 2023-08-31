import React from "react";

const AddTaskForm = ({ taskDescription, onInputChange, onAddTask }) => {
    return (
        <div className="add-task-form">
            <input
                type="text"
                value={taskDescription}
                onChange={onInputChange}
                placeholder="Enter task description"
            />
            <button onClick={onAddTask}>Add Task</button>
        </div>
    );
};

export default AddTaskForm;
