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
      className={`
        sticky top-0 z-30 w-36 sm:w-64 md:w-72 lg:w-80 xl:w-96 min-h-screen
        flex flex-col gap-4 px-2 py-6 bg-gradient-to-b from-emerald-50 via-white to-emerald-100
        border-r border-emerald-100 shadow-2xl rounded-tr-3xl rounded-br-3xl
        transition-all duration-300
      `}
      style={{
        boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.10), 0 1.5px 0 0 #d1fae5",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Profile Card */}
      <div className="mb-2">
        <Profile />
      </div>
      {/* Search Bar */}
      <div className="mb-2">
        <Search />
      </div>
      {/* Main Navigation */}
      <nav className="flex flex-col gap-2 mt-2">
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
      </nav>
      {/* Trash at the bottom */}
      <div className="mt-auto pt-4">
        <Trash />
      </div>
    </aside>
  );
}

export default SideBar;
