import React, { useState } from "react";
import "./Accordion.css"

const FaqList = () => {
    const faqData = [
        {
            question: "How do I add a new task?",
            answer: "To add a new task, click on the 'Add Task' button, fill in the task details like title, description, deadline, and priority, then click 'Save'.",
        },
        {
            question: "Is there a way to mark a task as completed?",
            answer: "Absolutely! Click the checkbox or 'Mark as Done' button next to the task. Completed tasks will move to your 'Completed' list.",
        },
        {
            question: "How do I change my account details or profile photo?",
            answer: "Go to your 'Profile' section from the sidebar menu and click 'Edit Profile' to update your details or upload a new photo.",
        },
        {
            question: "Is this task manager free to use?",
            answer: "Yes — our core task management features are free forever. Premium plans may be available in future for advanced options."
        }
    ];

    const FaqItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);

        const arrowStyle = {
            display: "inline-block",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
        };

        return (
            <div className="itemStyle">
                <div className="questionStyle" onClick={() => setIsOpen(!isOpen)}>
                    {question}
                    <span style={arrowStyle}>▶️</span>
                </div>
                {isOpen && <div className="answerStyle">{answer}</div>}
            </div>
        );
    };

    return (
        <div className="containerStyle">
            <h2 className="headingStyle">FAQs</h2>
            {faqData.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    );
};

export default FaqList;
