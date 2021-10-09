import React, { useState, useEffect, useRef } from "react";
import "./dropDown.css";

const DropDown = (props) => {
  const [handleToggle, setHandleToggle] = useState(false);
  // const { open } = handleToggle;
  const containerRef = useRef(null);
  const handleButtonClick = () => {
    setHandleToggle(!handleToggle);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setHandleToggle(false);
      return;
    }
  };
  const dropDownItemClick = (e) => {
    const { innerText } = e.target;
    setHandleToggle(false);
    props.setBtn(innerText);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className={`dropdown ${props.className}`}>
      <div className="container dropdown-container" ref={containerRef}>
        <button
          type="button"
          className="button dropdown-button"
          onClick={handleButtonClick}
        >
          <div>{props.btnValue(handleToggle)}</div>
          <div
            className={`dropdown-button__item${
              handleToggle ? " dropdown__open" : ""
            }`}
          ></div>
        </button>
        {handleToggle && (
          <div className="dropdown__item">
            <ul>
              {props.data.map((str) => {
                return (
                  <li
                    className="dropdown__item-text"
                    key={str.id}
                    onClick={dropDownItemClick}
                  >
                    {str.name}
                  </li>
                );
              })}
            </ul>
            {props.children}
          </div>
        )}
      </div>
    </div>
  );
};
DropDown.defaultProps = { className: "" };
export default DropDown;
