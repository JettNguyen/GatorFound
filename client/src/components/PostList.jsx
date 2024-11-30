// src/components/PostList.jsx
import React, { useState } from 'react';  // Add the missing imports
import './PostList.css';
import PostItem from './PostItem'; // Import PostItem

const PostList = ({posts}) => {
    // const [posts, setPosts] = useState([]);  // Define the state for storing items

    // //Fetch all items from the backend
    // const fetchItems = async () => { 
    //     try {
    //         const response = await fetch('http://localhost:5000/GatorFound/items', {
    //         method: 'GET', // Explicitly specifying the method
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': `${sessionStorage.getItem('token')}`,
    //         },
    //     });
    //        if  (!response.ok) {
    //         throw new Error("Failed to fetch items");
    //        }

    //        const data = await response.json();

    //        setItems(data.length? data.data : []);
    //     } catch (error){
    //         console.error("Error fetching items: ", error);
    //         setItems([]);
    //     }
    // }
    // useEffect(() => {
       
    //     fetchItems();
        
    // }, [posts]);

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
