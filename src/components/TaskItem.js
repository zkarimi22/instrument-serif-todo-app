import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TaskItem.css';

function TaskItem({ task, onToggleTask, onToggleSubtask, onAddSubtask, onDeleteTask, onDeleteSubtask }) {
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskInput, setSubtaskInput] = useState('');

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (subtaskInput.trim()) {
      onAddSubtask(task.id, subtaskInput.trim());
      setSubtaskInput('');
      setShowSubtaskInput(false);
    }
  };

  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <motion.div
      className={`task-item ${task.completed ? 'completed' : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="task-main">
        <div className="task-content">
          <motion.button
            className="checkbox"
            onClick={() => onToggleTask(task.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {task.completed && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="checkmark"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
          <div className="task-text-wrapper">
            <span className="task-text">{task.text}</span>
            {totalSubtasks > 0 && (
              <span className="subtask-count">
                {completedSubtasks}/{totalSubtasks}
              </span>
            )}
          </div>
        </div>
        <div className="task-actions">
          {!task.completed && (
            <motion.button
              className="action-btn"
              onClick={() => setShowSubtaskInput(!showSubtaskInput)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              +
            </motion.button>
          )}
          <motion.button
            className="action-btn delete-btn"
            onClick={() => onDeleteTask(task.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ×
          </motion.button>
        </div>
      </div>

      {showSubtaskInput && (
        <motion.form
          className="subtask-input-form"
          onSubmit={handleAddSubtask}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <input
            type="text"
            className="subtask-input"
            placeholder="Add a subtask..."
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="subtask-add-btn">
            Add
          </button>
        </motion.form>
      )}

      {task.subtasks.length > 0 && (
        <div className="subtasks">
          {task.subtasks.map((subtask) => (
            <motion.div
              key={subtask.id}
              className={`subtask-item ${subtask.completed ? 'completed' : ''}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              layout
            >
              <motion.button
                className="checkbox subtask-checkbox"
                onClick={() => onToggleSubtask(task.id, subtask.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {subtask.completed && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="checkmark"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
              <span className="subtask-text">{subtask.text}</span>
              <motion.button
                className="action-btn delete-btn subtask-delete"
                onClick={() => onDeleteSubtask(task.id, subtask.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default TaskItem;