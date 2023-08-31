import React, { useState } from "react";
import '../styles/Task.css';

const Task = ({ task, onComplete, onDelete, onEdit }) => {
    const { id, description, completed } = task;
    const [editableDescription, setEditableDescription] = useState(description);
    const [isEditing, setIsEditing] = useState(false);

    const handleComplete = () => {
        onComplete(id);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(id, editableDescription);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditableDescription(description);
        setIsEditing(false);
    };

    const handleDescriptionChange = (event) => {
        setEditableDescription(event.target.value);
    };

    const renderEditButtons = (
        <>
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </>
    );

    const renderNormalButtons = (
        <>
            <button onClick={handleComplete} className="complete-btn">
                {completed ? "Undo" : "Complete"}
            </button>
            <button onClick={handleEdit} className="edit-btn">
                Edit
            </button>
            <button onClick={handleDelete} className="delete-btn">
                Delete
            </button>
        </>
    );

    return (
        <div className={`task ${completed ? "completed" : ""}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={editableDescription}
                    onChange={handleDescriptionChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSave();
                        } else if (e.key === "Escape") {
                            handleCancel();
                        }
                    }}
                    autoFocus
                />
            ) : (
                <span>{description}</span>
            )}
            <div>
                {isEditing ? renderEditButtons : renderNormalButtons}
            </div>
        </div>
    );
};

export default Task;
