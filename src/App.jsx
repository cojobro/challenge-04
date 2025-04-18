// src/App.jsx
import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm';
import { samplePosts } from './mockData';
import './App.css';

const PostDetailPlaceholder = (posts) => {
  const postId = window.location.pathname.split('/').pop();
  const post = posts.posts[postId - 1];
  return (
    <BlogPostDetail
      title={post.title}
      content={post.content}
      author={post.author}
      date={post.date}
    />
  );
};

const PostFormPlaceholder = ({posts, onSubmit}) => {
  const { state } = useLocation();
  const pageID = state?.pageID;              // undefined if you came from “New Post”
  const post   = pageID
    ? posts[pageID - 1]
    : null;

  console.log('editing post #', pageID);

  return (
    <BlogPostForm
      post={post} posts={posts} onSubmit={onSubmit}
    />
  );
};

const updatePosts = (newPost, allPosts) => {
  //check if post was in the list and then update the list
  let found = false;
  for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].id == newPost.id) {
          allPosts[i] = newPost;
          found = true;
      }
  }
  if (!found) {
    newPost.id = allPosts.length + 1;
    newPost.url = `/posts/${newPost.id}`;
    allPosts.push(newPost);
  }
  return allPosts;
}

// We need our hooks to live _inside_ the Router context,
// so we wrap the inner UI in its own component.
function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [posts, setPosts] = useState([...samplePosts]);

  // determines label based on the current path
  const inPost = location.pathname.includes('/posts/');
  const isEditing = location.pathname.includes('/postform');
  // extract the numeric ID if so
  const postId = inPost
    ? Number(location.pathname.split('/').pop())
    : null;

  const buttonLabel = inPost ? 'Edit Post' : 'New Post';

  const handleClick = () => {
    if (inPost) {
      // navigate and stash the postId in location.state
      navigate('/postform', { state: { pageID: postId } });
    } else {
      navigate('/postform');
    }
  };

  const handleUpdate = (post, posts) => {
    console.log(posts);
    setPosts(updatePosts(post, posts));
    console.log(posts);
    navigate('/');
  };


  return (
    <div className="App">
      <h1 className="title">Conor&apos;s Epic Blog</h1>
      <div>
        {isEditing ?
        (<div></div>):
        (<button className="editButton" onClick={handleClick}>
          {buttonLabel}
        </button>)}
      </div>

      <Routes>
        <Route path="/" element={<BlogPostList posts={posts} />} />
        <Route path="/posts/:postId" element={<PostDetailPlaceholder posts={posts}/>} />
        <Route path="/postform" element={<PostFormPlaceholder posts={posts} onSubmit={handleUpdate}/>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}
