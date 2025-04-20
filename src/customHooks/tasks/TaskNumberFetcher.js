import { useTasks } from "./useTasks";

export function useTaskNumberFetcher(taskClass) {
  const { tasks } = useTasks();
  return tasks.filter(
    (task) => task.completed === "no" && task.taskClass === taskClass
  ).length;
}
