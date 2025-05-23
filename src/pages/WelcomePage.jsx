import { useNavigate } from "react-router";
import Button from "../utils/Button";
import { FcTodoList } from "react-icons/fc";

import Logo from "../utils/Logo";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="  flex  flex-col justify-start items-center w-screen    bg-[#f0f4f3] shadow rounded-2xl   text-slate-800 font-sans">
      <header className="flex">
        <Logo />
      </header>
      <div className="flex flex-col  items-center p-4">
        <span>
          <span className="pr-2 capitalize text-[#183a1f] text-sm sm:text-xl lg:text-3xl xl:text-4xl font-semibold pb-2">
            get things todo ?
          </span>
          <span>
            <span className=" text-sm lg:text-3xl xl:text-4xl text-green-700 font-semibold pr-1">
              todopro
            </span>
            is all you ever wanted.
          </span>
        </span>
        <span>
          Your #1 choice for 2 in 1 ( task manager and todo list ) app
        </span>
        {/* <br /> */}
        <p className="text-sm lg:text-3xl xl:text-4xl mb-4 pt-4">
          With
          <span className=" px-1 text-green-700 font-semibold">todopro</span>
          you can:
          <span className=" size-6 text-[#183a1f] animate-bounce"> &darr;</span>
        </p>

        <ol className="text-sm  px-4 list-disc">
          <li>
            Add, edit, and delete tasks: You can add new tasks, edit existing
            tasks, and remove tasks.
          </li>
          <li>
            Mark tasks as completed or pending: You can mark tasks as completed
            or pending without deleting them .
          </li>
          <li>
            Filter tasks: You can filter tasks by status, such as all tasks,
            overdue tasks,due date, or by assignee.
          </li>
          <li>
            Statistics: You can see the percentage of active tasks and completed
            tasks.
          </li>
          <li>
            Reporting: You can get reports on how you spend your time and how
            productive you are.
          </li>
        </ol>

        <span className="py-5">
          <Button
            label={"Get Started"}
            onClick={() => navigate("/signup")}
            type={"submit"}
          />
        </span>
      </div>
    </div>
  );
}

export default WelcomePage;
