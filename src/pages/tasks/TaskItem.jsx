import { useState } from "react";
import TaskOperations from "../../ui/taskOperations/TaskOperations";
import ReusableTaskItem from "../../utils/ReusableTaskItem";

function TaskItem({ task, idx }) {
  const [expandedId, setExpandedId] = useState(null);
  return (
    <ReusableTaskItem
      task={task}
      idx={idx}
      expandedId={expandedId}
      setExpandedId={setExpandedId}
    >
      {/* Task Operations */}
      <TaskOperations
        description={task.description}
        title={task.title}
        task={task}
      />
    </ReusableTaskItem>
  );
}

export default TaskItem;
