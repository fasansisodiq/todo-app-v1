import { Link } from "react-router";
import CustomButton from "../CustomButton";

function TaskFormButtons({
  onCancel,
  onSave,
  submitLabel,
  disabled,
  type,
  to,
}) {
  return (
    <div className="flex justify-center items-center gap-5 pt-5 ">
      <CustomButton
        size={"sm"}
        btnType={"secondary"}
        label={"cancel"}
        onClick={onCancel}
      />
      {type === "link" ? (
        <Link to={to}>
          <CustomButton
            size={"sm"}
            btnType={"primary"}
            label={submitLabel}
            onClick={onSave}
            disabled={disabled}
          />
        </Link>
      ) : (
        <CustomButton
          size={"sm"}
          btnType={"primary"}
          label={submitLabel}
          onClick={onSave}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default TaskFormButtons;
