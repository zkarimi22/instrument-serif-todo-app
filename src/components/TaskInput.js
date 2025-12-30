import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TaskInput.css';

function TaskInput({ onAddTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input.trim());
      setInput('');
    }
  };

  return (
    <motion.form 
      className="task-input-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <input
        type="text"
        className="task-input"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <motion.button
        type="submit"
        className="add-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Add Task
      </motion.button>
    </motion.form>
  );
}

export default TaskInput;