import React from "react";
import { RxTrash } from "react-icons/rx";

function Completed({ tasks, setTasks, setActives, completeds, setCompleteds }) {
  // Function để xóa task theo id
  const handleDelete = (taskId) => {
    // Xóa task khỏi tab Completed
    const updatedCompleteds = completeds.filter((task) => task.id !== taskId);
    setCompleteds(updatedCompleteds);

    // Xóa task khỏi tab All
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    // Lưu vào localStorage nếu cần
    localStorage.setItem("completeds", JSON.stringify(updatedCompleteds));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Function để xóa hết task trong tab Completed
  const handleDeleteAll = () => {
    // Xóa hết completeds
    setCompleteds([]);

    // Xóa hết task có active = false trong tasks
    const updatedTasks = tasks.filter((task) => task.active === true);
    setTasks(updatedTasks);

    // Lưu vào localStorage nếu cần
    localStorage.setItem("completeds", JSON.stringify([]));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Function để toggle task theo id (Từ active:false completed:true sang active:true completed:false)
  const handleToggleTask = (taskId) => {
    // Cập nhật lại tab All
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          active: !task.active,
          completed: !task.completed,
        };
      }
      return task;
    });

    // console.log(updatedTasks); // Check xem task đã được cập nhật chưa
    setTasks(updatedTasks);

    // Cập nhật lại tab Active (lọc lại task active)
    const updatedActives = updatedTasks.filter((task) => task.active === true);
    setActives(updatedActives);

    // Cập nhật lại tab Completed (lọc lại task completed)
    const updatedCompleteds = updatedTasks.filter(
      (task) => task.completed === true
    );
    setCompleteds(updatedCompleteds);

    // Lưu vào localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("actives", JSON.stringify(updatedActives));
    localStorage.setItem("completeds", JSON.stringify(updatedCompleteds));
  };

  return (
    <div className="space-y-5">
      <ul className="space-y-3 text-left pl-0">
        {completeds.map((task) => (
          <li
            key={task.id}
            className="font-semibold line-through flex items-center mt-4"
          >
            <input
              placeholder=""
              type="checkbox"
              onChange={() => handleToggleTask(task.id)}
              className="mr-2 w-4 h-4 border-gray-300 rounded focus:ring-blue-500 accent-blue-500 peer"
              defaultChecked
            />{" "}
            {task.name}
            <button
              type="button"
              onClick={() => handleDelete(task.id)}
              className="text-gray-500 py-1 px-3 rounded text-lg ml-auto"
            >
              <RxTrash className="mr-2" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleDeleteAll}
        className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-5 rounded text-sm mt-2 ml-auto flex items-center"
      >
        <RxTrash className="mr-2" /> delete all
      </button>
    </div>
  );
}

export default Completed;
