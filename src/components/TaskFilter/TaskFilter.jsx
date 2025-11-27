import { useMemo } from 'react';

import styles from './TaskFilter.module.css';

const TaskFilter = ({ tasks, currentFilter, onFilterChange }) => {

  const counts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(task => !task.checked).length,
    completed: tasks.filter(task => task.checked).length,
  }), [tasks]);

  const filterButtons = [
    { id: 'all', label: `All (${counts.all})` },
    { id: 'active', label: `Active (${counts.active})` },
    { id: 'completed', label: `Completed (${counts.completed})` },
  ];

  return (
    <div className={styles.filter}>
      {filterButtons.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`${styles.button} ${currentFilter === id ? styles.active : ''}`}
          aria-pressed={currentFilter === id}
          onClick={() => onFilterChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;