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
                    <svg
                        viewBox="0 0 210 50"
                        xmlns="http://www.w3.org/2000/svg"
                        className="draw-circle-svg"
                    >
                        <motion.ellipse
                            cx="105"
                            cy="25"
                            rx="100"
                            ry="20"
                            stroke="#FACC15"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.25, ease: "easeInOut" }}
                        />
                    </svg>
                </span>{" "}
                — professionals need fast and reliable tools to stay on track.
                That's why we built Taskly: a powerful task manager that helps
                you organize, prioritize, and get things done.
            </h1>
        </div>
    );
};
