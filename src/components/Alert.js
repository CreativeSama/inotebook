import React from "react";

const Alert = (props) => {
  if (props.alert === null) {
    return <div style={{ height: "50px" }}></div>;
  }

  const capitalize = (word) => {
    if (word === "danger") return "Error";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div style={{ height: "50px" }}>
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.type)}</strong>:{" "}
        {props.alert.msg}
      </div>
    </div>
  );
};

export default Alert;
