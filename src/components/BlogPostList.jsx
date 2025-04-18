import React from 'react';
import BlogPostItem from './BlogPostItem';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts }) => {
  // Conditional Rendering: Handle empty posts array
  if (!posts || posts.length === 0) {
    return <p className={styles.noPostsMessage}>No blog posts available.</p>;
  }

  return (
    <div className={styles.blogPostList}>
      {/* Map over posts array to render BlogPostItem for each */}
      {posts.map((post) => (
        <BlogPostItem
          // Use unique 'id' as the key prop for React's rendering optimization
          key={post.id}
          id={post.id}
          title={post.title}
          summary={post.summary}
          date={post.date}
          url={post.url}
        />
      ))}
    </div>
  );
};

export default BlogPostList;