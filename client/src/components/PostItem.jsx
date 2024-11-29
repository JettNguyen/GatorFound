import React, { useState, useEffect } from 'react';
import CommentSection from './CommentSection';
import './PostItem.css'; // Ensure CSS is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const PostItem = ({ post }) => {
    const { itemName, itemDescription, itemLocation, postType, itemPhoto, _id: itemID } = post;

    const [comments, setComments] = useState([]); // Comments array
    const [showCommentSection, setShowCommentSection] = useState(false); // Toggle comments visibility
    const [isFlagged, setIsFlagged] = useState(false); // Manage flagging
    const [isLoading, setIsLoading] = useState(false); // Loading state for comments

    // Fetch comments for the post
    const fetchComments = async (id) => {
        if (!id) return; // Guard against undefined itemID
        setIsLoading(true); // Show loader while fetching
        try {
            
            const response = await fetch(`http://localhost:5000/GatorFound/comments/${id}/comments`, {
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
            setComments(data.data.length? data.data: []);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]); // On error, set to empty
        } finally {
            setIsLoading(false); // Hide loader
        }
    };

    // Load comments when the component mounts
    useEffect(() => {
        fetchComments(itemID);
    }, [itemID]);

    // Handle toggling of comment section
    const toggleCommentSection = () => {
        setShowCommentSection((prevState) => {
            if (!prevState) {
                fetchComments(itemID); // Fetch comments only when opening the section
            }
            return !prevState;
        });
    };

    const handleNewComment = (comment) => {
        setComments((prevComments) => [...prevComments, comment]);
    };

    const toggleFlag = () => {
        setIsFlagged(!isFlagged);
        // Optional: Call backend API to flag/unflag the post
    };

    return (
        <div className="post-item">
            {/* Flag Icon */}
            <div className="flag-icon" onClick={toggleFlag}>
                <FontAwesomeIcon
                    icon={faFlag}
                    className={isFlagged ? 'flagged' : 'unflagged'}
                />
            </div>

            <h4>
                <strong>
                    <u>{postType === 'lost' ? 'Lost Item' : 'Found Item'}:</u>
                </strong>{' '}
                {itemName}
            </h4>
            <p>
                <strong>
                    <u>Description:</u>
                </strong>{' '}
                {itemDescription || 'Not Provided'}
            </p>
            <p>
                <strong>
                    <u>Location:</u>
                </strong>{' '}
                {itemLocation || 'Not Provided'}
            </p>

            {/* Display the uploaded image if available */}
            {itemPhoto && (
                <div className="post-photo">
                    <p>
                        <strong>
                            <u>Photo:</u>
                        </strong>
                    </p>
                    <img src={itemPhoto} alt={itemName} style={{ width: 'auto', height: 'auto' }} />
                </div>
            )}

            {/* Toggle Comment Section Button */}
            <button className="toggle-comments" onClick={toggleCommentSection}>
                {showCommentSection ? '▼ Hide Comments' : '▶ Comment'}
            </button>

            {/* Render Comment Section if toggled open */}
            {showCommentSection && (
                <div>
                    {isLoading ? (
                        <p>Loading comments...</p> // Show loading message
                    ) : (
                        <CommentSection
                            itemID={itemID}
                            comments={comments}
                            handleCommentSubmit={handleNewComment}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default PostItem;
