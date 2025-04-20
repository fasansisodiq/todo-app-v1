import { useEffect, useRef, useState } from "react";
import { useOperation } from "../operation/useOperation";
import { useTasks } from "./useTasks";
import { useNavigate } from "react-router-dom";

export function useEditing() {
  const [editingTask, setEditingTask] = useState(false);
  const { setOpenModal, onCloseEdit } = useOperation();
  const { tasks, setTasks } = useTasks();
  const navigate = useNavigate();

  const editRef = useRef(null);
  // useEffect(() => {
  //   if (editingTask && editRef.current) {
  //     editRef.current.focus();
  //     // position the cursor at the end of the text
  //     editRef.current.setSelectionRange(
  //       editRef.current.value.length,
  //       editRef.current.value.length
  //     );
  //   }
  // }, [editingTask]);
  function handleEditTask(taskId) {
    // handle the edit of the task
    // get the form data and send it to the server
    // set the task to be edited
    // set the task to be edited to the taskId
    const editedTask = tasks.map((task) => {
      if (taskId === task.id) {
        return { ...task };
      }
      return task;
    });
    setTasks(editedTask);
    setEditingTask(true);
    setOpenModal(false);
    onCloseEdit();
    // navigate("/layout/new-task");
  }

  return {
    editingTask,
    setEditingTask,
    editRef,
    handleEditTask,
  };
}
