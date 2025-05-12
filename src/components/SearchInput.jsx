import React from "react";

function SearchInput({ newTask, setNewTask }) {
  return (
    <div className="border-2 border-solid border-gray-300 rounded-lg">
      <input
        type="text"
        placeholder="add details"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="w-full box-border pl-3 pr-[14rem] py-3 rounded-lg focus:outline-none"
      />
    </div>
  );
}

export default SearchInput;
