import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import data from "./mock-data.json";

function App() {
  // localStorage.clear();
  let usedData = localStorage.getItem("hello")
    ? JSON.parse(localStorage.getItem("hello"))
    : data;
  const [dataList, setDataList] = useState(usedData);
  useEffect(
    () => localStorage.setItem("hello", JSON.stringify(dataList)),
    [dataList]
  );
  return (
    <>
      <Header />
      <Main dataList={dataList} setDataList={setDataList} />
      <Footer
        taskCount={[
          dataList.backlog.issues.length,
          dataList.finished.issues.length,
        ]}
      />
    </>
  );
}
export default App;
