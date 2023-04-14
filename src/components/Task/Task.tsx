import { TTask } from 'types';
import styles from './Task.module.css';

type TaskProps = {
  task: TTask;
  onToggle: (taskId: string, isCompleted: boolean) => void;
  disabled: boolean;
};

const Task = ({ task, onToggle, disabled }: TaskProps) => {
  return (
    <div className={styles.taskContainer}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, !task.completed)}
        id={task.id}
        disabled={disabled}
      />
      <label
        htmlFor={task.id}
        className={`${styles.description} ${disabled ? styles.disabledLabel : ''}`}
      >
        {task.description}
      </label>
      {task.completed && (
        <button
          disabled={disabled}
          className={styles.btnSm}
          onClick={() => onToggle(task.id, false)}
        >
          undo
        </button>
      )}
    </div>
  );
};

export default Task;
