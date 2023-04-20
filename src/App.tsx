import React from 'react';
import { Phase } from 'components/Phase/Phase';
import { usePhases } from 'hooks/usePhases';
import styles from './App.module.css';
import RandomFact from 'components/RandomFact/RandomFact';

const App: React.FC = () => {
  const {
    phases,
    toggleTask,
    addTask,
    isAllPhasesCompleted,
    arePreviousPhasesIncomplete,
    isCurrentPhaseEnabled,
  } = usePhases();

  return (
    <div className={styles.appContainer}>
      <div className={styles.appContent}>
        <h1 className={styles.appTitle}>Start Up Progress</h1>
        {phases?.map((phase, index) => {
          return (
            <Phase
              key={phase.id}
              phase={phase}
              count={index}
              onToggleTask={isCurrentPhaseEnabled(index) ? toggleTask : () => null}
              onAddTask={addTask}
              phases={phases}
              isPhaseDisabled={arePreviousPhasesIncomplete(index)}
            />
          );
        })}
        <RandomFact isAllPhasesCompleted={isAllPhasesCompleted} />
      </div>
    </div>
  );
};

export default App;
