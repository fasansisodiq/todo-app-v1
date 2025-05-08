import CustomButton from "./CustomButton";

function TaskFormButtons({ onCancel, onSave, submitLabel }) {
  return (
    <div className="flex justify-center items-center gap-5 pt-5 ">
      <CustomButton
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
        onClick={onCancel}
      />
      <CustomButton
        size={"sm"}
        type={"primary"}
        label={submitLabel}
        onClick={onSave}
      />
    </div>
  );
}

export default TaskFormButtons;
