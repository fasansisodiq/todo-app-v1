import React from "react";
import Label from "../Label";
import ColumnDiv from "../ColumnDiv";
import { useFocus } from "../../customHooks/tasks/useFocus";

function TextArea({ defaultValue, value, onChange }) {
  const { isFocused, setIsFocused, useFocusOnMouseOver } = useFocus();
  const focusRef = useFocusOnMouseOver(isFocused);
  return (
    <div className=" lg:pl-3">
      <ColumnDiv>
        <span className="flex justify-start">
          <Label htmlFor="task description">description</Label>
        </span>
        <textarea
          ref={focusRef}
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          required
          className="w-50 sm:w-65 md:w-80 lg:w-120 h-18 sm:20 md:h-22 lg:h-25 xl:h-35 xl:w-130 pl-4 pt-4 rounded-lg
          focus:outline-none shadow-0.5 bg-[#fff]  hover:bg-emerald-100 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 text-slate-700
          shadow
          "
          placeholder={"Description for the task"}
          name={"description"}
          id={"description"}
        />
      </ColumnDiv>
    </div>
  );
}

export default TextArea;
