import { useState, useEffect, useRef } from "react";

import { Routes, Route } from "react-router-dom";

import All from "./components/All";
import Active from "./components/Active";
import Completed from "./components/Completed";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  // Sample data
  const data = {
    tasks: [
      {
        name: "Doing coding challenges",
        active: true,
        completed: false,
      },
      {
        name: "Buying groceries",
        active: true,
        completed: false,
      },
      {
        name: "Using the new React features",
        active: true,
        completed: false,
      },
    ],
    actives: [
      {
        name: "Drinking coffee",
        active: true,
        completed: false,
      },
      {
        name: "Eating lunch",
        active: true,
        completed: false,
      },
    ],
    completeds: [
      {
        name: "Transferring money",
        active: false,
        completed: true,
      },
      {
        name: "Cleaning the house",
        active: false,
        completed: true,
      },
      {
        name: "Taking a shower",
        active: false,
        completed: true,
      },
    ],
  };

  // State
  const [tasks, setTasks] = useState([]);
  const [actives, setActives] = useState([]);
  const [completeds, setCompleteds] = useState([]);

  // useRef to check if the localStorage is initialized to prevent empty localStorage
  const isInitialized = useRef(false);

  // Function to handle load LocalStorage
  const handleLoadLocalStorage = (key) => {
    // Check if localStorage is empty and initialize it
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  // Function to handle save LocalStorage
  const handleSaveLocalStorage = (key, name) => {
    localStorage.setItem(name, JSON.stringify(key));
  };

  // Load tasks from localStorage
  useEffect(() => {
    // Load data from localStorage
    setTasks(handleLoadLocalStorage("tasks"));
    setActives(handleLoadLocalStorage("actives"));
    setCompleteds(handleLoadLocalStorage("completeds"));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    // Save tasks to localStorage only when state changes
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
        <Navbar setTasks={setTasks} setActives={setActives} />
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
