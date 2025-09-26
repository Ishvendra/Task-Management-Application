import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './AddTask.module.css';
import { TasksContext } from '../../features/tasks/state/tasks.context';
import Header from '../../components/header/Header';
import { formatDate } from '../../utils/dateUtils';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { dispatch } = useContext(TasksContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return toast.error('Please enter a title.');

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'Pending' as const,
      dueDate: formatDate(new Date()),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    toast.success('Task added successfully!');
    navigate('/');
  };

  return (
    <div className={styles.addTaskContainer}>
      <Header title='Add Task' showBackLink={true} />
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type='text'
            placeholder='Enter the title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            maxLength={80}
          />
          <textarea
            ref={textareaRef}
            onInput={handleTextareaInput}
            placeholder='Enter the description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            maxLength={500}
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
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddTask;
