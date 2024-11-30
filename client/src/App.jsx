import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Hotbar from './components/Hotbar';
import HomePage from './components/HomePage'; // Import the HomePage component
import PostPage from './components/PostPage';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state
    const [view, setView] = useState('home'); // Default view is the home page
    const [allPosts, setAllPosts] = useState([]); // Initial all posts
    const [lostPosts, setLostPosts] = useState([]); // Initial lost posts
    const [foundPosts, setFoundPosts] = useState([]); // Initial found posts
    const [userPosts, setUserPosts] = useState([]); // User-created posts


    const fetchAllPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/GatorFound/items/all', {
                method: 'GET', // Explicitly specifying the method
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${sessionStorage.getItem('token')}`,
                }
            });
            const data = await response.json();
            if (!response.ok) alert(data.message);
            else setAllPosts(data.data);  // Store fetched items, or set empty array on error
        } catch (error) {
            console.error('Error fetching items:', error);
            setAllPosts([]); // Fallback to empty array on error
        }
    };

    // Fetch posts from backend when logged in
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

    useEffect(() => {
        if (isLoggedIn) {
            fetchAllPosts();
            fetchPosts(); // Fetch posts when logged in
        }
    }, [isLoggedIn]);  // Dependency: re-fetch when `isLoggedIn` changes


    // Filter lost and found posts whenever userPosts change
    useEffect(() => {
        if (allPosts) {
            setLostPosts(allPosts.filter(post => post.postType === 'lost'));
            setFoundPosts(allPosts.filter(post => post.postType === 'found'));
        }
    }, [allPosts]); // Dependency: re-filter when `userPosts` changes

    // Handle creating a new post
    const handleNewPost = async (newPost) => {
        setUserPosts((prevUserPosts) => {
            const updatedPosts = prevUserPosts ? [...prevUserPosts, newPost] : [newPost];
            // setLostPosts(updatedPosts.filter(post => post.postType === 'lost'));
            // setFoundPosts(updatedPosts.filter(post => post.postType === 'found'));
            return updatedPosts;
        });
        setAllPosts((prevAllPosts) => {
            const updatedPosts = prevAllPosts ? [...prevAllPosts, newPost] : [newPost];
            setLostPosts(updatedPosts.filter(post => post.postType === 'lost'));
            setFoundPosts(updatedPosts.filter(post => post.postType === 'found'));
            return updatedPosts;
        });
        await fetchPosts();
        await fetchAllPosts();
    };

    useEffect(() => {
        const storedLoginState = sessionStorage.getItem('isLoggedIn');
        if (storedLoginState === 'true') {
            setIsLoggedIn(true);
        }
    }, []);
    
    useEffect(() => {
        sessionStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    }, [isLoggedIn]);
    

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
