import React, { useState } from 'react';
import './Hotbar.css';

const Hotbar = ({ setView }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div className="hotbar">
            <button onClick={() => setView('home')}>Home</button>
            <button onClick={() => setView('lost')}>Lost Posts</button>
            <button onClick={() => setView('found')}>Found Posts</button>
            <button onClick={() => setView('yourPosts')}>View Your Posts</button>

            {/* Container for the button and dropdown with hover events */}
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
