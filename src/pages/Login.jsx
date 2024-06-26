import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithEmailPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      await loginWithEmailPassword(email, password);
      navigate("/");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;