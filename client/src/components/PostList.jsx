// src/components/PostList.jsx
import React from 'react';  // Add the missing imports
import './PostList.css';
import PostItem from './PostItem'; // Import PostItem

const PostList = ({posts, handleFlag, setAllPosts}) => {
    
    return (
        <div className="post-list">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostItem key={post._id} post={post} handleFlag={handleFlag} setAllPosts = {setAllPosts} /> // Use a unique key, preferably post.id
                ))
            ) : (
                <p className="no-posts">No posts to show!</p>  // Message if there are no posts
            )}
        </div>
    );
};

export default PostList;
