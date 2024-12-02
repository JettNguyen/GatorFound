// src/components/Comment.jsx
import React, { useState, useEffect } from 'react';
import './Comment.css'; // Ensure CSS is imported

const Comment = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [newReply, setNewReply] = useState('');
    const [replies, setReplies] = useState([]);

    // Fetch replies
    // Fetch comments for the post
    const fetchReplies = async (id) => {
        try {
            console.log("ITEM ID IS:" , comment.id);
            const response = await fetch(`http://localhost:5000/GatorFound/comments/${id}/replies`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${sessionStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            const data = await response.json();

            // Handle case where no comments exist or malformed response
            setReplies(data.data.length? data.data: []);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setReplies([]); // On error, set to empty
        } 
    };

    // Load comments when the component mounts
    useEffect(() => {     
        fetchReplies(comment.id);  
    }, [comment.id]);
    
    // const handleReply = () => {S
    //     if (newReply.trim()) {
    //         const replyData = { id: Date.now(), text: newReply };
    //         setReplies([...replies, replyData]);
    //         setNewReply('');
    //     }
    // };
    const handleReply = async () => {
        if (newReply.trim()) {
            try {
                console.log("Reply is: ", newReply);
                // Send a POST request using fetch to add the reply to the backend
                const response = await fetch(`http://localhost:5000/GatorFound/comments/${comment.id}/replies`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${sessionStorage.getItem('token')}`,

                    },
                    body: JSON.stringify({ reply: newReply }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to add reply');
                }

                const updatedComment = await response.json();
                const reply = updatedComment.data;
                // Update local state with the new reply
                setReplies([...replies, reply]);
                setNewReply(''); // Clear the input field
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        }
    };

    return (
        <div className="comment">
            <p><strong>{comment.username}:</strong> {comment.comment}</p> {/* Display username and comment */}
            <button className="toggle-replies" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? '▼ Hide Replies' : '▶ Reply'}
            </button>

            {showReplies && (
                <div className="replies">
                    {replies.map(reply => (
                        <div key={reply.id} className="reply">
                            <p><strong>{reply.username}:</strong> {reply.reply}</p> {/* Display username with reply */}
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
