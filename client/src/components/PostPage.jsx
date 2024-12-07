// src/components/PostPage.jsx
import React, { useState } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import './PostPage.css'; // Ensure CSS is imported

const PostPage = ({ view, lostPosts, foundPosts, userPosts, handleNewPost, handleFlag, setUserPosts, setAllPosts }) => {
    const [searchQuery, setSearchQuery] = useState(''); // State for storing search query
    const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts

    // Determine the posts to display based on the view
    let postsToShow = [];

    if (view === 'lost') {
        postsToShow = lostPosts;
    } else if (view === 'found') {
        postsToShow = foundPosts;
    } else if (view === 'yourPosts') {
        postsToShow = userPosts;
    }

    // Filter posts by item name when the search query changes
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter posts based on item name (case insensitive)
        const filtered = postsToShow.filter((post) =>
            post.itemName.toLowerCase().includes(query) ||
            post.itemDescription.toLowerCase().includes(query) ||
            post.itemLocation.toLowerCase().includes(query)
        );
        setFilteredPosts(filtered);
    };

    // Display the filtered posts if there is a search query, otherwise show all posts
    const displayPosts = searchQuery ? filteredPosts : postsToShow;

    return (
        <div className="post-page">
            {/* Search Input Field */}
            {(view !== 'createLostPost' && view !== 'createFoundPost') && (
                <input
                    type="text"
                    placeholder="Search posts by item name, description, location..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            )}

            {/* Show Post Form if creating a new post */}
            
            {view === 'createLostPost' && <PostForm postType="lost" handleSubmit={handleNewPost} setUserPosts={setUserPosts} />}
            {view === 'createFoundPost' && <PostForm postType="found" handleSubmit={handleNewPost} setUserPosts={setUserPosts} />}

            {/* Show Post List */}
            {(view !== 'createLostPost' && view !== 'createFoundPost') && (
                <PostList posts={displayPosts} handleFlag={handleFlag} setAllPosts={setAllPosts} />
            )}
        </div>
    );
};

export default PostPage;
