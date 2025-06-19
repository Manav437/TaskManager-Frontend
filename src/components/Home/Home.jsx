import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DrawCircleText } from "./Home-text";
import "./Home.css"

const quotes = [
    "The future depends on what you do today.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't watch the clock; do what it does. Keep going.",
    "The way to get started is to quit talking and begin doing.",
    "The secret of getting ahead is getting started.",
    "The best way to predict the future is to create it.",
    "You are never too old to set another goal or to dream a new dream.",
    "Your limitation — it's only your imagination.",
    "You dont have to be extreme, just consistent.",
    "Work hard in silence, let success be your noise.",
    "Done is better than perfect."
]

const videoList = ["/video-1.mp4", "/video-2.mp4", "/video-3.mp4", "/video-4.mp4", "/video-5.mp4"];

function HomePage() {
    const navigate = useNavigate();
    const [quote, setQuote] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        // console.log("Video index changed to:", currentVideoIndex);
    }, [currentVideoIndex]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [])

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [])

    const handleClick = () => {
        // Increment the video index, cycling through the videos
        const nextIndex = (currentVideoIndex + 1) % videoList.length;
        setCurrentVideoIndex(nextIndex);

    };

    return (
        <>
            <div className="home-container" style={{ gap: "30px" }}>
                <div className="div-one">
                    <h1 style={{ marginBottom: ".7rem", fontSize: "6rem", color: "white", fontWeight: "800" }}>TASKLY</h1>
                    <h2 style={{ color: "#9f9e9e", width: "fit-content", paddingBottom: "9px", borderBottom: "3px solid #fff", fontStyle: "italic", margin: "5px auto", textAlign: "center", fontSize: "2.5rem" }}>Task Management app</h2>
                    <h4>What will you <span style={{ color: "green", fontStyle: "italic" }}>achieve</span> today!</h4>
                    {/* </div> */}

                    {/* <div className="div-two"> */}
                    <h1 >Do your best work in Taskly</h1>
                    <p className="quote-text">{quote}</p>
                </div>

                <div className="div-three">
                    <DrawCircleText />
                </div>

                <div className="video-container" onClick={handleClick}>
                    <video autoPlay muted loop preload="auto" key={currentVideoIndex}>
                        <source src={videoList[currentVideoIndex]} type="video/mp4" />
                    </video>
                    <div className="hello-div">
                        {isLoggedIn ? (
                            <div style={{ paddingBottom: "60px", width: "100%", display: "flex", flexDirection: "row" }}>
                                <a style={{ width: "50%", background: "black", borderRadius: "20px", border: "1px solid #2C2C2C", margin: "0 auto", textAlign: "center", textDecoration: "none" }} href="/tasks"><p className="log-in-text" style={{ display: "inline-block", width: "100%", color: "white", padding: "5px", borderRadius: "5px", paddingRight: "1px" }}>
                                    Lets get your tasks done! 📲</p>
                                </a>
                            </div>
                        ) : (
                            <div className="hello-loggedin">
                                <p >Already have an account?</p>
                                <button className="home-login" style={{ borderRadius: "20px", color: "#EFEFEF", fontSize: "2rem", width: "45%" }} onClick={() => navigate("/login")}><span>LOG IN</span></button>
                            </div>
                        )}

                        <div className="click-here" style={{ height: "12px", padding: "3px", border: "1px solid #2C2C2C", borderRadius: "5px", width: "70px", display: "flex", alignItems: "center", fontSize: "8px" }}>
                            <p style={{ paddingLeft: "2px", color: "white", display: "inline-block", width: "65px" }}>click here</p>
                            <img style={{ paddingRight: "4px", height: "10px" }} src="/arrow-img.png" alt="" />
                        </div>
                    </div>
                    <div className="text-wrapper">
                        <div className="moving-text">
                            <div className="scroll-content">
                                {Array(12).fill(<h2>TASKLY</h2>)}
                            </div>
                            <div className="scroll-content">
                                {Array(12).fill(<h2>TASKLY</h2>)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-div">
                    <div className="footer-first">
                        <h3>What <span style={{ padding: "3px 10px", borderRadius: "3px", background: "green", fontWeight: "800", fontStyle: "italic" }}>TASK</span> will you do today?</h3>
                    </div>

                    <div className="footer-links">
                        <div className="footer" >
                            <h3>PRODUCT</h3>
                            <a href="" >changelogs</a>
                            <a href="">docs</a>
                        </div>

                        <div className="footer">
                            <h3>COMPANY</h3>
                            <a href="/">careers</a>
                            <a href="/">privacy policy</a>
                            <a href="/">terms of service</a>
                            <a href="/">partner with us</a>
                        </div>

                        <div className="footer">
                            <h3>DEVELOPERS</h3>
                            <a href="/">blog</a>
                            <a href="/">github</a>
                            <a href="/">status</a>
                        </div>
                    </div>

                    <div className="footer-last">
                        <h1>TASKLY</h1>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HomePage