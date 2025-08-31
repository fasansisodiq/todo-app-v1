import { useState } from "react";
import { useTasks } from "../../../../customHooks/tasks/useTasks";
import TableHeader from "../../../../ui/taskOverviewUI/TableHeader";
import FilterNav from "./FilterNav";
import FilterByAssignee from "./FilterByAssignee";
import FilterByDuedate from "./FilterByDuedate";
import FilterByCreationDate from "./FilterBYCreationDate";
import FilterByUpdatedAt from "./FilterByUpdatedAt";
import ReusableTaskItem from "../../../../utils/ReusableTaskItem";

function FilterPage() {
  const { taskData, uniqueAssignees } = useTasks();
  const [opt, setOpt] = useState("all");
  // selected creation date state for filtering
  const [creationDate, setCreationDate] = useState([]);
  const [updatedDays, setUpdatedDays] = useState(1);

  return (
    <div className="flex flex-col min-h-screen w-full  dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="w-full md:w-auto flex justify-between">
        <header className="text-2xl md:text-3xl text-emerald-700 dark:text-yellow-700 font-bold p-4 md:p-6">
          Filter Tasks
        </header>
        <FilterNav
          setOpt={setOpt}
          creationDate={creationDate}
          setCreationDate={setCreationDate}
          updatedDays={updatedDays}
          setUpdatedDays={setUpdatedDays}
        />
      </div>
      {/* <TableHeader /> */}

      <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto py-6 px-2 gap-4">
        {opt === "all" &&
          taskData
            ?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((task, idx) => (
              <ReusableTaskItem task={task} key={task.id} idx={idx} />
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
          <FilterByUpdatedAt taskData={taskData} updatedDays={updatedDays} />
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
