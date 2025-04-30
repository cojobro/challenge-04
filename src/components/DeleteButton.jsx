import React from 'react';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ onClick, disabled, isLoading }) => {
  return (
    <div className={styles.deleteButtonContainer}>
        <button
        className={styles.deleteButton}
        onClick={onClick}
        disabled={disabled}
        >
        {isLoading ? 'Deleting...' : 'Delete'}
        </button>
    </div>
  );
};

export default DeleteButton;