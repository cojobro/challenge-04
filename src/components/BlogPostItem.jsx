// src/components/BlogPostItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css'; // Import CSS Module

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Adjust for potential timezone offset if the input is just YYYY-MM-DD
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

  return adjustedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const BlogPostItem = ({ id, title, summary, date, url }) => {
  const formattedDate = formatDate(date);

  return (
    <div className={styles.blogPostItem}>

      <Link to={url} className={styles.titleLink}>
        <h2 className={styles.title}>{title}</h2>
      </Link>

      <p className={styles.summary}>{summary}</p>

      <p className={styles.date}>Published on {formattedDate}</p>
      
    </div>
  );
};

export default BlogPostItem;