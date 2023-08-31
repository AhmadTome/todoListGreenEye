import React from "react";
import Task from "./Task";
import TaskStatus from "../constants/taskStatus";

const TaskList = ({ tasks, filter, onComplete, onDelete, onEdit }) => {
    const filteredTasks = tasks.filter((task) => {
        if (filter === TaskStatus.COMPLETED) {
            return task.completed;
        } else if (filter === TaskStatus.UNCOMPLETED) {
            return !task.completed;
        } else {
            return true;
        }
    });

    return (
        <div className="task-list">
            {filteredTasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onComplete={() => onComplete(task.id)}
                    onDelete={() => onDelete(task.id)}
                    onEdit={(id, newDescription) => onEdit(task.id, newDescription)}
                />
            ))}
        </div>
    );
};

export default TaskList;