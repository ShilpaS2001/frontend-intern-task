import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post("https://backend-api-x3z0.onrender.com/api/auth/register", {
        name,
        email,
        password
      });
      alert("Registered successfully");
      window.location.href = "/";
    } catch {
      alert("Registration failed");
    }
  };

  return (
  <div className="container">
    <h2>Register</h2>

    <input
      placeholder="Full Name"
      onChange={e => setName(e.target.value)}
    />

    <input
      type="email"
      placeholder="Email"
      onChange={e => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={e => setPassword(e.target.value)}
    />

    <button onClick={register}>Register</button>

    <div className="link">
      Already have an account? <Link to="/">Login</Link>
    </div>
  </div>
);


}
