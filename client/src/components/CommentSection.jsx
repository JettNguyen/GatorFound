// src/components/CommentSection.jsx
import React, { useState } from 'react';

const CommentSection = ({ comments, handleCommentSubmit }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment) {
            handleCommentSubmit(newComment);
            setNewComment('');  // Clear the input
        }
    };

    return (
        <div className="comment-section">
            <h5>Comments</h5>
            {comments.map((comment, index) => (
                <p key={index}>{comment}</p>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Comment</button>
            </form>
        </div>
    );
};

export default CommentSection;
