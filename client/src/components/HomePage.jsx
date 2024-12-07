// src/components/HomePage.jsx
import React from 'react';
import './HomePage.css';
import GatorFoundLogo from './GatorFoundLogo.png'; // Import the logo

const HomePage = () => {
    return (
        <div className="home-container">
            <img src={GatorFoundLogo} alt="GatorFound Logo" className="logo" /> {/* Logo */}
            <h1 className="home-title">Welcome to GatorFound</h1> {/* Centered text */}
            <p className="home-description">
                GatorFound is the University of Florida's dedicated lost and found platform.
                It allows UF students to easily report lost or found items around campus, 
                helping reconnect owners with their belongings.
            </p>
            {/* Add Slogan */}
            <p className="home-slogan">
                <em>"Where Gators Help Gators Find What's Lost."</em>
            </p>
        </div>
    );
};

export default HomePage;
