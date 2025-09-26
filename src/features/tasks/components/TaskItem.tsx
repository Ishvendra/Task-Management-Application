import { useState, useContext, useRef } from 'react';
import { truncateText } from '../../../utils/textUtils';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { TasksContext } from '../state/tasks.context';
import EditIcon from '../../../assets/icons/pencil.svg?react';
import DeleteIcon from '../../../assets/icons/trash-can.svg?react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import type { Task, TaskStatus } from '../types';
import styles from './TaskItem.module.css';

const statusClasses: Record<TaskStatus, string> = {
  Pending: styles.statusPending,
  'In Progress': styles.statusInProgress,
  Completed: styles.statusCompleted,
};

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const initial = task.title ? task.title[0].toUpperCase() : 'T';
  const isTitleTruncated = task.title.length > 50;
  const isDescriptionTruncated = task.description.length > 150;

  const { dispatch } = useContext(TasksContext);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(deleteButtonRef, () => {
    if (isConfirmingDelete) {
      setIsConfirmingDelete(false);
    }
  });

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isConfirmingDelete) {
      dispatch({ type: 'DELETE_TASK', payload: { id: task.id } });
      toast.success('Task deleted successfully!');
    } else {
      setIsConfirmingDelete(true);
    }
  };

  return (
    <li className={styles.taskItemWrapper}>
      <div className={styles.taskItem}>
        <div className={styles.header}>
          <div className={styles.avatar}>{initial}</div>
          <h3
            className={styles.title}
            title={isTitleTruncated ? task.title : undefined}
          >
            {truncateText(task.title, 50)}
          </h3>
          <span className={styles.statusWrapper}>
            <span
              className={`${styles.status} ${statusClasses[task.status]}`}
            />
            {task.status}
          </span>
        </div>
        <div className={styles.descriptionWrapper}>
          <p
            className={styles.description}
            title={isDescriptionTruncated ? task.description : undefined}
          >
            {truncateText(task.description, 150)}
          </p>
          <div className={styles.footer}>
            <span className={styles.dueDate}>{task.dueDate}</span>
            <div
              className={`${styles.iconWrapper} ${
                isConfirmingDelete ? styles.iconsVisible : ''
              }`}
            >
              <Link to={`/edit/${task.id}`} className={styles.iconButton}>
                <EditIcon />
              </Link>
              <button
                ref={deleteButtonRef}
                onClick={handleDeleteClick}
                className={`${styles.iconButton} ${
                  isConfirmingDelete
                    ? styles.deleteConfirm
                    : styles.deleteButton
                }`}
                title={
                  isConfirmingDelete ? 'Click again to confirm' : 'Delete task'
                }
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
