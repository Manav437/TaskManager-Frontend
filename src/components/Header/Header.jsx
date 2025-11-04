import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token"),
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("showWelcomeMessage");
        setIsLoggedIn(false);
        setMenuOpen(false);
        navigate("/login");
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header">
            <div className="header-container">
                <NavLink to="/" className="logo" onClick={closeMenu}>
                    <img src="/taskly-icon.png" alt="Taskly Logo" />
                    <span>TASKLY</span>
                </NavLink>

                <nav className={`nav ${menuOpen ? "open" : ""}`}>
                    <NavLink to="/" onClick={closeMenu}>
                        Home
                    </NavLink>
                    <NavLink to="/about" onClick={closeMenu}>
                        About
                    </NavLink>
                    {isLoggedIn && (
                        <NavLink to="/tasks" onClick={closeMenu}>
                            Tasks
                        </NavLink>
                    )}

                    <div className="nav-separator"></div>

                    {isLoggedIn ? (
                        <>
                            <NavLink
                                to="/dashboard"
                                className="account-link"
                                onClick={closeMenu}
                            >
                                Account
                            </NavLink>
                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                <img src="/logout-img.png" alt="Logout icon" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" onClick={closeMenu}>
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="register-btn"
                                onClick={closeMenu}
                            >
                                Get Started
                            </NavLink>
                        </>
                    )}
                </nav>

                <button
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}

export default Header;
