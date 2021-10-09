import React from "react";
import Task from "../task/task";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./main.css";
import TaskWindow from "../taskWindow/taskWindow";

const Main = (props) => {
  const { setDataList, dataList } = props;
  const { backlog, ready, inprogress, finished } = dataList;
  const cardIDs = (str) => {
    return str.issues.map((value) => value.id);
  };
  const backlogIDs = cardIDs(backlog);
  const readyIDs = cardIDs(ready);
  const inprogressIDs = cardIDs(inprogress);
  const finishedIDs = cardIDs(finished);
  const allIDs = backlogIDs.concat(readyIDs, inprogressIDs, finishedIDs);
  const tasks = (
    <>
      <Task
        title="Backlog"
        data={backlog}
        dataList={dataList}
        setDataList={setDataList}
        showInput={true}
      />
      <Task
        title="Ready"
        data={ready}
        dataList={dataList}
        setDataList={setDataList}
        dropData={backlog}
      />
      <Task
        title="In Progress"
        data={inprogress}
        dataList={dataList}
        setDataList={setDataList}
        dropData={ready}
      />
      <Task
        title="Finished"
        data={finished}
        dataList={dataList}
        setDataList={setDataList}
        dropData={inprogress}
      />
    </>
  );
  const createWindowedTasks = allIDs.map((value) => {
    const valueSection = /^b/.test(value)
      ? backlog
      : /^r/.test(value)
      ? ready
      : /^i/.test(value)
      ? inprogress
      : finished;
    const valueIndex = valueSection.issues.findIndex((obj) => obj.id === value);

    return (
      <Route
        key={value}
        path={`/${value}`}
        render={(props) => (
          <TaskWindow
            readOnly={
              valueSection.title === "backlog" || "ready" ? false : true
            }
            title={valueSection.issues[valueIndex].name}
            text={valueSection.issues[valueIndex].text}
            onClick={() => {
              props.history.push("/");
            }}
            onChange={
              valueSection.title === "backlog" || "ready"
                ? (e) => {
                    setDataList((prevState) => {
                      const list = { ...prevState };
                      list[valueSection.title].issues[valueIndex].text =
                        e.target.value;
                      return list;
                    });
                    return;
                  }
                : null
            }
          />
        )}
      />
    );
  });

  return (
    <main className="main-content">
      <div className="container main-container">
        <Router>
          <Switch>
            <Route path="/" exact component={() => tasks} />
            {createWindowedTasks}
            <Route
              path="*"
              component={() => <div className="error">Error 404</div>}
            />
          </Switch>
        </Router>
      </div>
    </main>
  );
};

export default Main;
