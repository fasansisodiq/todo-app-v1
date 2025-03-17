import { Outlet } from "react-router";
import TaskOverviewHeader from "./TaskOverviewHeader";
import Modal from "../utils/Modal";
import AddNewTask from "../features/add-task/AddNewTask";

function OverviewScreen() {
  return (
    <main className="w-full h-screen flex flex-col text-stone-800  items-center bg-[#f0f4f3]  ">
      <Outlet />
      
    </main>
  );
}

export default OverviewScreen;
