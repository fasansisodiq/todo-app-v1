import ReusableTrashTaskItem from "../../utils/ReusableTrashTaskItem";

import { MdDelete, MdRestoreFromTrash } from "react-icons/md";

function TrashedTaskItem({ task }) {
  return (
    <div>
      <ReusableTrashTaskItem task={task} />;
    </div>
  );
}

export default TrashedTaskItem;
