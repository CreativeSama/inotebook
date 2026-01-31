import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { getUser } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken);

      await getUser(); // ⭐ critical line

      props.showAlert("Logged in successfully", "success");

      setTimeout(() => navigate("/"), 500);
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="container my-3">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control my-2"
          name="email"
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          type="password"
          className="form-control my-2"
          name="password"
          placeholder="Password"
          onChange={onChange}
          required
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
