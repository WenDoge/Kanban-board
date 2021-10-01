import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import data from "./mock-data.json";

function App() {
  localStorage.clear();
  let usedData = localStorage.getItem("hello")
    ? JSON.parse(localStorage.getItem("hello"))
    : data;
  const [dataList, setDataList] = useState(usedData);
  localStorage.setItem("hello", JSON.stringify(dataList));
  return (
    <>
      <Header />
      <Main dataList={dataList} setDataList={setDataList} />
      <Footer
        taskCount={[dataList.inprogress.taskCount, dataList.finished.taskCount]}
      />
    </>
  );
}
export default App;
