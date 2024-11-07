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

    const [activePage, setActivePage] = useState('home');

    const handleButtonClick = (page) => {
        setActivePage(page);
        setView(page);
    }

    return (
        <div className="hotbar">
            <button 
                onClick={() => handleButtonClick('home')}
                className={activePage === 'home' ? 'active' : ''}
            >
                Home
            </button>
            <button 
                onClick={() => handleButtonClick('lost')}
                className={activePage === 'lost' ? 'active' : ''}
            >
                Lost Posts
            </button>
            <button 
                onClick={() => handleButtonClick('found')}
                className={activePage === 'found' ? 'active' : ''}
            >
                Found Posts
            </button>
            <button 
                onClick={() => handleButtonClick('yourPosts')}
                className={activePage === 'yourPosts' ? 'active' : ''}
            >
                Your Posts
            </button>


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
