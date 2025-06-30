import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../utils/api";
import './Register.css'

function RegisterPage() {
    const [user, setUser] = useState({ name: "", email: "", password: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = localStorage.getItem("token")
        if (userInfo) {
            navigate("/dashboard", { state: { fromRegister: true } })
        }
    })

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));      //purani value as it is(...spread operator), and only change
    };                                                                          //the field that is being edited

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Submitting Data:", user);
        setError("")

        if (!user.name || !user.email || !user.password) {
            setError("All fields are required!");
            return;
        }

        try {
            const responseData = await registerUser(user)
            if (responseData.token) {
                localStorage.setItem("token", responseData.token);
                alert("Registration successful!");
                setTimeout(() => {
                    navigate("/dashboard", { state: { fromRegister: true } });
                }, 500);
            } else {
                setError("No token received from server.");
            }
        } catch (err) {
            setError(err.message || "Something went wrong!")
        }
    }

    return (
        <>
            <div className="container">
                <div className="Register-div">
                    <img style={{ height: "40px", width: "40px", borderRadius: "3px" }} src="./taskly-icon.png" />
                    <h1 style={{ fontSize: "1.7rem", color: "white" }}>Create your Taskly account</h1>
                    <p>Already have an account? <Link style={{ color: "lightgreen" }} to="/login">Login</Link></p>

                    <form onSubmit={handleSubmit}>
                        <label className="label-text">Name</label>
                        <input className="register-input" type="text" name="name" placeholder="Manav Gusain" onChange={handleChange} required />

                        <label className="label-text">Email</label>
                        <input className="register-input" type="email" name="email" placeholder="manav.gsn@taskly.dev" onChange={handleChange} required />

                        <label className="label-text">Password</label>
                        <input autoComplete="new-password" className="register-input" type="password" name="password" placeholder="********" onChange={handleChange} required />

                        <button className="btn-grad" type="submit">Create Account</button>
                    </form>
                    <p style={{ fontSize: ".9rem", marginTop: "20px" }}>By signing up, you agree to our <span>Terms of service</span>.</p>
                </div>
            </div>
        </>
    )
}

export default RegisterPage