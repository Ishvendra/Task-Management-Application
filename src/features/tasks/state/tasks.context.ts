import React, { createContext } from 'react';
import { type Action, type AppState } from '../types';

type TasksContextType = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export const TasksContext = createContext<TasksContextType>({
  state: {
    searchTerm: '',
    tasks: [],
  },
  dispatch: () => null,
});
