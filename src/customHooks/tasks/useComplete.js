import { useTasks } from "./useTasks";

export function useComplete() {
  const { setCompleted } = useTasks();
  const completedTask = (taskId) => {
    setCompleted((prevCompleted) =>
      prevCompleted.map((task) =>
        task.id === taskId ? { ...task, completed: !task.is_completed } : task
      )
    );
  };
  return {
    completedTask,
  };
}
