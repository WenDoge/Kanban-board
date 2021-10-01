import React, { useState, useEffect } from "react";
import "./footer.css";
const Footer = (props) => {
  const { taskCount } = props;
  const [value, setValue] = useState(taskCount);
  useEffect(() => setValue(taskCount));
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-tasks">
          <span>Active tasks: {value[0]}</span>
          <span>Completed tasks: {value[1]}</span>
        </div>
        <div className="footer-info">Kanban Board by Dmitry Vasilyev, 2021</div>
      </div>
    </footer>
  );
};
export default Footer;
