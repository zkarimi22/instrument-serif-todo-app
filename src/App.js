import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      subtasks: []
    };
    setTasks([newTask, ...tasks]);
  };

  const addSubtask = (taskId, subtaskText) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [...task.subtasks, {
            id: Date.now(),
            text: subtaskText,
            completed: false
          }]
        };
      }
      return task;
    }));
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(subtask => {
            if (subtask.id === subtaskId) {
              return { ...subtask, completed: !subtask.completed };
            }
            return subtask;
          })
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId)
        };
      }
      return task;
    }));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className={`app ${theme}`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="app-header">
          <h1>Tasks</h1>
          <p className="subtitle">Organize your day with clarity</p>
        </header>

        <TaskInput onAddTask={addTask} />

        <div className="tasks-section">
          {activeTasks.length > 0 && (
            <div className="section-block">
              <h2 className="section-title">Active</h2>
              <TaskList
                tasks={activeTasks}
                onToggleTask={toggleTask}
                onToggleSubtask={toggleSubtask}
                onAddSubtask={addSubtask}
                onDeleteTask={deleteTask}
                onDeleteSubtask={deleteSubtask}
              />
            </div>
          )}

          {completedTasks.length > 0 && (
            <div className="section-block">
              <h2 className="section-title">Completed</h2>
              <TaskList
                tasks={completedTasks}
                onToggleTask={toggleTask}
                onToggleSubtask={toggleSubtask}
                onAddSubtask={addSubtask}
                onDeleteTask={deleteTask}
                onDeleteSubtask={deleteSubtask}
              />
            </div>
          )}

          {tasks.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>No tasks yet. Create one to get started.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;