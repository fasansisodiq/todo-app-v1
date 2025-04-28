import Assigned from "./Assigned";
import Completed from "./Completed";
import Friend from "./Friend";
import House from "./House";
import Important from "./Important";
import Personal from "./Personal";
import Planned from "./Planned";
import Profile from "./Profile";
import Search from "./SearchTask";
import Social from "./Social";
import Task from "./Project";
import Today from "./Today";
import Trash from "./Trash";
import Work from "./Work";
import Pending from "./Pending";

function SideBar() {
  return (
    <aside
      className={`w-35 sm:w-65 md:w-70 md:px-2 lg:w-90 xl:w-100 h-screen bg-[#f0f4f3]
      flex flex-col gap-4 px-0.5 lg-px-2  text-center border-r-1 border-r-slate-300 
      z-1 `}
    >
      <Profile />
      <Search />
      <Today />
      <Important />
      <Completed />
      <Pending />
      <Planned />
      <Assigned />
      <Task />
      <Work />
      <Personal />
      <House />
      <Friend />
      <Social />

      <Trash />
    </aside>
  );
}

export default SideBar;
