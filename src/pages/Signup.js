// src/pages/Signup.js
import React, { useState } from 'react';
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
            navigate('/'); // Redirect to login
        } catch (error) {
            console.error('Signup failed:', error.response.data);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="new-username">Username:</label>
                    <input type="text" id="new-username" name="new-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="new-email">Email:</label>
                    <input type="email" id="new-email" name="new-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="new-password">Password:</label>
                    <input type="password" id="new-password" name="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/">Login</Link></p> 
            </form>
        </div>
    );
}

export default Signup;
