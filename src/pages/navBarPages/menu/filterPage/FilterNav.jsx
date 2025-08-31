import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";
import Label from "../../../../utils/Label";
import DueDateFilterNavItem from "./DueDateFilterNavItem";
import FilterNavItem from "./FilterNavItem";
import AssigneeFilterNavItem from "./AssigneeFilterNavItem";
import FormatFilterPicker from "./Utils/FormatFilterPicker";

function FilterNav({
  setOpt,
  creationDate,
  setCreationDate,
  updatedDays,
  setUpdatedDays,
}) {
  const [isActive, setIsActive] = useState("all");
  const [show, setShow] = useState(false);

  const numbers = Array.from({ length: 30 }, (_, index) => index + 1);

  const handleIsActive = (label) => {
    setIsActive(label);
    setOpt(label);
    setShow(false);
  };
  function handClear() {
    creationDate && setCreationDate("");
    updatedDays && setUpdatedDays(1);
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
    <div className="flex gap-2 items-center p-2  justify-self-end">
      {isActive === "creation date" && (
        <FormatFilterPicker pickerState={creationDate} handClear={handClear}>
          <Label htmlFor="creationDate" className="mr-2">
            Select Date:
          </Label>
          <input
            type="date"
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
            className="border rounded p-1"
          />
        </FormatFilterPicker>
      )}
      {isActive === "recently updated" && (
        <FormatFilterPicker pickerState={updatedDays} handClear={handClear}>
          <Label htmlFor="updatedDays" className="mr-2">
            Updated in last
          </Label>
          <select
            onChange={(e) => setUpdatedDays(e.target.value)}
            value={updatedDays}
            className="border rounded p-1 border-emerald-300 dark:border-emerald-600 ring-emerald-300 dark:ring-emerald-600"
          >
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number} day{number > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </FormatFilterPicker>
      )}
      <nav className="w-fit self-start flex flex-col items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]  p-2 h-fit shadow-lg capitalize cursor-pointer font-semibold">
        <Label htmlFor="filter" className="text-lg lg:text-2xl">
          filter
        </Label>
        <div
          className={`w-fit min-w-40 h-4 ${
            show ? "p-0.5" : "p-1"
          } flex-1 justify-between items-center relative`}
        >
          <div
            className={`w-full flex justify-between items-center ${
              show
                ? "ring-emerald-700 dark:ring-yellow-600 dark:bg-[#232b25] dark:border-yellow-600 ring-2  border-white bg-white rounded-full shadow-lg"
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
              className="focus:outline-none text-emerald-800 dark:text-yellow-600 "
            >
              <IoChevronDownOutline size={24} />
            </button>
          </div>
          {show && (
            <div className=" w-fit h-fit px-1 flex flex-col border-2 border-emerald-50 dark:border-[#232b25]    shadow-2xl absolute rounded-lg py-2 z-10 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] ">
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
    </div>
  );
}

export default FilterNav;
