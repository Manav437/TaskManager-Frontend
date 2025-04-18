import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    useEffect(() => {
        console.log("Video index changed to:", currentVideoIndex);
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
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
    };

    return (
        <>
            <div className="home-container" style={{ gap: "30px" }}>
                <div style={{ width: "70%", textAlign: "center", border: "1px solid #2c2c2c", borderRadius: "10px" }}>
                    <h1 style={{ fontSize: "5rem", color: "white", fontWeight: "800" }}>TASKLY</h1>
                    <h2 style={{ width: "60%", paddingBottom: "9px", borderBottom: "3px solid #2C2C2C", fontStyle: "italic", margin: "5px auto", textAlign: "center", color: "white", fontSize: "2.5rem" }}>Task Management app</h2>
                    <h4>What will you <span style={{ color: "green" }}>achieve</span> today!</h4>
                </div>

                <div style={{ textAlign: "center", width: "70%", border: "2px solid #2C2C2C", borderRadius: "10px" }}>
                    <h1 style={{ color: "beige", width: "65%", margin: "0 auto" }}>Do your best work in Taskly</h1>
                    <p className="quote-text">{quote}</p>
                </div>

                <div style={{ background: "black", border: "2px solid #2C2C2C", borderRadius: "10px", width: "70%", textAlign: "center", height: "50vh" }}>
                    <p style={{ margin: "10% auto", width: "50%" }}>For the love of productivity — professionals are facing new challenges, and need fast and reliable tools to stay on track. That's why we built Taskly: a powerful task manager that helps you organize, prioritize, and get things done with ease.</p>
                </div>

                <div className="video-container" onClick={handleClick}>
                    <video autoPlay muted loop key={videoList[currentVideoIndex]}>
                        <source key={videoList[currentVideoIndex]} src={videoList[currentVideoIndex]} type="video/mp4" />
                    </video>
                    <div className="hello-div" style={{ height: "100px", marginTop: "2%", borderRadius: "20px", width: "90%", position: "absolute" }}>
                        {isLoggedIn ? (
                            <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                                <a style={{ textDecoration: "none" }} href="/tasks"><p style={{ display: "inline-block", width: "50%", color: "white", background: "black", padding: "5px", borderRadius: "5px", paddingRight: "1px" }}>
                                    Lets get your tasks done!</p>
                                </a>
                            </div>
                        ) : (<div style={{ padding: "10px auto", display: "flex", justifyContent: "space-between", height: "100%" }}>
                            <p style={{ fontSize: "1.8rem", marginTop: "30px", textAlign: "center", paddingTop: "7px", paddingLeft: "10px", display: "inline-block", width: "50%" }}>Already have an account?</p>
                            <button style={{ borderRadius: "10px", color: "#EFEFEF", background: "#5CB338", fontSize: "2rem", width: "50%", height: "80%" }} onClick={() => navigate("/login")}>LOG IN</button>
                        </div>)}

                        <div className="click-here" style={{ height: "10px", padding: "3px", border: "1px solid #2C2C2C", borderRadius: "5px", width: "70px", display: "flex", alignItems: "center", fontSize: "8px", marginTop: "30px" }}>
                            <p style={{ color: "white", display: "inline-block", width: "65px" }}>click here</p>
                            <img style={{ height: "10px" }} src="/arrow-img.png" alt="" />
                        </div>
                    </div>
                    <div className="text-wrapper">
                        <div className="moving-text" style={{ display: "flex", color: "white" }}>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                            <h2 style={{ color: "#F8EEDF" }}>TASKLY</h2>
                        </div>
                    </div>
                </div>

                <div style={{ gap: "0", alignItems: "center", display: "flex", flexDirection: "column", width: "70%", margin: "0 auto" }}>
                    <div style={{ border: "3px solid #2C2C2C", borderBottom: "1px dotted #2C2C2C", padding: "30px", background: "black", height: "70px", display: "flex", justifyContent: "flex-end", gap: "0", marginBottom: "0", width: "80%", borderRadius: "10px 10px 0 0" }}>
                        <h3 style={{ fontSize: "3rem", paddingTop: "20px", margin: "0 auto", textAlign: "center", marginBottom: "0", color: "white" }}>What <span style={{ padding: "3px 10px", borderRadius: "3px", background: "green", fontWeight: "800", fontStyle: "italic" }}>TASK</span> will you do today?</h3>
                    </div>

                    <div style={{ paddingTop: "30px", height: "250px", background: "black", marginTop: "0", gap: "0", display: "flex", justifyContent: "space-around", flexDirection: "row", width: "100%", border: "3px solid #2C2C2C", borderTop: "0", borderBottom: "0", borderRadius: "10px 10px 0 0" }}>
                        <div className="footer" style={{ gap: "10px", display: "flex", flexDirection: "column", textAlign: "center" }}>
                            <h3>PRODUCT</h3>
                            <a href="" >changelogs</a>
                            <a href="">docs</a>
                        </div>

                        <div className="footer" style={{ gap: "10px", display: "flex", flexDirection: "column", textAlign: "center" }}>
                            <h3>COMPANY</h3>
                            <a href="/">careers</a>
                            <a href="/">privacy policy</a>
                            <a href="/">terms of service</a>
                            <a href="/">partner with us</a>
                        </div>

                        <div className="footer" style={{ gap: "10px", display: "flex", flexDirection: "column", textAlign: "center" }}>
                            <h3>DEVELOPERS</h3>
                            <a href="/">blog</a>
                            <a href="/">github</a>
                            <a href="/">status</a>
                        </div>
                    </div>

                    <div style={{ border: "3px solid #2C2C2C", borderTop: "1px dotted #2C2C2C", borderBottom: "0", overflow: "hidden", gap: "0", marginBottom: "0", height: "100px", position: "relative", textAlign: "center", width: "100%", background: "black" }} >
                        <h1 style={{
                            height: "99px",
                            position: "absolute",
                            bottom: "0", // Just below the footer
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "9rem",
                            color: "#FFEDFA",
                            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
                            padding: "0 20px",
                            lineHeight: "1.2",
                            margin: "0",
                        }}>TASKLY</h1>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HomePage