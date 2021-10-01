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
    const re = /[0-9]+/;
    const reValue = re.exec(value);

    const someVal = /^b/.test(value)
      ? backlog
      : /^r/.test(value)
      ? ready
      : /^i/.test(value)
      ? inprogress
      : finished;
    return (
      <Route
        key={value}
        path={`/${value}`}
        render={(props) => (
          <TaskWindow
            readOnly={someVal.title === "backlog" || "ready" ? false : true}
            title={someVal.issues[reValue].name}
            text={someVal.issues[reValue].text}
            onClick={() => {
              props.history.push("/");
            }}
            onChange={
              someVal.title === "backlog" || "ready"
                ? (e) => {
                    setDataList((prevState) => {
                      const list = { ...prevState };
                      list[someVal.title].issues[reValue].text = e.target.value;
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
