export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
};

export type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_SEARCH_TERM'; payload: string };

export type AppState = {
  tasks: Task[];
  searchTerm: string;
};
