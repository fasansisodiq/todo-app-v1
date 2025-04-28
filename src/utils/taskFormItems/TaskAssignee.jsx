import React from "react";
import ColumnDiv from "../ColumnDiv";
import Label from "../Label";
import Input from "../Input";

function TaskAssignee({ value, defaultValue, onChange }) {
  return (
    <ColumnDiv>
      <span className="flex justify-start">
        <Label htmlFor="assignee">assignee</Label>
      </span>
      <Input
        type={"text"}
        placeholder={"Who will execute the task?"}
        name={"assignee"}
        id={"assignee"}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </ColumnDiv>
  );
}

export default TaskAssignee;
