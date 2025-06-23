import TrashedTaskOperations from "./TrashedTaskOperations";
import ReusableTaskItem from "../../utils/ReusableTaskItem";

function TrashedTaskItem({ task, idx }) {
  console.log(task);
  return (
    <ReusableTaskItem task={task} idx={idx}>
      <TrashedTaskOperations
        description={task?.description}
        title={task?.title}
        task={task}
      />
    </ReusableTaskItem>
  );
}

export default TrashedTaskItem;
