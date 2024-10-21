// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Digital Document Management System</h1>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
