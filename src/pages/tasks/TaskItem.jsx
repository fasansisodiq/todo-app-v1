import TaskOperations from "../../ui/taskOperations/TaskOperations";
import ReusableTaskItem from "../../utils/ReusableTaskItem";

function TaskItem({ task, idx }) {
  console.log(task);
  return (
    <ReusableTaskItem task={task} idx={idx}>
      <TaskOperations
        description={task?.description}
        title={task?.title}
        task={task}
      />
    </ReusableTaskItem>
  );
}

export default TaskItem;
