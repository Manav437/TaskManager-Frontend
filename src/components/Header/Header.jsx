import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();
    const userInfo = localStorage.getItem("token")

    useEffect(() => {
        // Function to update login state
        const updateAuthStatus = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        // Listen for storage changes across tabs
        window.addEventListener("authChange", updateAuthStatus);

        return () => {
            window.removeEventListener("authChange", updateAuthStatus);
        };
    }, [userInfo]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from storage
        setIsLoggedIn(false); // Update state
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
            <div className="headerContainer">
                <ul className="navList leftLinks">
                    <li className="logo-li"><Link to="/"><img style={{ height: "35px" }} src="/taskly-icon.png" alt="" /></Link></li>
                    <li className="underline-hover"><Link to="/">Home</Link></li>
                    <li className="underline-hover"><Link to="/about">About</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li className="underline-hover"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="underline-hover"><Link to="/tasks">Tasks</Link></li>
                        </>

                    )
                        : null}
                </ul>
                <ul className="navList rightLinks">
                    {isLoggedIn ? (
                        <li className="">
                            <button onClick={handleLogout} className="logout-btn"><img src="/logout-img.png" alt="" />LOGOUT </button>
                        </li>
                    ) : (
                        <>
                            <li className="underline-hover"><Link to="/login">Login</Link></li>
                            <li className="underline-hover"><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </>
    )
}

export default Header
