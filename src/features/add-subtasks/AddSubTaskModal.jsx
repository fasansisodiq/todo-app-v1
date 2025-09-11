import { useState } from "react";
import { useNavigate } from "react-router";

import Modal from "../../utils/Modal";
import { useOperation } from "../../customHooks/operation/useOperation";
import { useTasks } from "../../customHooks/tasks/useTasks";
import SubtaskForm from "../../utils/SubtaskForm";

function AddSubTaskModal({ task }) {
  const navigate = useNavigate();
  const { openSubTask, onCloseSubTask } = useOperation();
  const { addNewSubtask } = useTasks();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "please select",
    completed: false,
    assignee: "",
    parentTaskId: task.id,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSubtask = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const newSubtask = {
      ...form,
    };

    await addNewSubtask(task.id, newSubtask);
    onCloseSubTask();
    setForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "please select",
      completed: false,
      assignee: "",
    });
    navigate(`/layout/${task.taskClass}`);
  };

  return (
    <>
      {openSubTask && (
        <Modal isOpen={openSubTask} onClose={onCloseSubTask}>
          <SubtaskForm
            header={"Add Subtask"}
            task={task}
            onSubmit={handleAddSubtask}
            onSave={handleAddSubtask}
            onCancel={onCloseSubTask}
            handleInputChange={handleInputChange}
            form={form}
          />
        </Modal>
      )}
    </>
  );
}

export default AddSubTaskModal;
