import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onToggleTask, onToggleSubtask, onAddSubtask, onDeleteTask, onDeleteSubtask }) {
  return (
    <div className="task-list">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onToggleSubtask={onToggleSubtask}
            onAddSubtask={onAddSubtask}
            onDeleteTask={onDeleteTask}
            onDeleteSubtask={onDeleteSubtask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;