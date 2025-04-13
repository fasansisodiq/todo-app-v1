import { useContext } from "react";
import TasksContext from "./TasksContext";

export function useTasks() {
  const content = useContext(TasksContext);
  if (!content) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return content;
}
