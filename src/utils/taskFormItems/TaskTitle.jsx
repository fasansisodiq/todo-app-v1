import React from "react";
import Input from "../Input";
import Label from "../Label";
import ColumnDiv from "../ColumnDiv";

function TaskTitle({ value, defaultValue, onChange }) {
  return (
    <ColumnDiv>
      <span className="flex justify-start">
        <Label htmlFor="task title">title</Label>
      </span>
      <Input
        placeholder={"Name or title for your task"}
        name={"title"}
        id={"title"}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </ColumnDiv>
  );
}

export default TaskTitle;
