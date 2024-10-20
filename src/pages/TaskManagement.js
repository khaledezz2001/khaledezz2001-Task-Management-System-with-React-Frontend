// src/pages/TaskManagement.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, updateTask } from "../redux/taskSlice";
import "../styles/TaskManagement.css";
import { Link } from "react-router-dom";

function TaskManagement() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [sortMethod, setSortMethod] = useState("normal"); // State for sorting method

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: editingTaskId || Date.now(),
      title: taskTitle,
      dueDate: taskDueDate,
      priority: taskPriority,
      status: taskStatus,
      description: taskDescription,
    };

    if (editingTaskId) {
      dispatch(updateTask({ id: editingTaskId, updatedTask: newTask }));
      setEditingTaskId(null);
    } else {
      dispatch(addTask(newTask));
    }

    setTaskTitle("");
    setTaskDueDate("");
    setTaskPriority("");
    setTaskStatus("");
    setTaskDescription("");
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  const handleEditTask = (task) => {
    setTaskTitle(task.title);
    setTaskDueDate(task.dueDate);
    setTaskPriority(task.priority);
    setTaskStatus(task.status);
    setTaskDescription(task.description);
    setEditingTaskId(task.id);
  };

  // Function to get the background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "lightgreen";
      case "medium":
        return "lightyellow";
      case "high":
        return "lightcoral";
      default:
        return "white";
    }
  };

  // Function to sort tasks based on the current sort method
  const getSortedTasks = () => {
    switch (sortMethod) {
      case "status":
        return [...tasks].sort((a, b) => {
          const statusOrder = { pending: 1, "in-progress": 2, completed: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
      case "priority":
        return [...tasks].sort((a, b) => {
          const priorityOrder = { low: 3, medium: 2, high: 1 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      case "normal":
      default:
        return tasks; // Return tasks in their original order
    }
  };

  const sortedTasks = getSortedTasks();

  return (
    <div className="task-container">
      <h2>Task Management</h2>
      <form className="task-form" onSubmit={handleAddTask}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows="3"
            required
          />
        </div>
        <div className="form-group">
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>
      <div className="sorting-buttons">
        <h3>Sort Tasks By:</h3>
        <button onClick={() => setSortMethod("normal")}>Normal</button>
        <button onClick={() => setSortMethod("status")}>Status</button>
        <button onClick={() => setSortMethod("priority")}>Priority</button>
      </div>
      <div className="task-list">
        <h3>Task List (Sorted by {sortMethod})</h3>
        <ul>
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              Title: <strong>{task.title}</strong>
              <hr></hr>
              <p>{task.description}</p>
              <hr></hr>
              <span>Due: {task.dueDate}</span>
              <br></br>
              <span>Priority: {task.priority}</span>
              <br></br>
              <span>Status: {task.status}</span>
              <hr></hr>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <p>
        <Link to="/">Go to Login</Link> |{" "}
        <Link to="/signup">Go to Sign Up</Link>
      </p>
    </div>
  );
}

export default TaskManagement;
