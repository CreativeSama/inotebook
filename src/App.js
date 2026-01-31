import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";

import NoteState from "./context/notes/NoteState";

function App() {
  // original central alert state
  const [alert, setAlert] = useState(null);

  // original showAlert function
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <Router>
        {/* original navbar */}
        <Navbar showAlert={showAlert} />

        {/* original alert placement */}
        <Alert alert={alert} />

        <div className="container">
          <Routes>
            {/* ONLY change: pass showAlert to Home */}
            <Route
              exact
              path="/"
              element={<Home showAlert={showAlert} />}
            />

            <Route exact path="/about" element={<About />} />

            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />

            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
