import { Link } from "react-router-dom"
import "./NotFoundPage.css"

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-heading">404</h1>
            <p className="not-found-p">OOPS! The page that you are looking for doesn't exist :(</p>
            <Link className="not-found-link" to='/'>Go back HOME</Link>
        </div>

    )
}

export default NotFoundPage