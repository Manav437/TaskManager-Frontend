import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../utils/api.js";
import "./Login.css";

function LoginPage() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // This effect redirects the user if they are already logged in.
    // The empty dependency array [] ensures it only runs once on mount.
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!user.email || !user.password) {
            setError("Email and password are required.");
            setIsLoading(false);
            return;
        }

        try {
            const data = await loginUser(user);
            localStorage.setItem("token", data.token);
            window.dispatchEvent(new Event("storage"));
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <img
                        src="/taskly-icon.png"
                        alt="Taskly Logo"
                        className="login-logo"
                    />
                    <h1>Log in to Taskly</h1>
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="login-link">
                            Register
                        </Link>
                    </p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="login-input"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="e.g., your@email.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="login-input"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="********"
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button
                        className="login-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging In..." : "Log In"}
                    </button>
                </form>

                <div className="login-footer">
                    <Link to="/forgot-password" className="login-link small">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
