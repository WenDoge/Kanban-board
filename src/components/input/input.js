import React from "react";
import "./input.css";

const Input = (props) => {
  return (
    <>
      <input
        id="inputId"
        className={props.className}
        onChange={props.onChange}
        value={props.value}
      />
      <label className={props.labelClassName} htmlFor="inputId"></label>
    </>
  );
};
export default Input;
