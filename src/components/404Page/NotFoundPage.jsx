import { Link } from "react-router-dom"
import "./NotFoundPage.css"

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <img style={{ margin: "0", height: "150px", border: "1px solid #2C2C2C", borderRadius: "10px" }} src="https://i.pinimg.com/736x/ff/5c/3f/ff5c3f3db06fc1abf557d3281ecf9801.jpg" alt="" />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 style={{ width: "100px" }} className="not-found-heading">404</h1>
                <p className="not-found-p">OOPS! The page that you were looking for doesn't exist :(</p>
            </div>


            <Link className="not-found-link" to='/'>Back to HOME</Link>
        </div >

    )
}

export default NotFoundPage