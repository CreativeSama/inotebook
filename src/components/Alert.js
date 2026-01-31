import React from "react";

const Alert = (props) => {
  if (!props.alert) return null;

  return (
    <div className={`alert alert-${props.alert.type}`} role="alert">
      {props.alert.msg}
    </div>
  );
};

export default Alert;