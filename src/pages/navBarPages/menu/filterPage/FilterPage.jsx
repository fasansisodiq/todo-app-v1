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
  const [creationDate, setCreationDate] = useState("");

  return (
    <div className="flex flex-col min-h-screen w-full  dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="w-full md:w-auto flex justify-end">
        <FilterNav
          setOpt={setOpt}
          creationDate={creationDate}
          setCreationDate={setCreationDate}
        />
      </div>
      <TableHeader />

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
