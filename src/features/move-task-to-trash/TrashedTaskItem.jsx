import ReusableTrashTaskItem from "../../utils/ReusableTrashTaskItem";

function TrashedTaskItem({ task }) {
  return (
    <div>
      <ReusableTrashTaskItem task={task} />;
    </div>
  );
}

export default TrashedTaskItem;
