import FaqList from "../Accordion/Accordion";
import "./About.css";

function AboutPage() {
    return (
        <div className="about-page">
            <div className="about-container">
                <section className="about-section vision-section">
                    <h1 className="about-heading">Our Vision</h1>
                    <p className="about-subheading">
                        Our mission is to simplify task management for
                        individuals and teams. Whether you're a developer,
                        student, or project manager, Taskly helps you stay
                        organized and focused.
                    </p>
                </section>

                <section className="about-section faq-section">
                    <h2 className="section-title">
                        Frequently Asked Questions
                    </h2>
                    <FaqList />
                </section>

                <section className="about-section contact-section">
                    <h2 className="section-title">Contact & Support</h2>
                    <p>
                        If you have any questions or feedback, feel free to
                        reach out.
                        <br />
                        <a
                            className="contact-link"
                            href="https://x.com/manav437"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @manav437 on X
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default AboutPage;
