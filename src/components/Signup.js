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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/auth/createuser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    const json = await response.json();

    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken);

      await getUser(); // ⭐ critical line

      props.showAlert("Account created successfully", "success");

      setTimeout(() => navigate("/"), 500);
    } else {
      props.showAlert("Invalid details", "danger");
    }
  };

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="container my-3">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control my-2" placeholder="Name" onChange={onChange} required />
        <input name="email" className="form-control my-2" placeholder="Email" onChange={onChange} required />
        <input name="password" type="password" className="form-control my-2" placeholder="Password" onChange={onChange} required />
        <input name="cpassword" type="password" className="form-control my-2" placeholder="Confirm Password" onChange={onChange} required />
        <button className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
