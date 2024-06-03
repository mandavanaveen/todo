import React, { useState, useEffect } from "react";
import "./App.css";
import deleteicon from "./delete.svg";
import "@fontsource/josefin-sans";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [lastUsedUniqueId, setLastUsedUniqueId] = useState(0);

  useEffect(() => {
    const savedTodoItems = JSON.parse(localStorage.getItem("todoitems")) || [];
    setTodoItems(savedTodoItems);
    setLastUsedUniqueId(
      Math.max(...savedTodoItems.map((todo) => todo.uniqueid), 0)
    );
  }, []);

  const handleAddClick = () => {
    if (inputValue === "") {
      alert("Enter valid text");
      return;
    }
    const newTodo = {
      todo: inputValue,
      uniqueid: lastUsedUniqueId + 1,
      isChecked: false,
    };
    const updatedTodoItems = [...todoItems, newTodo];
    setTodoItems(updatedTodoItems);
    setInputValue("");
    setLastUsedUniqueId(lastUsedUniqueId + 1);
  };

  const handleSaveClick = () => {
    localStorage.setItem("todoitems", JSON.stringify(todoItems));
  };

  const handleCheckboxChange = (id) => {
    const updatedTodoItems = todoItems.map((todo) => {
      if (todo.uniqueid === id) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });
    setTodoItems(updatedTodoItems);
  };

  const handleDeleteClick = (id) => {
    const updatedTodoItems = todoItems.filter((todo) => todo.uniqueid !== id);
    setTodoItems(updatedTodoItems);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-[#094d79] via-[#18905d] to-[#00d4ff]">
      <div className="font-inter absolute flex flex-col gap-6 p-5 bg-white rounded-md drop-shadow-xl">
        <h1 className="flex  text-3xl">Todo List Application</h1>
        <h1 className="text-lg">CREATE TASK</h1>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-2/3 h-10 border-[1px] rounded-md border-gray-950"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What to do next"
          />
          <button
            onClick={handleAddClick}
            className=" text-white bg-[#4c63b6] w-10 h-10 text-4xl rounded-[4px]"
          >
            +
          </button>
          <button
            onClick={handleSaveClick}
            className="text-white bg-[#4c63b6] w-20 h-10 text-lg rounded-[4px]"
          >
            SAVE
          </button>
        </div>
        <h1 className="create">MY TASK</h1>
        <ul className="flex-col flex gap-5">
          {todoItems.map((todo) => (
            <li
              key={todo.uniqueid}
              className="flex gap-4 "
              id={`todo${todo.uniqueid}`}
            >
              <input
                type="checkbox"
                id={`checkbox${todo.uniqueid}`}
                checked={todo.isChecked}
                className=" w-5 h-5 mt-5 mb-5"
                onChange={() => handleCheckboxChange(todo.uniqueid)}
              />
              <div className="w-fit flex justify-between items-center border-[5px] border-t-0 border-b-0 border-r-0 border-solid border-[#096f92] rounded-[4px] bg-[#e6f6ff]">
                <label
                  htmlFor={`checkbox${todo.uniqueid}`}
                  id={`label${todo.uniqueid}`}
                  className={`min-w-[230px] m-5 ${
                    todo.isChecked ? "checked" : ""
                  }`}
                >
                  {todo.todo}
                </label>
                <div
                  className="flex pr-5"
                  onClick={() => handleDeleteClick(todo.uniqueid)}
                >
                  <img className="w-6 h-6" src={deleteicon} alt="delete"></img>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
