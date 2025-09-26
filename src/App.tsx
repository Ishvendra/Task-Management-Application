import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TaskListPage from './pages/tasks-page/TasksPage';
import AddTask from './pages/add-task/AddTask';
import EditTask from './pages/edit-task/EditTask';

function App() {
  return (
    <div>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<TaskListPage />} />
        <Route path='/add' element={<AddTask />} />
        <Route path='/edit/:taskId' element={<EditTask />} />
      </Routes>
    </div>
  );
}
export default App;
