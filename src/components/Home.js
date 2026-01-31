import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  // original behavior: Home just renders Notes
  // ONLY change: forward showAlert
  return <Notes showAlert={props.showAlert} />;
};

export default Home;
