import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";
import "./Register.css";

function RegisterPage() {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!user.name || !user.email || !user.password) {
            setError("All fields are required!");
            setIsLoading(false);
            return;
        }

        try {
            const responseData = await registerUser(user);
            if (responseData.token) {
                localStorage.setItem("token", responseData.token);
                window.dispatchEvent(new Event("storage"));
                navigate("/dashboard", { state: { fromRegister: true } });
            } else {
                setError(
                    "Registration failed: No token received from the server.",
                );
            }
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-header">
                    <img
                        src="/taskly-icon.png"
                        alt="Taskly Logo"
                        className="register-logo"
                    />
                    <h1>Create your Taskly account</h1>
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="register-link">
                            Login
                        </Link>
                    </p>
                </div>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            className="register-input"
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="e.g., Manav Gusain"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="register-input"
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
                            className="register-input"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Choose a strong password"
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button
                        className="register-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="register-footer">
                    <p>
                        By signing up, you agree to our{" "}
                        <Link to="/terms" className="register-link small">
                            Terms of Service
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
