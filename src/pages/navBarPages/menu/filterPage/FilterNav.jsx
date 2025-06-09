import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";
import Label from "../../../../utils/Label";
import DueDateFilterNavItem from "./DueDateFilterNavItem";
import FilterNavItem from "./FilterNavItem";
import AssigneeFilterNavItem from "./AssigneeFilterNavItem";

function FilterNav({ setOpt, creationDate, setCreationDate }) {
  const [isActive, setIsActive] = useState("all");
  const [show, setShow] = useState(false);

  const handleIsActive = (label) => {
    setIsActive(label);
    setOpt(label);
    setShow(false);
  };
  function handClear() {
    setCreationDate("");
    setIsActive("all");
  }
  const filterNavItems = [
    { label: "all", onClick: () => handleIsActive("all") },
    { label: "creation date", onClick: () => handleIsActive("creation date") },
    {
      label: "recently updated",
      onClick: () => handleIsActive("recently updated"),
    },
  ];
  return (
    <>
      {isActive === "creation date" && (
        <div className="flex items-center mb-2">
          <input
            type="date"
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
            className="border rounded p-1"
          />
          {creationDate && (
            <button
              className="ml-2 px-2 py-1 bg-gray-200 dark:bg-emerald-500 rounded"
              onClick={handClear}
            >
              Clear
            </button>
          )}
        </div>
      )}
      <nav className="w-fit self-start flex flex-col items-center bg-teal-100 dark:bg-[#8c8f8d] p-2 h-fit shadow-lg capitalize cursor-pointer font-semibold">
        <Label htmlFor="filter" className="text-lg lg:text-2xl">
          filter
        </Label>
        <div
          className={`w-35 h-4 ${
            show ? "p-0.5" : "p-1"
          } flex-1 justify-between items-center relative`}
        >
          <div
            className={`w-full flex justify-between items-center ${
              show
                ? "ring-emerald-700 dark:ring-yellow-600 dark:bg-yellow-50 dark:border-yellow-600 ring-2 border-4 border-white bg-white rounded-full shadow-lg"
                : ""
            }`}
          >
            <span className="px-0.5 lg:px-1 text-emerald-800 dark:text-yellow-50">
              {isActive}
            </span>
            <button
              type="button"
              aria-label="Toggle filter dropdown"
              onClick={() => setShow((prev) => !prev)}
              className="focus:outline-none"
            >
              <IoChevronDownOutline size={25} />
            </button>
          </div>
          {show && (
            <div className="bg-white w-34 h-fit px-1 flex flex-col border-2 border-white dark:border-[#464c49]   dark:bg-[#464c49] shadow-2xl absolute rounded-lg py-2 z-10">
              {filterNavItems.map((item, index) => (
                <FilterNavItem
                  key={index}
                  label={item.label}
                  onClick={item.onClick}
                />
              ))}
              <h2 className="mt-2 mb-1 font-semibold text-sm text-gray-700 dark:text-emerald-300">
                due date
              </h2>
              <DueDateFilterNavItem onClick={handleIsActive} />
              <AssigneeFilterNavItem onClick={handleIsActive} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default FilterNav;
