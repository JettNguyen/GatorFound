import React, { useState, useEffect } from 'react';
import CommentSection from './CommentSection';
import './PostItem.css'; // Ensure CSS is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import {jwtDecode} from 'jwt-decode';

const PostItem = ({ post, handleFlag, setAllPosts }) => {
    const token = sessionStorage.getItem('token');
    const decodedToken = token? jwtDecode(token): null;
    const userID = decodedToken ? decodedToken.id : null;
    const { itemName, itemDescription, itemLocation, postType, itemPhoto, _id: itemID, userID: postId } = post;
    const [comments, setComments] = useState([]); // Comments array
    const [showCommentSection, setShowCommentSection] = useState(false); // Toggle comments visibility
    const [isFlagged, setIsFlagged] = useState(post.isFlagged); // Manage flagging
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

    useEffect(()=>{
        fetchComments(itemID);
        
    }, [itemID]);

    const handleNewComment = (comment) => {
        setComments((prevComments) => [...prevComments, comment]);
    };

    const toggleFlag = async() => {
        setIsFlagged(!isFlagged);
        // Call backend API to flag/unflag the post
        try {
            const response = await fetch(`http://localhost:5000/GatorFound/items/${itemID}/flag`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify({ isFlagged: isFlagged }), // Sending flag status
            });
            if (!response.ok) {
                throw new Error('Failed to flag/unflag the post');
            }
            handleFlag();
        } catch (error) {
            console.error('Error flagging post:', error);
            // Handle error, maybe reset the flag state if the backend fails
        }
        
    };
    const deletePost = async (postId) => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (!confirmed) return; // Abort if user cancels

    try {
        const response = await fetch(`http://localhost:5000/GatorFound/items/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${sessionStorage.getItem('token')}`,
            },
        });
        console.log("Deleted item ID is: ", itemID);
        const data = await response.json();

        if (response.ok) {
            alert('Post deleted successfully');
            // Remove the post from the UI
            setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } else {
            alert(`Failed to delete post: ${data.message}`);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post');
    }
    };
    // console.log("USER ID IS: ",sessionStorage.getItem('token').user.id  )

    return (
        <div className="post-item">
            {/* Flag Icon */}
            <div className="flag-icon" onClick={toggleFlag}>
                <FontAwesomeIcon
                    icon={faFlag}
                    className={isFlagged ? 'flagged' : 'unflagged'}
                />

            </div>
            {userID === postId && (
                <button
                    className="delete-button"
                    onClick={() => deletePost(itemID)}
                >
                    Delete
                </button>
            )}

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
