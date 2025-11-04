import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DrawCircleText } from "./Home-text";
import "./Home.css";

const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

function HomePage() {
    const navigate = useNavigate();
    const [quote, setQuote] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token"),
    );
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const quotes = [
        "The future depends on what you do today.",
        "Success usually comes to those who are too busy to be looking for it.",
        "Don't watch the clock; do what it does. Keep going.",
        "The way to get started is to quit talking and begin doing.",
        "Done is better than perfect.",
        "Work hard in silence, let success be your noise.",
    ];

    const videoList = [
        "/video-1.mp4",
        "/video-2.mp4",
        "/video-3.mp4",
        "/video-4.mp4",
        "/video-5.mp4",
    ];

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const handleVideoClick = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
    };

    return (
        <motion.div
            className="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="home-container">
                {/* Header */}
                <motion.header
                    className="home-header"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="home-title">TASKLY</h1>
                    <h2 className="home-subtitle">
                        Task Management Reimagined
                    </h2>
                    <h4 className="home-tagline">
                        What will you{" "}
                        <span className="tagline-highlight">achieve</span>{" "}
                        today?
                    </h4>
                    <p className="quote-text">"{quote}"</p>
                </motion.header>

                {/* Promo Section */}
                <motion.section
                    className="home-promo-card"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                >
                    <DrawCircleText />
                </motion.section>

                {/* Video Section */}
                <motion.div
                    className="video-container"
                    onClick={handleVideoClick}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 }}
                >
                    <AnimatePresence>
                        <motion.video
                            key={currentVideoIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            autoPlay
                            muted
                            loop
                            preload="auto"
                        >
                            <source
                                src={videoList[currentVideoIndex]}
                                type="video/mp4"
                            />
                        </motion.video>
                    </AnimatePresence>

                    <div className="video-overlay">
                        {isLoggedIn ? (
                            <div className="video-cta-loggedin">
                                <Link to="/tasks" className="cta-link">
                                    Let's get your tasks done! 📲
                                </Link>
                            </div>
                        ) : (
                            <div className="video-cta-loggedout">
                                <p
                                    style={{
                                        color: "white",
                                        margin: "0",
                                        width: "fit-content",
                                    }}
                                >
                                    Already have an account?
                                </p>
                                <button
                                    className="home-login-button"
                                    onClick={() => navigate("/login")}
                                >
                                    Log In
                                </button>
                            </div>
                        )}
                        <div className="video-click-prompt">
                            <p style={{ color: "white" }}>Click</p>
                            <img
                                src="/arrow-img.png"
                                alt="arrow"
                                className="prompt-arrow"
                            />
                        </div>
                    </div>
                    <div className="video-marquee">
                        <div className="marquee-content">
                            {Array(24).fill(<h2>TASKLY</h2>)}
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    className="home-footer"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.7 }}
                >
                    <div className="footer-promo">
                        <h3>
                            What <span className="promo-highlight">TASK</span>{" "}
                            will you do today?
                        </h3>
                    </div>

                    <div className="footer-links-container">
                        <div className="footer-column">
                            <h3>PRODUCT</h3>
                            <a href="#">Changelogs</a>
                            <a href="#">Docs</a>
                        </div>
                        <div className="footer-column">
                            <h3>COMPANY</h3>
                            <a href="#">Careers</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                        <div className="footer-column">
                            <h3>DEVELOPERS</h3>
                            <a href="#">Blog</a>
                            <a href="#">GitHub</a>
                            <a href="#">Status</a>
                        </div>
                    </div>

                    <div className="footer-brand">
                        <h1>TASKLY</h1>
                    </div>
                </motion.footer>
            </div>
        </motion.div>
    );
}

export default HomePage;
