// src/components/PostList.jsx
import React from 'react';
import './PostList.css';

const PostList = ({ posts }) => {
    return (
        <div className="post-list">
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index} className="post-item">
                        <h4>{post.itemName}</h4>
                        <p><strong>Description:</strong> {post.itemDescription || 'Not Provided'}</p>
                        <p><strong>Location:</strong> {post.itemLocation || 'Not Provided'}</p>
                        
                        {/* Display the uploaded image if available */}
                        {post.itemPhoto && (
                            <div className="post-photo">
                                <p><strong>Photo:</strong></p>
                                <img src={post.itemPhoto} alt={post.itemName} />
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No posts to show.</p>
            )}
        </div>
    );
};

export default PostList;
