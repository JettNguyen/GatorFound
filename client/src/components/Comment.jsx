// src/components/Comment.jsx
import React, { useState } from 'react';
import './Comment.css'; // Ensure CSS is imported

const Comment = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [newReply, setNewReply] = useState('');
    const [replies, setReplies] = useState(comment.replies || []);

    const handleReply = () => {
        if (newReply.trim()) {
            const replyData = { id: Date.now(), text: newReply };
            setReplies([...replies, replyData]);
            setNewReply('');
        }
    };

    return (
        <div className="comment">
            <p>{comment.text}</p>
            <button className="toggle-replies" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? '▼ Hide Replies' : '▶ Reply'}
            </button>

            {showReplies && (
                <div className="replies">
                    {replies.map(reply => (
                        <div key={reply.id} className="reply">
                            <p>{reply.text}</p>
                        </div>
                    ))}
                    <div className="reply-form">
                        <input
                            type="text"
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            placeholder="Add a reply..."
                        />
                        <button onClick={handleReply}>Reply</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;
