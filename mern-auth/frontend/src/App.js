import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import myPicture from './assets/GatorFoundLogo.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="homepage">
                <header className="App-header">
                  <img src={myPicture} className="App-logo" alt="Gator Found Logo" />
                  <h1>Welcome to Gator Found</h1>
                  <nav>
                    <Link to="/login">
                      <button>Login</button>
                    </Link>
                    <Link to="/signup">
                      <button>Sign Up</button>
                    </Link>
                  </nav>
                </header>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
