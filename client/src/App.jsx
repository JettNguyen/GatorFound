// src/App.jsx
import React, { useState } from 'react';
import Login from './components/Login';
import Hotbar from './components/Hotbar';
import HomePage from './components/HomePage'; // Import the HomePage component
import PostPage from './components/PostPage';
import fillerPosts from './fillerPosts.json'; // Import filler posts for testing
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
    const [view, setView] = useState('home'); // Default view is the home page
    const [lostPosts, setLostPosts] = useState(fillerPosts.filter(post => post.postType === 'lost')); // Initial lost posts
    const [foundPosts, setFoundPosts] = useState(fillerPosts.filter(post => post.postType === 'found')); // Initial found posts
    const [userPosts, setUserPosts] = useState([]); // User-created posts

    // Handle creating a new post
    const handleNewPost = (newPost) => {
        setUserPosts([...userPosts, newPost]);

        if (newPost.postType === 'lost') {
            setLostPosts([...lostPosts, newPost]);
        } else if (newPost.postType === 'found') {
            setFoundPosts([...foundPosts, newPost]);
        }
    };

    // If not logged in, show the login page
    if (!isLoggedIn) {
        return <Login setIsLoggedIn={setIsLoggedIn} />;
    }

    return (
        <div className="App">
            <Hotbar setView={setView} />
            {view === 'home' && <HomePage />} {/* Render HomePage when view is home */}
            {(view === 'lost' || view === 'found' || view === 'yourPosts' || view === 'createLostPost' || view === 'createFoundPost') && (
                <PostPage
                    view={view}
                    lostPosts={lostPosts}
                    foundPosts={foundPosts}
                    userPosts={userPosts}
                    handleNewPost={handleNewPost}
                />
            )}
        </div>
    );
};

export default App;
