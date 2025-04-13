import React, { useState } from "react";
import TasksContext from "./TasksContext";
import { todoTasks } from "./Tasks";

const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const today = new Date();
const todayDate = today.toLocaleDateString("en-US");

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const [date, setDate] = useState(today.toLocaleDateString("en-US", options));
  return (
    <TasksContext.Provider
      value={{ date, setDate, tasks, setTasks, todayDate, todoTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
}
