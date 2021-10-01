import React from "react";
import "./button.css";
const Button = (props) => {
  return (
    <>
      <button
        name={props.name}
        onClick={props.onClick}
        className={`button ${props.disabled ? "disabled" : "active"} ${
          props.className
        }`}
        disabled={props.disabled}
      >
        {props.value || props.children}
      </button>
    </>
  );
};
Button.defaultProps = { className: "" };
export default Button;
