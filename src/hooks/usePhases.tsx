import { initialPhases } from 'data';
import { useState, useMemo } from 'react';
import { TPhase, TTask } from 'types';
import { v4 as uuid } from 'uuid';

export const usePhases = () => {
  const [phases, setPhases] = useState<TPhase[]>(() => {
    const storedPhases = localStorage.getItem('phases');
    return storedPhases ? JSON.parse(storedPhases) : initialPhases;
  });

  const saveState = (updatedPhases: TPhase[]) => {
    setPhases(updatedPhases);
    localStorage.setItem('phases', JSON.stringify(updatedPhases));
  };

  const addTask = (phaseId: string, description: string) => {
    const updatedPhases = phases.map((phase) => {
      if (phase.id === phaseId) {
        const newTask: TTask = {
          id: uuid(),
          description,
          completed: false,
        };
        return { ...phase, tasks: [...phase.tasks, newTask] };
      }
      return phase;
    });

    saveState(updatedPhases);
  };

  const toggleTask = (taskId: string, completed: boolean) => {
    const updatedPhases = phases.map((phase) => {
      const updatedTasks = phase.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed };
        }
        return task;
      });

      return {
        ...phase,
        tasks: updatedTasks,
        completed: updatedTasks.every((task) => task.completed),
      };
    });
    saveState(updatedPhases);
  };

  const isAllPhasesCompleted = useMemo(
    () => !!phases.length && phases.every((phase) => phase.completed),
    [phases],
  );

  const arePreviousPhasesIncomplete = (targetIndex: number) => {
    for (let i = 0; i < targetIndex; i++) {
      if (!phases[i].completed) {
        return true;
      }
    }
    return false;
  };

  const isCurrentPhaseEnabled = (targetIndex: number) =>
    targetIndex === 0 || phases[targetIndex - 1].completed;

  return {
    phases,
    toggleTask,
    addTask,
    isAllPhasesCompleted,
    arePreviousPhasesIncomplete,
    isCurrentPhaseEnabled,
  };
};
