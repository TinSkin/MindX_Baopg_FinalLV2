import React from "react";

function SearchInput({ newTask, setNewTask }) {
  return (
    <div className="border-2 border-solid border-gray-200 rounded-md">
      <input
        type="text"
        placeholder="add details"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="w-full box-border pl-3 pr-[14rem] py-3"
      />
    </div>
  );
}

export default SearchInput;
