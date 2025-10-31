import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './CSS/LoginSignup.css'

const LoginSignup = () => {
    const navigate = useNavigate(); 
    const location = useLocation();

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [redirected, setRedirected] = useState(false);

    const BASE_URL = "https://final-qfg9.onrender.com/api/auth";

    useEffect(() => {
        if (location.state?.fromProtectedRoute) {
            setRedirected(true);
        }
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('redirected') === 'true') {
            setRedirected(true);
        }
    }, [location])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin 
            ? `${BASE_URL}/login`
            : `${BASE_URL}/register`;

        const payload = isLogin
            ? { email, password }
            : { username, email, password };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(isLogin ? "Login successful!" : "Registration successful!");
                // Handle successful login/registration (redirect, store token, etc.)
                if (isLogin && data.token) {
                    localStorage.setItem("token", data.token);

                    if (data.user && data.user.username) {
                        localStorage.setItem("username", data.user.username);
                    } else if (username) {
                        localStorage.setItem("username", username);
                    }


                    navigate("/shop");
                } else if (!isLogin) {
                    setIsLogin(true);
                    setMessage("Registration successful! Please login.")
                }
            } else {
                setMessage(data.message || "Something went wrong!");
            }
        } catch (error) {
            setMessage("Network error. Please try again.");
            console.error("Error:", error);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setMessage("");
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-signup-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                
                {!isLogin && (
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={!isLogin}
                        />
                    </div>
                )}
                
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="submit-btn">
                    {isLogin ? "Login" : "Sign Up"}
                </button>
                
                {message && <div className="message">{message}</div>}
            </form>
            
            <button onClick={toggleMode} className="toggle-btn">
                {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
            </button>
        </div>
    );
};

export default LoginSignup;