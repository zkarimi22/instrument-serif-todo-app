import React from 'react';
import { motion } from 'framer-motion';
import './ThemeToggle.css';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="toggle-track"
        animate={{ backgroundColor: theme === 'dark' ? '#44403c' : '#e7e5e4' }}
      >
        <motion.div
          className="toggle-thumb"
          animate={{ x: theme === 'dark' ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {theme === 'light' ? '☀' : '☾'}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;