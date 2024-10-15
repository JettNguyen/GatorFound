// src/components/PostItem.jsx
import React, { useState } from 'react';
import CommentSection from './CommentSection';

const PostItem = ({ post, handleCommentSubmit }) => {
    const { itemName, itemDescription, itemLocation, postType } = post;
    const [comments, setComments] = useState([]);

    const handleNewComment = (comment) => {
        setComments([...comments, comment]);
    };

    return (
        <div className="post-item">
            <h4>{postType === 'lost' ? 'Lost Item' : 'Found Item'}: {itemName}</h4>
            {itemDescription && <p>Description: {itemDescription}</p>}
            {itemLocation && <p>Location: {itemLocation}</p>}
            <CommentSection comments={comments} handleCommentSubmit={handleNewComment} />
        </div>
    );
};

export default PostItem;
