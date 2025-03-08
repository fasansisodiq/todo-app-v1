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
    <div className="w-full h-full flex flex-col justify-center items-center  capitalize shadow-lg text-[#001900]">
      <h1 className="flex self-start pl-30 text-[#183a1f]    text-4xl font-bold">
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
        <div className="flex flex-col self-start">
          <Label htmlFor="task type"> task class</Label>
          <select className="capitalize border-0 p-2  rounded-2xl bg-[#fff] shadow">
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
        <div className="flex self-start items-center gap-2 normal-case">
          <input type="checkbox" name={"priority"} id={"priority"} />
          <label>want to give your task priority?</label>
        </div>

        <ColumnDiv>
          <Label htmlFor="task description">description</Label>
          <textarea
            className="w-[30rem] h-35 pl-4 pt-4 rounded-lg
          outline-0 shadow-0.5 bg-[#fff]  hover:bg-emerald-100 focus:outline-2 focus:outline-offset-2 focus:outline-emerald-700 text-[#183a1f]
          shadow
          "
            placeholder={"Description for the task"}
            name={"description"}
            id={"description"}
          />
        </ColumnDiv>
        <div className="flex items-center gap-5 self-end  pr-15">
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
