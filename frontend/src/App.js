import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './index.css';

function App() {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
