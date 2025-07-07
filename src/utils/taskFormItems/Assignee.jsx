import ColumnDiv from "../ColumnDiv";
import Label from "../Label";
import Input from "../Input";

function Assignee({ value, defaultValue, onChange, id, required }) {
  return (
    <ColumnDiv>
      <span className="flex justify-start">
        <Label htmlFor="assignee">assignee</Label>
      </span>
      <Input
        type={"text"}
        placeholder={"Who will execute the task?"}
        name={"assignee"}
        id={id || "assignee"}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        required={required}
      />
    </ColumnDiv>
  );
}

export default Assignee;
