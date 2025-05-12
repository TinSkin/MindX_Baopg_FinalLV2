import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import ButtonAdd from "./ButtonAdd";

function Navbar({ tasks, setTasks, setActives }) {
  // Lấy location hiện tại để xác định tab nào đang được chọn
  const location = useLocation();

  const [newTask, setNewTask] = useState("");

  // Function để thêm task mới
  const handleAddTask = (e) => {
    e.preventDefault();

    // Kiểm tra xem task có rỗng hay không
    if (newTask.trim() === "") {
      alert("Please enter a task");
      return;
    }

    // Tạo id mới cho task, nếu tasks có task thì lấy id lớn nhất + 1, nếu không thì id = 1
    const nextId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

    const newTaskObj = {
      id: nextId,
      name: newTask,
      active: true,
      completed: false,
    };

    // console.log(newTaskObj); // Check task mới đã được tạo chưa

    // Thêm task mới vào tab All & Active
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
