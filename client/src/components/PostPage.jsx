// src/components/PostPage.jsx
import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import './PostPage.css'; // Ensure CSS is imported

const PostPage = ({ view, lostPosts, foundPosts, userPosts, handleNewPost, handleFlag, setUserPosts, setAllPosts }) => {
    let postsToShow = [];

    // Determine what posts to display based on the view
    if (view === 'lost') {
        postsToShow = lostPosts;
    } else if (view === 'found') {
        postsToShow = foundPosts;
    } else if (view === 'yourPosts') {
        postsToShow = userPosts;
    }

    return (
        <div className="post-page">
            {view === 'createLostPost' && <PostForm postType="lost" handleSubmit={handleNewPost} setUserPosts={setUserPosts}/>}
            {view === 'createFoundPost' && <PostForm postType="found" handleSubmit={handleNewPost} setUserPosts={setUserPosts}/>}
            {(view !== 'createLostPost' && view !== 'createFoundPost') && (
                <PostList posts={postsToShow} handleFlag={handleFlag} setAllPosts = {setAllPosts}/>
            )}
        </div>
    );
};

export default PostPage;
