import React from "react";

function TaskPriority({ checked, defaultChecked, onChange }) {
  return (
    <div className="flex self-start items-center px-auto lg:pl-3 text-[0.8rem] sm:text-sm md:text-lg lg:text-xl xl:2xl  gap-2 normal-case">
      <input
        className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 lg:rounded-sm focus:ring-offset-2 focus:ring-2 focus:ring-emerald-700 focus:bg-emerald-700"
        type="checkbox"
        name={"priority"}
        id={"priority"}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
      />
      <label>want to give your task priority?</label>
    </div>
  );
}

export default TaskPriority;
