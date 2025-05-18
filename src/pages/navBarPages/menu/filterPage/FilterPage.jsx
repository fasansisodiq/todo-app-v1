import { useState } from "react";
import { useTasks } from "../../../../customHooks/tasks/useTasks";
import TableHeader from "../../../../ui/taskOverviewUI/TableHeader";
import TaskItem from "../../../tasks/TaskItem";
import FilterNav from "./FilterNav";
import FilterByAssignee from "./FilterByAssignee";
import FilterByDuedate from "./FilterByDuedate";

function FilterPage() {
  const { taskData, uniqueAssignees } = useTasks();
  const [filter, setFilter] = useState("all");

  function daysLeft(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  // function isDueToday(dueDate) {
  //   const today = new Date();
  //   const due = new Date(dueDate);
  //   return (
  //     today.getDate() === due.getDate() &&
  //     today.getMonth() === due.getMonth() &&
  //     today.getFullYear() === due.getFullYear()
  //   );
  // }

  function isOverdue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    return due.getTime() < today.getTime();
  }

  function isDueThisWeek(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const oneWeekFromNow = new Date(today);
    oneWeekFromNow.setDate(today.getDate() + 7);
    return (
      due.getTime() >= today.getTime() &&
      due.getTime() <= oneWeekFromNow.getTime()
    );
  }

  return (
    <div className="flex flex-col  min-h-screen w-full">
      <header className="flex  w-full  ">
        <FilterNav setFilter={setFilter} />
        <span className="w-full ">
          <TableHeader height={"lg:h-21.5"} />
        </span>
      </header>
      <main className="self-start flex flex-col w-full min-h-screen overflow-y-auto">
        {filter === "all" &&
          taskData?.length > 0 &&
          taskData.map((task, idx) => (
            <TaskItem task={task} key={task.id} idx={idx} />
          ))}

        <>
          <FilterByDuedate
            filter={filter}
            name={"week"}
            cbFunc={isDueThisWeek}
          />
        </>

        <>
          <FilterByDuedate
            filter={filter}
            name={"month"}
            cbFunc={daysLeft}
            days={30}
          />
        </>
        <>
          <FilterByDuedate
            filter={filter}
            name={"year"}
            cbFunc={daysLeft}
            days={365}
          />
        </>
        <>
          <FilterByDuedate
            filter={filter}
            name={"overdue"}
            cbFunc={isOverdue}
          />
        </>

        <>
          {uniqueAssignees.map((assignee, idx) => (
            <FilterByAssignee filter={filter} name={assignee} key={idx} />
          ))}
        </>
      </main>
    </div>
  );
}

export default FilterPage;
// function groupBy(array, key) {
//   return array.reduce((result, currentValue) => {
//     (result[currentValue[key]] = result[currentValue[key]] || []).push(
//       currentValue
//     );
//     return result;
//   }, {});
// }
// const groupedTasks = groupBy(taskData, "assignee");
