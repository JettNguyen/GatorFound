// src/components/Hotbar.jsx
import React, { useState } from 'react';
import './Hotbar.css';

const Hotbar = ({ setView, toggleTheme, theme }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="hotbar">
            <div className="nav-buttons">
                <button onClick={toggleTheme} className="theme-toggle">
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
                <button onClick={() => setView('home')}>Home</button> {/* Home button */}
                <button onClick={() => setView('lost')}>Lost Posts</button>
                <button onClick={() => setView('found')}>Found Posts</button>
                <button onClick={() => setView('yourPosts')}>View Your Posts</button>
            </div>
            

            <div className="plus-button-container">
                <button className="plus-button" onClick={toggleDropdown}>
                    &#43;
                </button>
                {showDropdown && (
                    <div className="dropdown">
                        <button onClick={() => setView('createLostPost')}>Create Lost Post</button>
                        <button onClick={() => setView('createFoundPost')}>Create Found Post</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hotbar;