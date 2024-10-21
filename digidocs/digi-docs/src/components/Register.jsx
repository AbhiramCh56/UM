// src/components/Register.jsx
import React, { useState } from "react";
import { register } from "../auth"; // Assuming you have a register function
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
