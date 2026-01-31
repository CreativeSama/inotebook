import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { getUser } = context;

  // ✅ DEPLOYMENT SAFE
  const host =
    process.env.REACT_APP_BACKEND_URL ||
    "https://inotebook-il1u.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken);

      // ⭐ already existing logic
      await getUser();

      props.showAlert("Account created successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Create an account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control my-2"
          name="name"
          placeholder="Name"
          onChange={onChange}
          required
        />

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

        <input
          type="password"
          className="form-control my-2"
          name="cpassword"
          placeholder="Confirm Password"
          onChange={onChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;