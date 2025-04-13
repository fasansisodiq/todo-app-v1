import { useTasks } from "./useTasks";

export function useTaskNumberFetcher(taskClass) {
  const { tasks } = useTasks();
  return tasks.filter((task) => task.taskClass === taskClass).length;
}
