import React from "react";
import Task from "../task/task";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./main.css";
import TaskWindow from "../taskWindow/taskWindow";

const Main = (props) => {
  const { setDataList, dataList } = props;
  const { backlog, ready, inprogress, finished } = dataList;

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

  return (
    <main className="main-content">
      <div className="container main-container">
        <Router>
          <Switch>
            <Route path="/" exact component={() => tasks} />
            <Route path={`/:taskID`}>
              <TaskWindow {...props} />
            </Route>
          </Switch>
        </Router>
      </div>
    </main>
  );
};

export default Main;
