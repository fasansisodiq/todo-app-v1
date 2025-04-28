import { useTasks } from "./useTasks";

export function useTaskNumberFetcher(taskClass) {
  const { taskData } = useTasks();
  return taskData?.filter(
    (task) => task.completed === false && task.taskClass === taskClass
  ).length;
}
