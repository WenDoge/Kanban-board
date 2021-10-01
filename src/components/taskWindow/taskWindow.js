import React from "react";
import "./taskWindow.css";
import Button from "../button/button";

const TaskWindow = (props) => {
  return (
    <div className="window-container">
      <div className="window-title">
        <h2 className="window-title__item">{props.title}</h2>
        <Button className="window-button" onClick={props.onClick} />
      </div>
      <textarea
        readOnly={props.readOnly}
        placeholder="Task description..."
        className="window__item"
        onChange={props.onChange}
        value={props.text}
      ></textarea>
    </div>
  );
};
export default TaskWindow;
