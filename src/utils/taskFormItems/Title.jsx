import Input from "../Input";
import Label from "../Label";
import ColumnDiv from "../ColumnDiv";

function Title({ value, defaultValue, onChange, id, required }) {
  return (
    <ColumnDiv>
      <span className="flex justify-start">
        <Label htmlFor="task title">title</Label>
      </span>
      <Input
        placeholder={"Name or title for your task"}
        name={"title"}
        id={id || "task-title"}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        required={required}
      />
    </ColumnDiv>
  );
}

export default Title;
