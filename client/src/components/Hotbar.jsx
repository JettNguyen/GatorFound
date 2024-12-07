// src/components/Hotbar.jsx
import React, { useState } from 'react';
import './Hotbar.css';

const Hotbar = ({ setView, toggleTheme, theme }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div
        className="hotbar"
        style={{
            backgroundColor: theme === 'light' ? '#FAFAFA' : '#0021A5', // Light or dark background
            color: theme === 'light' ? '#000' : '#FFF', // Adjust text color
        }}
    >
            <div className="nav-buttons">
                <button onClick={toggleTheme} className="theme-toggle">
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
                <button onClick={() => setView('home')}>Home</button> {/* Home button */}
                <button onClick={() => setView('lost')}>Lost Posts</button>
                <button onClick={() => setView('found')}>Found Posts</button>
                <button onClick={() => setView('yourPosts')}>View Your Posts</button>
            </div>
            

            <div 
                className="plus-button-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button className="plus-button">
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