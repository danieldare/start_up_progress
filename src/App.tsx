import React from 'react';
import { Phase } from 'components/Phase/Phase';
import { usePhases } from 'hooks/usePhases';
import styles from './App.module.css';
import RandomFact from 'components/RandomFact/RandomFact';

const App: React.FC = () => {
  const { phases, toggleTask, addTask, isAllPhasesCompleted } = usePhases();

  return (
    <div className={styles.appContainer}>
      <div className={styles.appContent}>
        <h1 className={styles.appTitle}>Start Up Progress</h1>
        {phases.map((phase, index) => {
          const previousPhaseCompleted = index === 0 || phases[index - 1].completed;
          return (
            <Phase
              key={phase.id}
              phase={phase}
              count={index}
              onToggleTask={previousPhaseCompleted ? toggleTask : () => null}
              onAddTask={addTask}
              phases={phases}
            />
          );
        })}
        <RandomFact isAllPhasesCompleted={isAllPhasesCompleted} />
      </div>
    </div>
  );
};

export default App;
