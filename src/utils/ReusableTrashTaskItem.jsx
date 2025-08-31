import { useTasks } from "../customHooks/tasks/useTasks";
import { MdCancel, MdDelete, MdRestoreFromTrash } from "react-icons/md";
import AddSubTaskModal from "../features/add-subtasks/AddSubTaskModal";
import TaskOperationModal from "./TaskOperationModal";
import TaskItem from "./TaskItem";

function ReusableTrashTaskItem({ task }) {
  const {
    taskModal,
    restoreTrashTask,
    deleteTask,
    handleTaskModalClose,
    targetLabel,
    setTargetLabel,
  } = useTasks();

  // Restore trashed task handler
  const handleRestoreTrashTask = async () => {
    await restoreTrashTask(task.id, task);
    // console.log("restored task", task);
  };

  // Permanent delete trashed task handler
  const handleDelete = async () => {
    await deleteTask(task.id);
  };

  function handleTrashTaskOperationModal(label) {
    if (label === "restore") {
      handleRestoreTrashTask();
    } else if (label === "permanent delete") {
      handleDelete();
    } else {
      setTargetLabel("");
    }
  }
  const trashTaskOperationLabel = [
    {
      id: "restore",
      icon: <MdRestoreFromTrash />,
      label: "restore",
    },
    {
      id: "delete",
      icon: <MdDelete />,
      label: "permanent delete",
    },
    {
      id: "cancel",
      icon: <MdCancel />,
      label: "Cancel",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <>
        <TaskItem
          setTargetLabel={setTargetLabel}
          operationLabel={trashTaskOperationLabel}
          task={task}
        />
      </>
      {/* Modal for task actions */}
      <TaskOperationModal
        taskModal={taskModal}
        onCloseTaskOperationModal={handleTaskModalClose}
        task={task}
        submitLabel={targetLabel}
        onSave={() => {
          handleTrashTaskOperationModal(targetLabel);
          handleTaskModalClose();
        }}
      />
      <AddSubTaskModal task={task} />
    </div>
  );
}

export default ReusableTrashTaskItem;
