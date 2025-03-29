import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"

function HomePage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [])
    return (
        <>
            <div className="home-container">
                <h1>Task Management app!</h1>
                <h4>What will you <span style={{ color: "green" }}>achieve</span> today!</h4>
                {isLoggedIn ? (
                    <div className="home-logged-div">
                        <a style={{ textDecoration: "none" }} href="/tasks"><p style={{ color: "white", background: "black", padding: "5px", borderRadius: "5px", paddingRight: "1px" }}>
                            Lets get your tasks done!</p>
                        </a>
                    </div>
                ) : (
                    <div className="home-login-div">
                        <p>Already have an account?</p>
                        <button onClick={() => navigate("/login")}>Log In</button>
                    </div>
                )}

            </div>
        </>
    )
}

export default HomePage