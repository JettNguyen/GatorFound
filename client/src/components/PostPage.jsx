// src/components/PostPage.jsx
import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';

const PostPage = ({ view, lostPosts, foundPosts, userPosts, handleNewPost }) => {
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
            {view === 'createLostPost' && <PostForm postType="lost" handleSubmit={handleNewPost} />}
            {view === 'createFoundPost' && <PostForm postType="found" handleSubmit={handleNewPost} />}
            {(view !== 'createLostPost' && view !== 'createFoundPost') && (
                <PostList posts={postsToShow} />
            )}
        </div>
    );
};

export default PostPage;
