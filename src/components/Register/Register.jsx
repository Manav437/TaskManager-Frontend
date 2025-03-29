import React, { useState, useEffect } from "react";
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
            navigate("/dashboard")
        }
    })

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Submitting Data:", user);
        setError("")

        if (!user.name || !user.email || !user.password) {
            setError("All fields are required!");
            return;
        }

        try {
            await registerUser(user)
            alert("Registration successful!")
            setTimeout(() => {
                navigate("/login"); // Navigate after alert
            }, 500);
        } catch (err) {
            setError(err.message || "Something went wrong!")
        }
    }

    return (
        <>
            <div className="container">
                <div className="Register-div">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="label-text">Username</label>
                        <input className="register-input" type="text" name="name" placeholder="Enter your username" onChange={handleChange} required />

                        <label className="label-text">Email</label>
                        <input className="register-input" type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />

                        <label className="label-text">Password</label>
                        <input className="register-input" type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />

                        <button className="btn-grad" type="submit">Submit</button>
                    </form>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </>
    )
}

export default RegisterPage