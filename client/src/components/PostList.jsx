// src/components/PostList.jsx
import React, { useState } from 'react';  // Add the missing imports
import './PostList.css';
import PostItem from './PostItem'; // Import PostItem

const PostList = ({posts}) => {
    // const [items, setItems] = useState(posts || []);  // Define the state for storing items
    // const [loading, setLoading] = useState(true);  // Define the loading state

    // useEffect(() => {
    //     // Fetch all items from the backend
    //     fetch('http://localhost:5000/GatorFound/items', {
    //         method: 'GET', // Explicitly specifying the method
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setItems(data.data);  // Store fetched items
                
    //             console.log(data);
    //             setLoading(false);  // Stop loading once data is fetched
    //             alert("Succesfsuuly");
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching items:', error);
    //             setLoading(false);  // Stop loading on error
    //         });
    // }, []);  // Empty dependency array means this effect runs once after the initial render

    // if (loading) {
    //     return <p>Loading items...</p>;  // Show loading message while data is being fetched
    // }
    return (
        <div className="post-list">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostItem key={post._id} post={post} /> // Use a unique key, preferably post.id
                ))
            ) : (
                <p className="no-posts">No posts to show!</p>  // Message if there are no posts
            )}
        </div>
    );
};

export default PostList;
