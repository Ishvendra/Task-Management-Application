import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TasksProvider } from './features/tasks/state/TasksProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TasksProvider>
        <App />
      </TasksProvider>
    </BrowserRouter>
  </StrictMode>
);
