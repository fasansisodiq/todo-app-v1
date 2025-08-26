import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

import { useTasks } from "../../customHooks/tasks/useTasks";
import Search from "../../utils/Search";
import {
  formattedDate,
  formattedTodayDate,
} from "../../customHooks/tasks/DateFormerter";

function SearchTask({ onClose }) {
  const navigate = useNavigate();
  const { searchQuery = "", setSearchQuery, taskData = [] } = useTasks();
  const [liveResults, setLiveResults] = useState([]);
  const handleNavigate = useCallback(
    (route) => {
      navigate(`/layout/${route}`);
      liveResults && onClose();
    },
    [navigate, liveResults, onClose]
  );
  // Live search: filter tasks as user types
  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchQuery(value);

      if (!value) {
        setLiveResults([]);
        return;
      }

      const lowerQuery = value.toLowerCase();
      const results = taskData.filter((task) => {
        return (
          (task.title && task.title.toLowerCase().includes(lowerQuery)) ||
          (task.assignee && task.assignee.toLowerCase().includes(lowerQuery)) ||
          (task.dueDate && task.dueDate.includes(formattedDate(value))) ||
          (task.taskClass &&
            task.taskClass.toLowerCase().includes(lowerQuery)) ||
          (typeof task.priority === "string" &&
            task.priority.toLowerCase().includes(lowerQuery)) ||
          (task.description &&
            task.description.toLowerCase().includes(lowerQuery))
        );
      });

      setLiveResults(results);
    },
    [setSearchQuery, taskData]
  );

  // Handle enter key to navigate to first result
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (!searchQuery) return;

      if (!liveResults || liveResults.length === 0) {
        alert("No task found. Please check your trash.");
        setSearchQuery("");
        return;
      }

      // Navigate to the first matching task's section
      const firstTask = liveResults[0];
      if (firstTask.completed === false && firstTask.priority === "on") {
        handleNavigate("important");
      } else if (firstTask.completed === true) {
        handleNavigate("completed");
      } else if (firstTask.dueDate === formattedTodayDate) {
        handleNavigate("today");
      } else if (firstTask.dueDate === formattedDate(searchQuery)) {
        handleNavigate(firstTask.taskClass);
      } else {
        handleNavigate(firstTask.taskClass);
      }

      setSearchQuery("");
      setLiveResults([]);
    },
    [searchQuery, liveResults, setSearchQuery, handleNavigate]
  );

  return (
    <div className="lg:pb-4 relative w-100 sm:w-200">
      <Search
        placeholder={"Search task #"}
        value={searchQuery}
        handleSearch={handleSearch}
        onChange={handleInputChange}
      />

      {/* Fancy Live results dropdown */}
      {searchQuery && liveResults.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#232b25] border border-emerald-100 dark:border-emerald-800 rounded-xl shadow-2xl max-h-72 overflow-y-auto z-50 w-full animate-fade-in">
          {liveResults.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-emerald-50 dark:hover:bg-[#181f1b] cursor-pointer group"
              onClick={() => {
                // Navigate to the selected task's section
                if (task.completed === false && task.priority === "on") {
                  handleNavigate("important");
                } else if (task.completed === true) {
                  handleNavigate("completed");
                } else if (task.dueDate === formattedTodayDate) {
                  handleNavigate("today");
                } else if (task.dueDate === formattedDate(searchQuery)) {
                  handleNavigate(task.taskClass);
                } else {
                  handleNavigate(task.taskClass);
                }
                setSearchQuery("");
                setLiveResults([]);
              }}
            >
              {/* Colored dot for status */}
              <span
                className={`w-3 h-3 rounded-full ${
                  task.completed
                    ? "bg-emerald-500"
                    : task.priority === "on"
                    ? "bg-yellow-400"
                    : "bg-slate-300"
                }`}
                title={
                  task.completed
                    ? "Completed"
                    : task.priority === "on"
                    ? "Important"
                    : "Active"
                }
              ></span>
              {/* Task Title and Class */}
              <span className="flex-1">
                <span className="font-semibold text-slate-700 dark:text-yellow-100 group-hover:text-emerald-700 dark:group-hover:text-yellow-300 transition">
                  {task.title}
                </span>
                {task.taskClass && (
                  <span className="ml-2 text-xs text-emerald-500 dark:text-yellow-300 bg-emerald-50 dark:bg-[#232b25] px-2 py-0.5 rounded-full">
                    {task.taskClass}
                  </span>
                )}
              </span>
              {/* Due Date */}
              {task.dueDate && (
                <span className="text-xs text-slate-400 dark:text-yellow-200 font-mono">
                  {task.dueDate}
                </span>
              )}
              {/* Assignee */}
              {task.assignee && (
                <span className="ml-2 text-xs text-slate-500 dark:text-yellow-400 italic">
                  {task.assignee}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchTask;
