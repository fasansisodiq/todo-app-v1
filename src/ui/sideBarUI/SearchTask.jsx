import { useNavigate } from "react-router-dom";
import { useTasks } from "../../customHooks/tasks/useTasks";
import Search from "../../utils/Search";
import {
  formattedDate,
  formattedTodayDate,
} from "../../customHooks/tasks/DateFormerter";

function SearchTask() {
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery, taskData } = useTasks();

  function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery) return;

    const results =
      searchQuery &&
      taskData
        ?.filter((task) => {
          if (task.title) {
            return task.title.toLowerCase().includes(searchQuery.toLowerCase());
          } else if (task.assignee) {
            return task.assignee
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          } else if (task.dueDate) {
            return task.dueDate.includes(formattedDate(searchQuery));
          } else if (task.taskClass) {
            return task.taskClass
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          } else if (task.priority) {
            return task.priority
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          } else if (task.description) {
            return task.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          } else {
            alert("No task found. Please check your trash.");
          }
        })
        .map((task) => {
          if (task.completed === false && task.priority === "on") {
            navigate(`/layout/important`);
            console.log(task.dueDate === formattedTodayDate);
          } else if (task.completed === true) {
            console.log(task.dueDate === formattedTodayDate);
            navigate(`/layout/completed`);
          } else if (task.dueDate === formattedTodayDate) {
            navigate(`/layout/today`);
          } else if (task.dueDate === formattedDate(searchQuery)) {
            navigate(`/layout/${task.taskClass}`);
          } else {
            navigate(`/layout/${task.taskClass}`);
            console.log(task.dueDate === formattedTodayDate);
          }
          console.log(task);
          return task;
        });

    console.log(results);
    console.log(searchQuery);
    setSearchQuery("");
  }

  return (
    <div className="lg:pb-4">
      <Search placeholder={"Search task #"} handleSearch={handleSearch} />
    </div>
  );
}

export default SearchTask;
