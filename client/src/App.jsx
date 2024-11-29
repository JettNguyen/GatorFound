import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Hotbar from './components/Hotbar';
import HomePage from './components/HomePage'; // Import the HomePage component
import PostPage from './components/PostPage';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
    const [view, setView] = useState('home'); // Default view is the home page
    const [lostPosts, setLostPosts] = useState([]); // Initial lost posts
    const [foundPosts, setFoundPosts] = useState([]); // Initial found posts
    const [userPosts, setUserPosts] = useState([]); // User-created posts

    // Fetch posts from backend when logged in
    useEffect(() => {
        if (isLoggedIn) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch('http://localhost:5000/GatorFound/items', {
                        method: 'GET', // Explicitly specifying the method
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': `${sessionStorage.getItem('token')}`,
                        }
                    });
                    const data = await response.json();
                    if (!response.ok) alert(data.message);
                    else setUserPosts(data.data);  // Store fetched items, or set empty array on error
                } catch (error) {
                    console.error('Error fetching items:', error);
                    setUserPosts([]); // Fallback to empty array on error
                }
            };

            fetchPosts(); // Fetch posts when logged in
        }
    }, [isLoggedIn]);  // Dependency: re-fetch when `isLoggedIn` changes

    // Filter lost and found posts whenever userPosts change
    useEffect(() => {
        if (userPosts) {
            setLostPosts(userPosts.filter(post => post.postType === 'lost'));
            setFoundPosts(userPosts.filter(post => post.postType === 'found'));
        }
    }, [userPosts]); // Dependency: re-filter when `userPosts` changes

    // Handle creating a new post
    const handleNewPost = (newPost) => {
        setUserPosts((prevUserPosts) => {
            const updatedPosts = prevUserPosts ? [...prevUserPosts, newPost] : [newPost];
            setLostPosts(updatedPosts.filter(post => post.postType === 'lost'));
            setFoundPosts(updatedPosts.filter(post => post.postType === 'found'));
            return updatedPosts;
        });
    };

    // useEffect(() => {
    //     const storedLoginState = localStorage.getItem('isLoggedIn'); // Using localStorage to persist login state
    //     if (storedLoginState === 'true') {
    //         setIsLoggedIn(true);  // Set login state from localStorage
    //     }
    // }, []); // Run only once when the component mounts

    // Store login state in localStorage when it changes
    // useEffect(() => {
    //     if (isLoggedIn) {
    //         sessionStorage.setItem('isLoggedIn', 'true');
    //     } else {
    //         sessionStorage.setItem('isLoggedIn', 'false');
    //     }
    // }, [isLoggedIn]);

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
                    setUserPosts={setUserPosts}
                />
            )}
        </div>
    );
};

export default App;
