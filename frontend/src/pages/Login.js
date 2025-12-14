import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("https://backend-api-x3z0.onrender.com/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  return (
  <div className="container">
    <h2>Login</h2>

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

    <button onClick={login}>Login</button>

    <div className="link">
      New user? <Link to="/register">Register</Link>
    </div>
  </div>
);


}
