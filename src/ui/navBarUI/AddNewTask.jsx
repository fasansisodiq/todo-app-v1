import Input from "../../utils/Input";
import Label from "../../utils/Label";
import ColumnDiv from "../../utils/ColumnDiv";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { createTask } from "../../services/apiTaskData";
import { useState } from "react";

function AddNewTask() {
  const today = new Date();
  const defaultDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(today);
  // console.log(defaultDate);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(false);
  const [description, setDescription] = useState("");

  const { tasks } = useTasks();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      id: JSON.stringify(tasks.length + 1),
      title: title,
      assignee: assignee,
      dueDate: dueDate,
      priority: priority,
      description: description,
    };
    console.log(newTask);
    const task = createTask(newTask);
    return task;
  }
  return (
    <div className="relative w-60 h-100 sm:w-80 sm:h-105 md:w-100 md:h-150 lg:w-110 lg:h-152 xl:w-160 xl:h-152 flex flex-col p-5   items-center justify-between capitalize text-slate-800    rounded-lg bg-[#c0efe3] shadow-2xl mt-4">
      <h1
        className="flex self-center px-auto pl-6 md:pl-15  pb-1 pt-2  text-emerald-600  text-[1rem]
      sm:text-xl md:text-2xl   lg:text-2xl xl:text-2xl font-bold"
      >
        add new task
      </h1>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col items-center gap-3 lg:gap-2  "
      >
        <ColumnDiv>
          <span className="flex justify-start">
            <Label htmlFor="task title">title</Label>
          </span>
          <Input
            type={"text"}
            placeholder={"Name or title for your task"}
            name={"title"}
            id={"title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ColumnDiv>
        <ColumnDiv>
          <span className="flex justify-start">
            <Label htmlFor="assignee">assignee</Label>
          </span>
          <Input
            type={"text"}
            placeholder={"Who will execute the task?"}
            name={"assignee"}
            id={"assignee"}
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </ColumnDiv>
        <ColumnDiv>
          <span className="flex justify-start">
            <Label htmlFor="task due date">due date</Label>
          </span>
          <Input
            type={"date"}
            placeholder={"task due date"}
            name={"dueDate"}
            id={"dueDate"}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </ColumnDiv>
        <div
          className="flex flex-col self-start px-auto md:pr-5 lg:pl-3 placeholder:text-[0.8rem] 
           lg:placeholder:text-md
           md:placeholder:text-xsm "
        >
          <span className=" flex justify-start">
            <Label htmlFor="task type"> task class</Label>
          </span>
          <select
            name="taskType"
            required
            className="capitalize border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 p-0.5 lg:p-1 text-[0.8rem] sm:text-[1rem] md:text-sm lg:text-lg xl:xl rounded-2xl bg-[#fff] shadow"
          >
            <option value={"work"}>work</option>
            <option value={"planned"}>planned</option>
            <option value={"assigned"}>assigned</option>
            <option value={"project"}>project</option>
            <option value={"personal"}>personal</option>
            <option value={"house"}>house</option>
            <option value={"friend"}>friend</option>
            <option value={"social"}>social</option>
          </select>
        </div>
        <div className="flex self-start items-center px-auto lg:pl-3 text-[0.8rem] sm:text-sm md:text-lg lg:text-md xl:text-md  gap-2 normal-case">
          <input
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-6 lg:rounded-sm focus:ring-offset-2 focus:ring-2 focus:ring-emerald-700 focus:bg-emerald-700"
            type="checkbox"
            name={"priority"}
            id={"priority"}
            checked={priority}
            onChange={() => setPriority(!priority)}
          />
          <label>want to give your task priority?</label>
        </div>

        <div className=" lg:pl-3">
          <ColumnDiv>
            <span className="flex justify-start">
              <Label htmlFor="task description">description</Label>
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-50 sm:w-65 md:w-80 lg:w-120 h-18 sm:20 md:h-22 lg:h-25 xl:h-35 xl:w-130 pl-4 pt-4 rounded-lg
          focus:outline-none shadow-0.5 bg-[#fff]  hover:bg-emerald-100 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 text-slate-700
          shadow
          "
              placeholder={"Description for the task"}
              name={"description"}
              id={"description"}
            />
          </ColumnDiv>
        </div>
        <div className="flex justify-center items-center gap-5  ">
          <CustomButton
            size={"sm"}
            type={"secondary"}
            label={"cancel"}
            onClick={() => navigate("/layout/today")}
          />
          <CustomButton size={"sm"} type={"primary"} label={"submit"} />
        </div>
      </form>
    </div>
  );
}

export default AddNewTask;
