import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderLayout from "./components/Layout/HeaderLayout";
import LoginPage from "./components/Login/Login";
import AboutPage from "./components/About/About";
import RegisterPage from "./components/Register/Register";
import DashboardPage from "./components/Dashboard/Dashboard";
import TasksPage from "./components/Tasks/Tasks";
import HomePage from "./components/Home/Home";
import NotFoundPage from "./components/404Page/NotFoundPage";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<HeaderLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
