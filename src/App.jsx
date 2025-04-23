import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Header from './components/Header/Header'
import LoginPage from './components/Login/Login';
import AboutPage from './components/About/About';
import RegisterPage from './components/Register/Register';
import DashboardPage from './components/Dashboard/Dashboard';
import TasksPage from './components/Tasks/Tasks';
import HomePage from './components/Home/Home';
import NotFoundPage from './components/404Page/NotFoundPage';

function App() {
  const location = useLocation();

  // Don't show header on 404 page
  const hideHeaderRoutes = ['/*'];
  const isNotFoundPage = location.pathname !== '/' &&
    !['/about', '/login', '/register', '/tasks', '/dashboard'].includes(location.pathname);


  return (
    <div className="App">
      {!isNotFoundPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
