import React, { useEffect, useState } from "react";
import TasksContext from "./TasksContext";
import { todoTasks } from "./Tasks";
import { getTasks } from "../../services/apiTaskData";

const API__URL = "http://localhost:7000";
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
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(today.toLocaleDateString("en-US", options));
  useEffect(
    function () {
      async function getTasks() {
        try {
          setIsLoading(true);
          const res = await fetch(`${API__URL}/tasks`);

          if (!res.ok) throw Error("Could not load tasks");

          const data = await res.json();
          setTasks(data);
        } catch {
          alert("there was an error loading data....");
        } finally {
          setIsLoading(false);
        }
      }
      getTasks();
    },
    [tasks]
  );

  async function deleteTask(id) {
    try {
      await fetch(`${API__URL}/tasks`, {
        method: "DELETE",
      });
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <TasksContext.Provider
      value={{
        date,
        setDate,
        tasks,
        setTasks,
        isLoading,
        todayDate,
        todoTasks,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
