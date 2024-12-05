import React, { useState } from 'react';
import Comment from './Comment';
import './CommentSection.css';

const CommentSection = ({ itemID, comments, handleCommentSubmit }) => {
    const [newComment, setNewComment] = useState('');
    // Handle new comment connection
    const handleNewComment = async () => {
        
        if (newComment.trim()) {
            try {
                const response = await fetch(`http://localhost:5000/GatorFound/comments/${itemID}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${sessionStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ comment: newComment }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add comment');
                }

                const updatedComments = await response.json();
                const comment = updatedComments.data;
                handleCommentSubmit(comment);  // Send updated comments back to the parent
                setNewComment('');  // Clear the input field
            } catch (error) {
                console.error('Error adding comment:', error);
            }
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
                <button onClick={handleNewComment}>Post</button>
            </div>

            <div className="comments-list">
                {comments.map((com) => {

                return(
                    // Get list of comments
                    <Comment key={com.id} comment={com} />
                );
            })}
            </div>
        </div>
    );
};

export default CommentSection;
