import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("showWelcomeMessage");
        setIsLoggedIn(false);
        setMenuOpen(false);
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src="/taskly-icon.png" alt="Taskly Logo" />
                </Link>

                <nav className={`nav ${menuOpen ? "open" : ""}`}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    {isLoggedIn && <Link to="/tasks" onClick={() => setMenuOpen(false)}>Tasks</Link>}

                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Account</Link>
                            <button className="logout-btn" onClick={handleLogout}>
                                <img src="/logout-img.png" alt="Logout icon" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link className="register-btn" to="/register" onClick={() => setMenuOpen(false)}>Get Started</Link>
                        </>
                    )}
                </nav>

                <button className="hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}

export default Header;
