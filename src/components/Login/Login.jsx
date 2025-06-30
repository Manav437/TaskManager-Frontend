import React, { useEffect, useState } from "react";
import { loginUser } from "../../utils/api.js";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'


function LoginPage() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("token")
        if (userInfo) {
            navigate("/dashboard")
        }
    })


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        console.log("Submitting Data:", user);

        if (!user.email || !user.password) {
            console.error("Email and password are required!");
            return;
        }
        try {
            const data = await loginUser(user);
            localStorage.setItem("token", data.token); // Store JWT in localStorage
            alert("Login successful!");
            window.dispatchEvent(new Event("authChange"));
            navigate("/dashboard"); // Redirect after login
        } catch (err) {
            setError(err.message || "Invalid credentials");
            alert("Invalid credentials");
        }
    };
    return (
        <div className="login">
            <div className="login-container">
                <div className="Login-div">
                    <img style={{ height: "40px", width: "40px", borderRadius: "5px" }} src="/taskly-icon.png" />
                    <h1 style={{ paddingTop: "1px" }} className="login-header">Log in to Taskly</h1>
                    <p className="login-p">Dont have an account? <Link style={{ color: "lightgreen" }} to="/register">Register</Link></p>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label className="label-text">Email</label>
                        <input className="login-input" type="email" name="email" onChange={handleChange} placeholder="mnv.gsn@taskly.dev" required />

                        <label className="label-text">Password</label>
                        <input className="login-input" type="password" name="password" onChange={handleChange} placeholder="********" required />

                        <button style={{ marginTop: "20px" }} className="btn-grad" type="submit">Log In</button>
                    </form>
                    <p style={{ fontSize: ".9rem", cursor: "pointer", textAlign: "end", textDecoration: "underline", textUnderlineOffset: "3px" }}>Forgot Password</p>

                </div>
            </div>

        </div>
    )
}

export default LoginPage