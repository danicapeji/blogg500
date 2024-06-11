import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/index";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const { currentUser } = useAuth();
  const { logout } = useContext(AppContext);

  if (!currentUser) {
    return (
      <nav className="navbar">
        <h1>Blogg</h1>
        <div>
          <Link to="/">Hem</Link>
          <Link to="/login">Logga in</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <h1>Blogg</h1>
      <div>
        <Link to="/">Hem</Link>
        <span>Välkommen, {currentUser.email}!</span>
        <button onClick={logout} className="logout-button">
          Logga ut
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
