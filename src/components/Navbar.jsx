import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1>Danicas blogg</h1>

      <Link to="/">Home</Link>
      <Link to="/Login">Logga in</Link>
    </div>
  );
};
export default NavBar;
