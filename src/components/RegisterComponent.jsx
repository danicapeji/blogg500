import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../firebase";

const RegisterComponent = () => {
  const { userLoggedIn, registerWithEmailPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await registerWithEmailPassword(email, password);
        setIsRegistering(false); 
      } catch (error) {
        setErrorMessage("Error registering with email and password");
        setIsRegistering(false); 
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <main className="register-container">
      <div className="register-box">
        <div className="register-title">
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={onSubmit} className="register-form">
          <div>
            <label>Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="off"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}

          <button
            type="submit"
            disabled={isRegistering}
            className="register-button"
          >
            {isRegistering ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="register-footer">
            Already have an account? {"   "}
            <Link to={"/login"}>Continue</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterComponent;
