
import AddNewTask from "../features/add-task/AddNewTask";
import Modal from "../utils/Modal";
import Assigned from "./Assigned";
import Completed from "./Completed";
import Friend from "./Friend";
import House from "./House";
import Important from "./Important";
import Personal from "./Personal";
import Planned from "./Planned";
import Profile from "./Profile";
import Search from "./Search";
import Social from "./Social";
import Task from "./Task";
import Today from "./Today";
import Trash from "./Trash";
import Work from "./Work";

function SideBar() {
  
  return (
    <div className={`w-35 sm:w-50 md:w-70 lg:w-90 xl:w-100 h-screen bg-[#f0f4f3]
      flex flex-col gap-4 px-0.5 lg-px-2  text-center border-r-1 border-r-slate-300 
      z-1 `}>
      <Profile  />     
      <Search />
      <Today />
      <Important />
      <Completed />
      <Planned />
      <Assigned />
      <Task />
      <Work />
      <Personal />
      <House />
      <Friend />
      <Social />
      <Trash />
    </div>
  );
}

export default SideBar;
