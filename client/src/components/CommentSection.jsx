// src/components/CommentSection.jsx
import React, { useState } from 'react';
import Comment from './Comment';
import './CommentSection.css'; // Ensure CSS is imported

const CommentSection = ({ comments = [], handleCommentSubmit }) => { // Default to empty array
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            const commentData = { id: Date.now(), text: newComment, replies: [] };
            handleCommentSubmit(commentData); // Pass new comment back to PostItem
            setNewComment(''); // Clear input
        }
    };

    return (
        <div className="comment-section">
            <div className="comment-form">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Post</button>
            </div>

            <div className="comments-list">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
