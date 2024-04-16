import React, { useState } from 'react';
import axios from 'axios';

function TaskForm() {
  const [task, setTask] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/tasks', task);
      alert('Task added!');
      setTask({ title: '', description: '' });
    } catch (error) {
      console.log(error)
      alert('Failed to add task!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
