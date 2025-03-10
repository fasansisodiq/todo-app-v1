import Input from "../../utils/Input";
import SmallButton from "../../utils/SmallButton";
import Label from "../../utils/Label";
import ColumnDiv from "../../utils/ColumnDiv";
import { Form } from "react-router-dom";

function AddTask() {
  function handleCancel(e) {
    e.preventDefault();
  }
  return (
    <div className="w-full h-full flex flex-col pt-5 px-5 items-center  capitalize shadow-lg text-slate-800">
      <h1 className="flex self-start px-5 md:pl-15 lg:pl-96 text-green-600  text-[1rem]   lg:text-4xl font-bold">
        create task
      </h1>
      <Form
        method="POST "
        className="flex flex-col justify-center items-center gap-3  "
      >
        <ColumnDiv>
          <Label htmlFor="task title">title</Label>
          <Input
            type={"text"}
            placeholder={"Name or title for your task"}
            name={"title"}
            id={"title"}
          />
        </ColumnDiv>
        <ColumnDiv>
          <Label htmlFor="assignee">assignee</Label>
          <Input
            type={"text"}
            placeholder={"Who will execute the task?"}
            name={"assignee"}
            id={"assignee"}
          />
        </ColumnDiv>
        <ColumnDiv>
          <Label htmlFor="task due date">due date</Label>
          <Input
            type={"date"}
            placeholder={"task due date"}
            name={"dueDate"}
            id={"dueDate"}
          />
        </ColumnDiv>
        <div className="flex flex-col self-start px-5 md:pr-10 lg:pl-30">
          <Label htmlFor="task type"> task class</Label>
          <select className="capitalize border-0 lg:p-2 text-[0.8rem] rounded-2xl bg-[#fff] shadow">
            <option>work</option>
            <option>planned</option>
            <option>assigned</option>
            <option>task</option>
            <option>personal</option>
            <option>house</option>
            <option>friend</option>
            <option>social</option>
          </select>
        </div>
        <div className="flex self-start items-center px-5 lg:pl-30 text-[0.8rem] gap-2 normal-case">
          <input type="checkbox" name={"priority"} id={"priority"} />
          <label>want to give your task priority?</label>
        </div>

        <div className=" lg:pl-30">
          <ColumnDiv>
            <Label htmlFor="task description">description</Label>
            <textarea
              className="w-50 md:w-80 lg:w-120 h-20 md:h-25 lg:h-35 pl-4 pt-4 rounded-lg
          outline-0 shadow-0.5 bg-[#fff]  hover:bg-emerald-100 focus:outline-2 focus:outline-offset-2 focus:outline-emerald-700 text-slate-700
          shadow
          "
              placeholder={"Description for the task"}
              name={"description"}
              id={"description"}
            />
          </ColumnDiv>
        </div>
        <div className="flex items-center gap-5 self-end lg:pr-30  pr-15">
          <SmallButton w={20} label={"submit"} />
          <SmallButton w={20} label={"cancel"} onClick={handleCancel} />
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
    priority: task.priority === "on",
  };
  console.log(task);
  return task;
}
export default AddTask;
