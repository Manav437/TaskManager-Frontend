import "./About.css"

function AboutPage() {
    return (
        <>
            <div className="about-div" style={{ color: "white", fontFamily: "sans-serif", lineHeight: "1.6" }}>
                <h1 className="about-h1">About Task Manager</h1>
                <p style={{ color: "white" }}>
                    This is a task and user management system built using <strong>Node.js</strong>, <strong>Express</strong>,
                    <strong> MongoDB</strong>, and <strong>React.js</strong>. Whether you're working on personal projects or
                    collaborating with a team, our app makes task tracking easy and efficient.
                </p>
                <h1 className="about-h1">Key Features</h1>
                <div
                    style={{
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        marginTop: "10px",
                    }}
                >
                    <div>
                        <span style={{ display: "inline-block", width: "22ch" }}>User Authentication</span>: Secure login and registration using JWT authentication.
                    </div>
                    <div>
                        <span style={{ display: "inline-block", width: "22ch" }}>Task Management</span>: Create, update, and delete tasks with ease.
                    </div>
                    <div>
                        <span style={{ display: "inline-block", width: "22ch" }}>Task Status Tracking</span>: Mark tasks as pending, in progress, or completed.
                    </div>
                    <div>
                        <span style={{ display: "inline-block", width: "22ch" }}>User Profiles</span>: Upload and manage profile pictures.
                    </div>
                </div>

                <h1 className="about-h1">Vision</h1>
                <p style={{ color: "white" }}>
                    Our mission is to simplify task and user management for individuals and teams.
                    Whether you're a developer, student, or project manager,
                    Task Manager helps you stay organized and focused.
                </p>

                <div style={{ marginTop: "auto", textAlign: "center", paddingTop: "2rem" }}>
                    <h2>Contact & Support</h2>
                    <p style={{ color: "white" }}>
                        If you have any questions or feedback, feel free to reach out at&nbsp;
                        <a style={{ color: "grey" }} href="https://x.com/manav437" target="_blank" rel="noopener noreferrer">@manav437 on X</a>.
                    </p>
                </div>
            </div>
        </>
    )
}

export default AboutPage