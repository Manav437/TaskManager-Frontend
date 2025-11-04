import React, { useState } from "react";
import "./Accordion.css";

const FaqItem = ({ faq, index, activeIndex, setActiveIndex }) => {
    const isOpen = index === activeIndex;

    const toggleAccordion = () => {
        const newIndex = isOpen ? null : index;
        setActiveIndex(newIndex);
    };

    return (
        <div className={`faq-item ${isOpen ? "open" : ""}`}>
            <button className="faq-question" onClick={toggleAccordion}>
                {faq.question}
                <span className="faq-icon"></span>
            </button>
            <div className="faq-answer-wrapper">
                <p className="faq-answer">{faq.answer}</p>
            </div>
        </div>
    );
};

const FaqList = () => {
    const faqData = [
        {
            question: "How do I add a new task?",
            answer: "To add a new task, click on the 'Add Task' button, fill in the task details like title, description, deadline, and priority, then click 'Save'.",
        },
        {
            question: "Can I mark a task as completed?",
            answer: "Absolutely! Click the checkbox next to the task. Completed tasks will move to your 'Completed' list.",
        },
        {
            question: "How do I change my account details?",
            answer: "Go to your 'Profile' section from the sidebar menu and click 'Edit Profile' to update your details or upload a new photo.",
        },
        {
            question: "Is this task manager free to use?",
            answer: "Yes — our core task management features are free forever. Premium plans may be available in the future for advanced options.",
        },
    ];

    // State is lifted to the parent to ensure only one item is open at a time
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="faq-container">
            {faqData.map((faq, index) => (
                <FaqItem
                    key={index}
                    faq={faq}
                    index={index}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            ))}
        </div>
    );
};

export default FaqList;
