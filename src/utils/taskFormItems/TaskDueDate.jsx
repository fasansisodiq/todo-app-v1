import React from "react";
import ColumnDiv from "../ColumnDiv";
import Label from "../Label";
import Input from "../Input";

function TaskDueDate({ value, defaultValue, onChange }) {
  return (
    <ColumnDiv>
      <span className="flex justify-start">
        <Label htmlFor="task due date">due date</Label>
      </span>
      <Input
        type={"date"}
        placeholder={"task due date"}
        name={"dueDate"}
        id={"dueDate"}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </ColumnDiv>
  );
}

export default TaskDueDate;
