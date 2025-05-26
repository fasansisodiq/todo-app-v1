import React from "react";
import Label from "../Label";
import ColumnDiv from "../ColumnDiv";
import { useFocus } from "../../customHooks/tasks/useFocus";

function TextArea({ defaultValue, value, onChange, className = "" }) {
  const { isFocused, setIsFocused, useFocusOnMouseOver } = useFocus();
  const focusRef = useFocusOnMouseOver(isFocused);

  return (
    <div className="w-full">
      <ColumnDiv>
        <span className="flex justify-start mb-1">
          <Label htmlFor="description">Description</Label>
        </span>
        <textarea
          ref={focusRef}
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          required
          className={`
            w-full min-h-[100px] px-4 py-3 rounded-xl
            border-2
            ${
              isFocused
                ? "border-emerald-400 ring-2 ring-emerald-200"
                : "border-emerald-100"
            }
            bg-white text-slate-800
            placeholder:text-emerald-300 placeholder:font-medium
            focus:outline-none focus:ring-2 focus:ring-emerald-400
            shadow transition-all duration-200
            resize-y
            ${className}
          `}
          placeholder="Description for the task"
          name="description"
          id="description"
        />
      </ColumnDiv>
    </div>
  );
}

export default TextArea;
