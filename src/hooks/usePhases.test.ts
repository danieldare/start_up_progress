import { renderHook } from '@testing-library/react';
import { usePhases } from './usePhases';
import { initialPhases } from 'data';
import { act } from 'react-dom/test-utils';

describe('usePhases', () => {
  afterEach(() => {
    localStorage.removeItem('phases');
  });

  it('should initialize with initialPhases if localStorage is empty', () => {
    const { result } = renderHook(() => usePhases());
    expect(result.current.phases).toEqual(initialPhases);
  });

  it('should initialize with localStorage data if available', () => {
    const storedPhases = JSON.stringify(initialPhases);
    localStorage.setItem('phases', storedPhases);
    const { result } = renderHook(() => usePhases());
    expect(result.current.phases).toEqual(initialPhases);
  });

  it('should add a task to a specific phase', () => {
    const { result } = renderHook(() => usePhases());
    const phaseId = initialPhases[0].id;
    const description = 'New task description';

    act(() => {
      result.current.addTask(phaseId, description);
    });

    const newTask = result.current.phases[0].tasks.find((task) => task.description === description);
    expect(newTask).toBeDefined();
    expect(result.current.phases[0].tasks).toHaveLength(5);
  });

  it('should toggle task completion', () => {
    const { result } = renderHook(() => usePhases());
    const taskId = initialPhases[0].tasks[0].id;

    act(() => {
      result.current.toggleTask(taskId, true);
    });

    const updatedTask = result.current.phases[0].tasks.find((task) => task.id === taskId);
    expect(updatedTask?.completed).toBe(true);
  });

  it('should determine if all phases are completed', () => {
    renderHook(() => usePhases());
    const completedPhases = initialPhases.map((phase) => ({
      ...phase,
      completed: true,
      tasks: phase.tasks.map((task) => ({ ...task, completed: true })),
    }));

    localStorage.setItem('phases', JSON.stringify(completedPhases));
    const { result } = renderHook(() => usePhases());
    expect(result.current.isAllPhasesCompleted).toBe(true);
  });
});
