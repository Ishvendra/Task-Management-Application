import React, { useContext } from 'react';
import SearchIcon from '../../assets/icons/search.svg?react';
import styles from './SearchBar.module.css';
import { TasksContext } from '../../features/tasks/state/tasks.context';

const SearchBar = () => {
  const { state, dispatch } = useContext(TasksContext);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
  };
  return (
    <div className={styles.searchContainer}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type='text'
        placeholder='Search To-Do'
        value={state.searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
