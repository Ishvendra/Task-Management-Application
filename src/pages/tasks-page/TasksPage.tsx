import { useContext, useMemo } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { Link } from 'react-router-dom';
import { TasksContext } from '../../features/tasks/state/tasks.context';
import TaskList from '../../features/tasks/components/TaskList';
import Header from '../../components/header/Header';
import PlusIcon from '../../assets/icons/plus.svg?react';
import SearchBar from '../../components/search-bar/SearchBar';
import styles from './TasksPage.module.css';

const TaskListPage = () => {
  const { state } = useContext(TasksContext);
  const debouncedSearchTerm = useDebounce(state.searchTerm, 300);

  const filteredTasks = useMemo(() => {
    if (!debouncedSearchTerm) {
      return state.tasks;
    }
    return state.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
    );
  }, [state.tasks, debouncedSearchTerm]);

  const pendingTasks = filteredTasks.filter(
    (task) => task.status === 'Pending'
  );
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === 'In Progress'
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === 'Completed'
  );

  return (
    <div className={styles.appContainer}>
      <div className={styles.stickyHeader}>
        <Header title='TO-DO APP' />
        <SearchBar />
      </div>
      <main className={styles.mainContent}>
        <TaskList title='In Progress' tasks={inProgressTasks} />
        <TaskList title='Pending' tasks={pendingTasks} />
        <TaskList title='Completed' tasks={completedTasks} />
      </main>
      <Link to='/add' className={styles.fab}>
        <PlusIcon />
      </Link>
    </div>
  );
};

export default TaskListPage;
