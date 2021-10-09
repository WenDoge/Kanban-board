import React, { useState, useEffect, useRef } from "react";
import "./task.css";
import Button from "../button/button";
import Input from "../input/input";
import DropDown from "../dropDown/dropDown";
import { Link } from "react-router-dom";

const addCard = (
  <>
    <svg
      className="plus"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 6H8V1C8 0.448 7.552 0 7 0C6.448 0 6 0.448 6 1V6H1C0.448 6 0 6.448 0 7C0 7.552 0.448 8 1 8H6V13C6 13.552 6.448 14 7 14C7.552 14 8 13.552 8 13V8H13C13.552 8 14 7.552 14 7C14 6.448 13.552 6 13 6Z"
        fill="#5E6C84"
      />
    </svg>
    <span>Add Card</span>
  </>
);

const Task = (props) => {
  const { data, dataList, setDataList, dropData, showInput } = props;
  const [states, setStates] = useState({
    toggleInput: false,
    setButton: false,
    inputValue: "",
    btnValue: "",
    btnDisable: true,
  });
  const { toggleInput, setButton, inputValue, btnValue, btnDisable } = states;
  const cardText = props.data.issues.map((str) => {
    return (
      <Link to={`/${str.id}`} key={str.id}>
        <li className="task-content__item">{str.name}</li>
      </Link>
    );
  });
  const containerRef = useRef(null);

  const setTask = (value, data, dropData) => {
    let count = data.count;
    let hasDublicates = data.issues.some((str) => str.name === value);
    if (hasDublicates) alert("Tasks must be unique!");
    else {
      let newData = {
        ...data,
        issues: [
          ...data.issues,
          { id: `${data.title}${data.count}`, name: value, text: "" },
        ],
        // taskCount: data.taskCount + 1,
        count: count + 1,
      };

      if (dropData) {
        const dataIndex = dropData.issues.findIndex(
          (str) => str.name === value
        );
        newData = {
          ...data,
          issues: [
            ...data.issues,
            {
              id: `${data.title}${data.count}`,
              name: value,
              text: dropData.issues[dataIndex].text,
            },
          ],
          // taskCount: data.taskCount + 1,
          count: count + 1,
        };
        const newDropData = dropData.issues.filter(
          (word, index) => index !== dataIndex
        );

        setDataList({
          ...dataList,
          [dropData.title]: {
            ...dropData,
            issues: newDropData,
            // taskCount: dropData.taskCount - 1,
          },
          [data.title]: newData,
        });
        return;
      }
      setDataList({
        ...dataList,
        [data.title]: newData,
      });
      return;
    }
  };
  const handleClick = () => {
    if (setButton && inputValue) {
      setTask(inputValue, data);
      setStates({
        ...states,
        inputValue: "",
        toggleInput: !toggleInput,
        setButton: !setButton,
      });
    } else if (setButton && !showInput) {
      setTask(btnValue, data, dropData);
      setStates({ ...states, btnValue: "", setButton: !setButton });
    } else {
      setStates({
        ...states,
        toggleInput: !toggleInput,
        setButton: !setButton,
      });
    }
  };
  const onInputChange = (e) => {
    const { value } = e.target;
    setStates({ ...states, inputValue: value });
  };
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setStates({ ...states, toggleInput: false, setButton: false });
    }
  };
  const disabledButton = () => {
    if (!inputValue && setButton) {
      if (btnValue !== "") {
        setStates({ ...states, btnDisable: false });
        return;
      }
      setStates({ ...states, btnDisable: true });
      return;
    } else if (dropData) {
      if (!dropData.issues.length) {
        setStates({ ...states, btnDisable: true });
        return;
      }
    }
    setStates({ ...states, btnDisable: false });
    return;
  };
  useEffect(disabledButton, [inputValue, setButton, btnValue]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={containerRef} className="task">
      <span>{props.title || data.title}</span>
      <div className="task-content">
        <ul>{cardText}</ul>
        {showInput ? (
          <div className="task__input">
            <Input
              value={inputValue}
              onChange={onInputChange}
              className={`input ${toggleInput ? "" : "hidden"}`}
              labelClassName={toggleInput ? "" : "hidden"}
            />
          </div>
        ) : (
          <DropDown
            data={dropData.issues}
            setBtn={(value) => {
              setStates({ ...states, btnValue: value });
            }}
            btnValue={() => btnValue}
            className={setButton ? "" : "hidden"}
          />
        )}
        <Button
          className="task-button"
          name={setButton ? "Submit" : "Add card"}
          onClick={handleClick}
          disabled={btnDisable}
        >
          {setButton ? "Submit" : addCard}
        </Button>
      </div>
    </div>
  );
};
export default Task;
