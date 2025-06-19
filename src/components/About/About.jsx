import FaqList from "../Accordion/Accordion"
import "./About.css"

function AboutPage() {
    return (
        <>
            <div className="about-div">
                <div className="about-first">
                    <h1 className="about-h1">Vision</h1>
                    <p style={{ margin: "10px auto", textAlign: "center", width: "80%", fontSize: "1.15rem", color: "white" }}>
                        Our mission is to simplify task and user management for individuals and teams.
                        Whether you're a developer, student, or project manager,
                        Task Manager helps you stay organized and focused.
                    </p>
                </div>

                <div className="about-two">
                    <FaqList />
                </div>


                <div className="about-three">
                    <h2 style={{ textDecoration: "underline", textUnderlineOffset: "3px" }} >Contact & Support</h2>
                    <p>
                        If you have any questions or feedback, feel free to reach out at&nbsp; <br />
                        <a className="hover-a-about" href="https://x.com/manav437" target="_blank" rel="noopener noreferrer">@manav437 on X</a>.
                    </p>
                </div>
            </div>
        </>
    )
}

export default AboutPage