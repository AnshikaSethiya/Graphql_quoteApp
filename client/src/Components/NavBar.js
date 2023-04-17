import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <nav>
      <div className="nav-wrapper #0d47a1 blue darken-4" style={{padding:"0 1rem"}}>
        <Link to="/" className="brand-logo left">
          Quote App
        </Link>
        <ul id="nav-mobile" className="right">
          {token ? (
            <>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button className="red btn" onClick={() => {
                  localStorage.removeItem("token")
                  navigate("/login")
                }}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
