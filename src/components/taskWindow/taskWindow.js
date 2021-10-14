import React from "react";
import "./taskWindow.css";
import Button from "../button/button";
import { useRouteMatch, Link } from "react-router-dom";

const TaskWindow = (props) => {
  const match = useRouteMatch();
  const { taskID } = match.params;
  const { dataList, setDataList } = props;
  const { backlog, ready, inprogress, finished } = dataList;

  const renderDetails = (section, index) => {
    return (
      <div className="window-container">
        <div className="window-title">
          <h2 className="window-title__item">{section.issues[index].name}</h2>
          <Link to="/">
            <Button className="window-button" />
          </Link>
        </div>
        <textarea
          readOnly={section.title === "backlog" ? false : true}
          placeholder="Task description..."
          className="window__item"
          onChange={
            section.title === "backlog"
              ? (e) => {
                  setDataList((prevState) => {
                    const list = { ...prevState };
                    list[section.title].issues[index].text = e.target.value;
                    return list;
                  });
                  return;
                }
              : null
          }
          value={section.issues[index].text}
        ></textarea>
      </div>
    );
  };

  const renderEmptyState = () => {
    return (
      <div className="window-container">
        <div className="window-title">
          <h2 className="window-title__item">
            task with ID {taskID} was not found
          </h2>
          <Link to="/">
            <Button className="window-button" />
          </Link>
        </div>
      </div>
    );
  };
  const createWindowedTasks = () => {
    const valueSection = /^b/.test(taskID)
      ? backlog
      : /^r/.test(taskID)
      ? ready
      : /^i/.test(taskID)
      ? inprogress
      : finished;
    const valueIndex = valueSection.issues.findIndex(
      (obj) => obj.id === taskID
    );
    const task = valueSection.issues.find((task) => task.id === taskID);
    return task ? renderDetails(valueSection, valueIndex) : renderEmptyState();
  };
  return createWindowedTasks();
};
export default TaskWindow;
