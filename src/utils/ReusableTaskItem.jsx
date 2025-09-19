import { FaCheckCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdCancel, MdPending } from "react-icons/md";
import { SiProgress } from "react-icons/si";
import { useNavigate } from "react-router";

import TaskOperationModal from "./TaskOperationModal";
import { useTasks } from "../customHooks/tasks/useTasks";
import { useOperation } from "../customHooks/operation/useOperation";
import { TbSubtask } from "react-icons/tb";
import AddSubTaskModal from "../features/add-subtasks/AddSubTaskModal";
import TaskItem from "./TaskItem";

function ReusableTaskItem({ task }) {
  const navigate = useNavigate();
  const {
    updateTask,
    trashTask,
    toast,
    taskModal,
    handleTaskModalClose,
    handleTaskMenuClose,
    targetLabel,
    setTargetLabel,
  } = useTasks();
  const { onOpenSubTask } = useOperation();

  //function to mark task as complete or incompelte
  async function handleToggleMarkAsComplete() {
    await updateTask(task.id, {
      ...task,
      completed: !task.completed,
      status: task.completed === false ? "completed" : "in progress",
      pending: false,
    });

    task.completed === false
      ? toast(`Congratulations!  ${task.title} task is now completed`)
      : toast(`Task ${task.title} is now in progress`);

    task.completed === false
      ? navigate(`/layout/completed`)
      : navigate(`/layout/${task.taskClass}`);
    // console.log(task.completed);
  }

  //function to mark task as pending and unmark as pending
  async function handleToggleMarkAsPending() {
    await updateTask(task.id, {
      ...task,
      pending: !task.pending,
      status: task.pending === false ? "pending" : "in progress",
      completed: false,
    });
    task.pending === false
      ? navigate(`/layout/pending`)
      : navigate(`/layout/${task.taskClass}`);

    task.pending === false
      ? toast(`Task ${task.title} is now pending`)
      : toast(`Task ${task.title} is now in progress`);
  }

  //function to trashed task
  async function handleTrashTask() {
    await trashTask(task.id, task);
    navigate(`/layout/trash`);
  }

  function handleTaskOperationModal(label) {
    if (label === "Mark as incomplete" || label === "Mark as complete") {
      handleToggleMarkAsComplete();
    } else if (label === "Unmark as pending" || label === "Mark as pending") {
      handleToggleMarkAsPending();
    } else if (label === "Move to trash") {
      handleTrashTask();
    } else if (label === "Cancel") {
      handleTaskMenuClose();
    } else if (label === "Add Subtask") {
      onOpenSubTask();
      handleTaskModalClose();
    } else if (label === "See Progress") {
      console.log(label === "See Progress");
      console.log(label);
    } else {
      null;
    }
  }

  const taskOperationsLabel = [
     {
       id: "view",
       icon: <FcViewDetails />,
       label: "  View Details",
      
        
     },
    {
      id: "subtask",
      icon: <TbSubtask />,
      label: "Add Subtask",
    },
    {
      id: "progress",
      icon: <SiProgress />,
      label: "See Progress",
    },
    {
      id: "complete",
      icon: <FaCheckCircle />,
      label:
        task.completed === true ? "Mark as incomplete" : "Mark as complete",
    },
    {
      id: "pending",
      icon: <MdPending />,
      label: task.pending === true ? "Unmark as pending" : "Mark as pending",
    },
    {
      id: "trash",
      icon: <FaTrashAlt />,
      label: "Move to trash",
    },
    {
      id: "edit",
      icon: <FaEdit />,
      label: "Edit",
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
          operationLabel={taskOperationsLabel}
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
          handleTaskOperationModal(targetLabel);
          handleTaskModalClose();
        }}
      />
      <AddSubTaskModal task={task} />
    </div>
  );
}

export default ReusableTaskItem;
