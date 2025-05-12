import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import ButtonAdd from "./ButtonAdd";

function Navbar({ setTasks, setActives }) {
  // Get the current route
  const location = useLocation();

  const [newTask, setNewTask] = useState("");

  // Function to handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();

    // Check if the input is empty, if so, show an alert
    if (newTask.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTaskObj = {
      name: newTask,
      active: true,
      completed: false,
    };

    // Add the new task to the tasks and actives state
    setTasks((prev) => [...prev, newTaskObj]);
    setActives((prev) => [...prev, newTaskObj]);

    setNewTask("");
  };

  return (
    <>
      <div className="flex justify-around items-center border-b border-gray-300 mb-6 px-6 pt-4 ">
        {/* Tab All */}
        <Link
          to="/"
          className={`basis-1/5 border-b-4 py-3 pb-2 font-bold ${
            location.pathname === "/"
              ? "border-blue-500"
              : "border-transparent hover:border-blue-500"
          }`}
        >
          All
        </Link>

        {/* Tab Active */}
        <Link
          to="/active"
          className={`basis-1/5 border-b-4 py-3 pb-2 font-bold ${
            location.pathname === "/active"
              ? "border-blue-500"
              : "border-transparent hover:border-blue-500"
          }`}
        >
          Active
        </Link>

        {/* Tab Completed */}
        <Link
          to="/completed"
          className={`basis-1/5 border-b-4 py-3 pb-2 font-bold ${
            location.pathname === "/completed"
              ? "border-blue-500"
              : "border-transparent hover:border-blue-500"
          }`}
        >
          Completed
        </Link>
      </div>
      {/* Conditionally render SearchInput & ButtonAdd */}
      {location.pathname !== "/completed" && (
        <div className="flex justify-between items-center mb-4">
          <SearchInput newTask={newTask} setNewTask={setNewTask} />
          <ButtonAdd handleAddTask={handleAddTask} />
        </div>
      )}
    </>
  );
}

export default Navbar;
