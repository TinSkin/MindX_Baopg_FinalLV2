import { useState, useEffect, useRef } from "react";

import { Routes, Route } from "react-router-dom";

import All from "./components/All";
import Active from "./components/Active";
import Completed from "./components/Completed";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  // Sample data ( dữ liệu mẫu )
  const data = {
    tasks: [
      {
        id: 1,
        name: "Do coding challenges",
        active: true,
        completed: false,
      },
      {
        id: 2,
        name: "Do coding challenges",
        active: true,
        completed: false,
      },
      {
        id: 3,
        name: "Do coding challenges",
        active: false,
        completed: true,
      },
      {
        id: 4,
        name: "Task done",
        active: false,
        completed: true,
      },
      {
        id: 5,
        name: "Task done",
        active: false,
        completed: true,
      },
      {
        id: 6,
        name: "Task done",
        active: false,
        completed: true,
      },
    ],
    actives: [
      {
        id: 1,
        name: "Do coding challenges",
        active: true,
        completed: false,
      },
      {
        id: 2,
        name: "Do coding challenges",
        active: true,
        completed: false,
      },
    ],
    completeds: [
      {
        id: 3,
        name: "Do coding challenges",
        active: false,
        completed: true,
      },
      {
        id: 4,
        name: "Task done",
        active: false,
        completed: true,
      },
      {
        id: 5,
        name: "Task done",
        active: false,
        completed: true,
      },
      {
        id: 6,
        name: "Task done",
        active: false,
        completed: true,
      },
    ],
  };

  // State
  const [tasks, setTasks] = useState([]);
  const [actives, setActives] = useState([]);
  const [completeds, setCompleteds] = useState([]);

  // useRef để check xem đã khởi tạo localStorage hay chưa
  const isInitialized = useRef(false);

  // Function để load LocalStorage
  const handleLoadLocalStorage = (key, sampleValue, setState) => {
    // Kiểm tra xem key có tồn tại trong localStorage hay không
    /* const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : []; */

    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(sampleValue));
      setState(sampleValue);
    } else {
      setState(JSON.parse(data));
    }
  };

  // Function để lưu LocalStorage
  const handleSaveLocalStorage = (key, name) => {
    localStorage.setItem(name, JSON.stringify(key));
  };

  // Lấy dữ liệu từ localStorage khi component mount
  useEffect(() => {
    /* const sampleDataLocalStorage = (key, sampleValue, setState) => {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(sampleValue));
        setState(sampleValue);
      } else {
        setState(JSON.parse(data));
      }
    };

    sampleDataLocalStorage("tasks", data.tasks, setTasks);
    sampleDataLocalStorage("actives", data.actives, setActives);
    sampleDataLocalStorage("completeds", data.completeds, setCompleteds); */

    handleLoadLocalStorage("tasks", data.tasks, setTasks);
    handleLoadLocalStorage("actives", data.actives, setActives);
    handleLoadLocalStorage("completeds", data.completeds, setCompleteds);

    //Load data from localStorage
    /* setTasks(handleLoadLocalStorage("tasks"));
    setActives(handleLoadLocalStorage("actives"));
    setCompleteds(handleLoadLocalStorage("completeds")); */
  }, []);

  // Lưu dữ liệu vào localStorage khi state thay đổi
  useEffect(() => {
    if (isInitialized.current) {
      handleSaveLocalStorage(tasks, "tasks");
      handleSaveLocalStorage(actives, "actives");
      handleSaveLocalStorage(completeds, "completeds");
    } else {
      isInitialized.current = true;
    }
  }, [tasks, actives, completeds]);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-xl w-full p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-4xl font-bold mb-10">#todo</h1>
        <Navbar tasks={tasks} setTasks={setTasks} setActives={setActives} />
        <Routes>
          <Route
            path="/"
            element={
              <All
                tasks={tasks}
                setTasks={setTasks}
                setActives={setActives}
                setCompleteds={setCompleteds}
              />
            }
          />
          <Route
            path="/active"
            element={
              <Active
                tasks={tasks}
                setTasks={setTasks}
                actives={actives}
                setActives={setActives}
                setCompleteds={setCompleteds}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <Completed
                tasks={tasks}
                setTasks={setTasks}
                setActives={setActives}
                completeds={completeds}
                setCompleteds={setCompleteds}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
