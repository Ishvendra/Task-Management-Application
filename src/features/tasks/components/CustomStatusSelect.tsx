import { useState, useRef } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import type { TaskStatus } from '../types';
import ChevronDown from '../../../assets/icons/chevron-down.svg?react';
import ChevronUp from '../../../assets/icons/chevron-up.svg?react';
import styles from './CustomStatusSelect.module.css';

const statusClasses: Record<TaskStatus, string> = {
  Pending: styles.statusPending,
  'In Progress': styles.statusInProgress,
  Completed: styles.statusCompleted,
};

type CustomSelectProps = {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
};

const CustomStatusSelect = ({ value, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useOnClickOutside(selectRef, () => setIsOpen(false));

  const handleSelect = (status: TaskStatus) => {
    onChange(status);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectWrapper} ref={selectRef}>
      <div className={styles.selectDisplay} onClick={() => setIsOpen(!isOpen)}>
        <span className={`${styles.statusIndicator} ${statusClasses[value]}`} />
        {value}
        <span className={styles.chevron}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {isOpen && (
        <ul className={styles.optionsList}>
          {(Object.keys(statusClasses) as TaskStatus[]).map((status) => (
            <li
              key={status}
              className={styles.option}
              onClick={() => handleSelect(status)}
            >
              <span
                className={`${styles.statusIndicator} ${statusClasses[status]}`}
              />
              {status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomStatusSelect;
