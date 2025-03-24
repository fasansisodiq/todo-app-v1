import Input from "../../utils/Input";
import Label from "../../utils/Label";
import ColumnDiv from "../../utils/ColumnDiv";
import Modal from "../../utils/Modal";
import { BiX } from "react-icons/bi";
import { Form, useNavigate } from "react-router-dom";
import { createTask } from "../../services/apiUserData";
import CustomButton from "../../utils/CustomButton";

function AddNewTask() {
  const navigate = useNavigate();

  return (
    <div className="relative w-60 h-100 sm:w-80 sm:h-105 md:w-100 md:h-110 lg:w-110 lg:h-120 xl:w-140 xl:h-130 flex flex-col p-5 pt-45 lg:pt-50 items-center justify-center capitalize text-slate-800    rounded-lg">
      <h1
        className="flex self-center px-auto pl-6 md:pl-15  pb-1 pt-2  text-emerald-600  text-[1rem]
      sm:text-xl md:text-2xl   lg:text-3xl xl:text-4xl font-bold"
      >
        create task
      </h1>
      <Form
        method="post"
        className="flex flex-col items-center gap-3 lg:gap-2  "
      >
        <ColumnDiv>
          <span className="flex justify-start">
            {" "}
            <Label htmlFor="task title">title</Label>
          </span>
          <Input
            type={"text"}
            placeholder={"Name or title for your task"}
            name={"title"}
            id={"title"}
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
          />
        </ColumnDiv>
        <div className="flex flex-col self-start px-auto md:pr-5 lg:pl-3">
          <span className=" flex justify-start">
            <Label htmlFor="task type"> task class</Label>
          </span>
          <select
            name="task type"
            required
            className="capitalize border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 p-0.5 lg:p-1 text-[0.8rem] sm:text-[1rem] md:text-sm lg:text-lg xl:xl rounded-2xl bg-[#fff] shadow"
          >
            <option value={"work"}>work</option>
            <option value={"planned"}>planned</option>
            <option value={"assigned"}>assigned</option>
            <option value={"task"}>task</option>
            <option value={"personal"}>personal</option>
            <option value={"house"}>house</option>
            <option value={"friend"}>friend</option>
            <option value={"social"}>social</option>
          </select>
        </div>
        <div className="flex self-start items-center px-auto lg:pl-3 text-[0.8rem] sm:text-sm md:text-lg lg:text-xl xl:2xl  gap-2 normal-case">
          <input
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 lg:rounded-sm focus:ring-offset-2 focus:ring-2 focus:ring-emerald-700 focus:bg-emerald-700"
            type="checkbox"
            name={"priority"}
            required
            id={"priority"}
          />
          <label>want to give your task priority?</label>
        </div>

        <div className=" lg:pl-3">
          <ColumnDiv>
            <span className="flex justify-start">
              <Label htmlFor="task description">description</Label>
            </span>
            <textarea
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
            onClick={() => navigate("/today")}
          />
          <CustomButton size={"sm"} type={"primary"} label={"submit"} />
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const taskData = await request.formData();
  let task = Object.fromEntries(taskData);
  task = {
    ...task,
    priority: `${task.priority === "on" ? "yes" : "no"}`,
  };
  const newTask = await createTask(task);
  console.log(newTask);
  return { newTask };
}
export default AddNewTask;
