import React, { useState, useEffect, useRef } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DOMPurify from 'dompurify';
import styles from './BlogPostForm.module.css';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';

const BlogPostForm = ({ post, posts, onSubmit, onDelete }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [summary, setSummary] = useState(post?.summary || '');
  // store content as HTML string
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  // initialize date state as Date or null
  const [date, setDate] = useState(post?.date ? new Date(post.date) : null);
  const [editing] = useState(!!(post?.title || post?.content || post?.author || post?.date));
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Required';
    if (!summary) newErrors.summary = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // sanitize HTML content
      const sanitizedContent = DOMPurify.sanitize(content);
      // format date as YYYY-MM-DD
      const dateString = date.toISOString().split('T')[0];
      // copy post to a new object and modify it
      const newPost = {...post};
      newPost.title = title;
      newPost.summary = summary;
      newPost.content = sanitizedContent;
      newPost.author = author;
      newPost.date = dateString;

      onSubmit(newPost, posts);
    }
  };

  const handleConfirm = async () => {
    setDeleting(true);
    await onDelete(post.id, posts);
    setDeleting(false);
    setDialogOpen(false);
  };

  return (
    <div>
      <form className={styles.blogPostForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="summary">Summary</label>
          <textarea
              className={styles.summaryInput}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              rows={3}
          />
          {errors.summary && <p className={styles.error}>{errors.summary}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Content</label>
          <SunEditor
            setContents={content}
            onChange={setContent}
            height="300px"
            setOptions={{
              // define the exact toolbar rows and buttons you want:
              buttonList: [
                // first row
                ['formatBlock', 'fontSize', 'fontColor', 'hiliteColor'],
                // second row
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                // third row
                ['align', 'list', 'lineHeight'],
                // fourth row
                ['link', 'image', 'video', 'table'],
                // fifth row
                ['undo', 'redo'],
                // sixth row
                ['fullScreen', 'codeView']
              ],
              // you can also tweak other options here:
              defaultStyle: 'font-family:Arial; font-size:16px;',
              formats: ['p', 'h1', 'h2', 'h3', 'blockquote']
            }}
          />
          {errors.content && <p className={styles.error}>{errors.content}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && <p className={styles.error}>{errors.author}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <ReactDatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
          {errors.date && <p className={styles.error}>{errors.date}</p>}
        </div>   
        <button className={styles.submitButton} type="submit">{editing ? 'Update Post' : 'Create Post'}</button>
      </form>
      <DeleteButton
        onClick={() => setDialogOpen(true)}
        disabled={isDeleting}
        isLoading={isDeleting}
      />
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default BlogPostForm;
