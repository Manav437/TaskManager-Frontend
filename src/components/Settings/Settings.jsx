import React from "react";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import "./Settings.css"; // Import CSS for styles

const HoverDevCards = () => {
    return (
        <div className="hover-dev-cards">
            <div className="cards-grid">
                <Card
                    title="Account"
                    subtitle="Manage profile"
                    href="#"
                    Icon={FiUser}
                />
                <Card
                    title="Email"
                    subtitle="Manage email"
                    href="#"
                    Icon={FiMail}
                />
                <Card
                    title="Team"
                    subtitle="Manage team"
                    href="#"
                    Icon={FiUsers}
                />
                <Card
                    title="Billing"
                    subtitle="Manage cards"
                    href="#"
                    Icon={FiCreditCard}
                />
            </div>
        </div>
    );
};

const Card = ({ title, subtitle, Icon, href }) => {
    return (
        <a href={href} className="card">
            <div className="card-bg" />
            <Icon className="card-icon-bg" />
            <Icon className="card-icon" />
            <h3 className="card-title">{title}</h3>
            <p className="card-subtitle">{subtitle}</p>
        </a>
    );
};

export default HoverDevCards;
