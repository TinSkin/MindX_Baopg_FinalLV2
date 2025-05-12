import React from "react";

function Active({ tasks, setTasks, actives, setActives, setCompleteds }) {
  // Function để toggle task theo id (Từ active:true completed:false sang active:false completed:true)
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
    <div className="space-y-2">
      <ul className="space-y-3 text-left pl-0">
        {actives.map((task) => (
          <li key={task.id} className="font-semibold flex items-center mt-4">
            <input
              placeholder=""
              type="checkbox"
              onChange={() => handleToggleTask(task.id)}
              className="mr-2 w-4 h-4 border-gray-300 rounded focus:ring-blue-500 accent-blue-500"
            />
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Active;
