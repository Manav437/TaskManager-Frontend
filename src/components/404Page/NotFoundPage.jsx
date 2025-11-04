import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <img className="not-found-image" src="/404img.gif" alt="404-gif" />

            <div className="not-found-text-container">
                <h1 className="not-found-heading">404</h1>
                <p className="not-found-p">
                    OOPS! The page that you were looking for doesn't exist :(
                </p>
            </div>

            <Link className="not-found-link" to="/" replace>
                Back to HOME
            </Link>
        </div>
    );
};

export default NotFoundPage;
