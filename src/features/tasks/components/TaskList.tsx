import { useState } from 'react';
import { type Task } from '../types';
import TaskItem from './TaskItem';
import ChevronDown from '../../../assets/icons/chevron-down.svg?react';
import styles from './TaskList.module.css';

type TaskListProps = {
  title: string;
  tasks: Task[];
};

const TaskList = ({ title, tasks }: TaskListProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <section className={styles.taskListSection}>
      <div className={styles.accordionHeader} onClick={handleToggle}>
        <h2>
          {title} (<span className={styles.itemLength}>{tasks.length}</span>)
        </h2>
        <span className={`${styles.chevron} ${isOpen ? styles.isOpen : ''}`}>
          <ChevronDown />
        </span>
      </div>

      <div
        className={`${styles.taskListWrapper} ${isOpen ? styles.isOpen : ''}`}
      >
        {tasks.length > 0 ? (
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p>No tasks in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskList;
