import { useState } from "react";
import { useTasks } from "../../../../customHooks/tasks/useTasks";
import Label from "../../../../utils/Label";

function FilterNav({ setFilter }) {
const weeks =["week","2-3 weeks"]
  // const [assignee, setAssignee] = useState();
  const { taskData, uniqueAssignees } = useTasks();
  // const assignees = [];
  // taskData?.map((task) => {
  //   if (task.assignee) {
  //     assignees.push(task.assignee.toLowerCase());
  //   }
  // });
  // const uniqueAssignees = [...new Set(assignees)];

  return (
    <nav
      className="w-fit self-start flex flex-col  items-center
 bg-white p-2  h-fit shadow-sm capitalize cursor-pointer font-semibold"
    >
      <Label htmlFor="filter" className="text-lg lg:text-2xl">
        filter
      </Label>
      <select
        name="filter"
        id="filter"
        onChange={(e) => setFilter(e.target.value)}
        className="border-0 capitalize  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 p-0.5 lg:p-1 text-emerald-700 text-[0.8rem] sm:text-[1rem] md:text-sm lg:text-lg xl:text-lg rounded-2xl bg-[#fff] shadow "
      >
        <option className="hover:bg-[#c0efe3]" value={"all"}>
          all
        </option>
        <optgroup
          label="due date"
          className="hover:bg-[#c0efe3]"
          value={"dueDate"}
        >
          <optgroup label="week" value={"week"}>{weeks.map((week,idx)=><option key={idx} value={week}>{week}</option>)}</optgroup>
          <option value={"month"}>month</option>
          <option value={"year"}>year</option>
        </optgroup>

        <option className="hover:bg-[#c0efe3]" value={"overdue"}>
          overdue
        </option>
        <optgroup label="assignee" className="hover:bg-[#c0efe3]">
          {uniqueAssignees.map((assignee, idx) => (
            <option key={idx} value={assignee}>
              {assignee}
            </option>
          ))}
        
        </optgroup>
      </select>
    </nav>
  );
}

export default FilterNav;
