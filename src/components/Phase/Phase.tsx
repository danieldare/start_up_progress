import { useState } from 'react';
import { TPhase } from 'types';
import Task from 'components/Task';
import styles from './Phase.module.css';
import TaskForm from 'components/TaskForm';
import checkMarkIcon from 'assets/icons/check.png';

type PhaseProps = {
  phase: TPhase;
  onToggleTask: (taskId: string, completed: boolean) => void;
  count: number;
  onAddTask: (phaseId: string, description: string) => void;
  phases: TPhase[];
  isPhaseDisabled: boolean;
};

export const Phase = ({ phase, onToggleTask, count, onAddTask, isPhaseDisabled }: PhaseProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (description: string) => {
    onAddTask(phase.id, description);
    setShowForm(false);
  };

  return (
    <div className={styles.phaseContainer}>
      <div className={styles.heading}>
        <span className={styles.count}>{count + 1}</span>
        <h3 className={styles.title}>{phase.title}</h3>
        {phase.completed && (
          <img className={styles.img} src={checkMarkIcon} alt="phase-completed" />
        )}
      </div>
      {phase.tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggleTask} disabled={isPhaseDisabled} />
      ))}
      {showForm && <TaskForm onSubmit={handleAddTask} />}
      {!showForm && (
        <button className="btn" onClick={() => setShowForm(true)}>
          Add Task
        </button>
      )}
    </div>
  );
};
