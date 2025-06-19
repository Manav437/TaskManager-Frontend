import React from "react";
import { motion } from "framer-motion";
import "./Home.css";

export const DrawCircleText = () => {
    return (
        <div className="draw-circle-container">
            <h1 className="draw-circle-text">
                For the love of{" "}
                <span className="draw-circle-span">
                    productivity
                    <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" className="draw-circle-svg">
                        <motion.path
                            d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                            stroke="#FACC15"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 1.25, ease: "easeInOut" }}
                        // style={{ strokeDasharray: 600 }}
                        />
                    </svg>
                </span>{" "}
                — professionals are facing new challenges, and need fast and reliable tools to stay on track. That's why we built Taskly: a powerful task manager that helps you organize, prioritize, and get things done with ease.
            </h1>
        </div>
    );
};
