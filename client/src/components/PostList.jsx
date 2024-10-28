// src/components/PostList.jsx
import React from 'react';
import './PostList.css';
import PostItem from './PostItem'; // Import PostItem

const PostList = ({ posts }) => {
    return (
        <div className="post-list">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostItem key={post.id} post={post} /> // Use a unique key, preferably post.id
                ))
            ) : (
                <p>No posts to show.</p>
            )}
        </div>
    );
};

export default PostList;
