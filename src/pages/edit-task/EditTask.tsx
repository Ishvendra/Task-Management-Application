import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TasksContext } from '../../features/tasks/state/tasks.context';
import { type Task, type TaskStatus } from '../../features/tasks/types';
import Header from '../../components/header/Header';
import toast from 'react-hot-toast';
import CustomStatusSelect from '../../features/tasks/components/CustomStatusSelect';
import styles from '../add-task/AddTask.module.css';
import { DESC_MAX_LENGTH, TITLE_MAX_LENGTH } from '../add-task/AddTask';

const EditTask = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(TasksContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    const taskToEdit = state.tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
    } else {
      navigate('/');
    }
  }, [taskId, state, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (currentTask) {
      setCurrentTask({
        ...currentTask,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTask?.title.trim()) return toast.error('Please enter a title.');

    if (currentTask) {
      dispatch({ type: 'UPDATE_TASK', payload: currentTask });
      toast.success('Task updated successfully!');

      navigate('/');
    }
  };

  const handleStatusChange = (status: TaskStatus) => {
    if (currentTask) {
      setCurrentTask({
        ...currentTask,
        status: status,
      });
    }
  };

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className={styles.addTaskContainer}>
      <Header title='Edit Task' showBackLink={true} />
      <div className={styles.formContainer}>
        {!currentTask ? (
          <div>Loading Task...</div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <input
                name='title'
                type='text'
                value={currentTask.title}
                placeholder='Enter the title'
                onChange={handleInputChange}
                className={styles.input}
                maxLength={80}
              />
              <p className={styles.charCounter}>
                {currentTask.title.length} / {TITLE_MAX_LENGTH}
              </p>
            </div>
            <div>
              <textarea
                ref={textareaRef}
                name='description'
                value={currentTask.description}
                placeholder='Enter the description'
                onInput={handleTextareaInput}
                onChange={handleInputChange}
                className={styles.textarea}
                maxLength={500}
              />
              <p className={styles.charCounter}>
                {currentTask.description.length} / {DESC_MAX_LENGTH}
              </p>
            </div>
            <CustomStatusSelect
              value={currentTask.status}
              onChange={handleStatusChange}
            />
            <div className={styles.actions}>
              <button
                type='button'
                onClick={() => navigate('/')}
                className={`${styles.cancelButton} ${styles.buttons}`}
              >
                Cancel
              </button>
              <button
                type='submit'
                className={`${styles.addButton} ${styles.buttons}`}
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTask;
