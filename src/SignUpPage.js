import './loginPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useConfig from './hooks/useConfig';
import axios from 'axios';

function SignUpPage() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { config} = useConfig(); // Use config directly
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!emailId || !password || !confirmPassword) {
            alert("Please enter all the fields");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(emailId)) {
            alert("Please enter a valid email ID");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

 

        const payload = {
            emailId: emailId,
            password: password,
        };

        try {
          


            const response = await axios.post(`${config.API_URL}/user/registerUser`, payload);
            if (response.status === 200) {
                alert("User registered successfully!");
                navigate('/');
            } else {
                alert("Failed to register.");
            }
        } catch (error) {
            console.error("Error occurred while signing up:", error);
            alert("An error occurred during registration");
        }
    };

    return (
        <div className="App">
            <div className="App-header">
                <div style={{ width: '40%' }}>
                    <p style={{ fontSize: '80px', fontFamily: 'Montserrat' }}>Sign Up</p>
                    <div style={{ width: '100%' }}>
                        <input
                            type="text"
                            placeholder="Email ID"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        /><br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-button" onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
