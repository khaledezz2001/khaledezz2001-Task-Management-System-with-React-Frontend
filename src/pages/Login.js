// src/pages/Login.js
import React, { useState } from 'react'; 
import '../styles/Login.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState(''); // Change to email
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (email && password) {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                localStorage.setItem('token', response.data.token); // Store token
                navigate('/tasks'); 
            } catch (error) {
                console.error('Login failed:', error.response.data);
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}> 
                <div className="form-group">
                    <label htmlFor="email">Email:</label> {/* Change to email */}
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
        </div>
    );
}

export default Login;
