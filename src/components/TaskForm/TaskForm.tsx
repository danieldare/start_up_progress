import React, { useState } from 'react';
import styles from './TaskForm.module.css';

type TaskFormProps = {
  onSubmit: (description: string) => void;
};

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className={styles.input}
        />
        <button type="submit" className="btn">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
