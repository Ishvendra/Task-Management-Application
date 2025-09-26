import { useReducer, useEffect, type ReactNode } from 'react';
import { tasksReducer } from './tasksReducer';
import { TasksContext } from './tasks.context';
import type { AppState } from '../types';

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    searchTerm: '',
  };
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
