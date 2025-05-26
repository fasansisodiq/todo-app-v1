import { useState } from "react";
import { useTasks } from "../../../../customHooks/tasks/useTasks";
import TableHeader from "../../../../ui/taskOverviewUI/TableHeader";
import FilterNav from "./FilterNav";
import FilterByAssignee from "./FilterByAssignee";
import FilterByDuedate from "./FilterByDuedate";
import FilterByCreationDate from "./FilterBYCreationDate";
import FilterByUpdatedAt from "./FilterByUpdatedAt";
import TaskItem from "../../../tasks/TaskItem";

function FilterPage() {
  const { taskData, uniqueAssignees } = useTasks();
  const [opt, setOpt] = useState("all");
  const [creationDate, setCreationDate] = useState("");

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="sticky top-0 z-50 bg-white shadow flex lg:flex-row items-center px-4 py-2 ">
        <div className="w-full">
          <TableHeader height="lg:h-21.5" width="lg:w-[85%]" />
        </div>
        <div className="flex-shrink-0 w-full lg:w-auto mb-2 lg:mb-0">
          <FilterNav
            setOpt={setOpt}
            creationDate={creationDate}
            setCreationDate={setCreationDate}
          />
        </div>
      </header>
      <main className="self-start flex flex-col w-full min-h-screen overflow-y-auto">
        {opt === "all" &&
          taskData
            ?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
        {opt !== "all" &&
          opt !== "recently updated" &&
          opt === "creation date" && (
            <FilterByCreationDate
              taskData={taskData}
              creationDate={creationDate}
              setCreationDate={setCreationDate}
            />
          )}
        {opt !== "all" && opt !== "createdAt" && opt === "recently updated" && (
          <FilterByUpdatedAt taskData={taskData} days={7} />
        )}
        {opt !== "all" && opt !== "createdAt" && opt !== "recently updated" && (
          <FilterByDuedate opt={opt} />
        )}
        {opt !== "all" &&
          uniqueAssignees.map((assignee, idx) => (
            <FilterByAssignee opt={opt} name={assignee} key={idx} />
          ))}
      </main>
    </div>
  );
}

export default FilterPage;
