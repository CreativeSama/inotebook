import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { user, clearUser } = context;

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    props.showAlert("Logged out successfully", "success");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
        </ul>

        {user && (
          <span className="text-light mx-3">Hello, {user.name}</span>
        )}

        {!localStorage.getItem("token") ? (
          <>
            <Link className="btn btn-primary mx-1" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary mx-1" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;