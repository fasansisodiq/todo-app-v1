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
import Shared from "./Shared";
import Teams from "./Teams";

function SideBar() {
const [showProfile,setShowProfile]= useState(false);
  return (
    <aside
      className={`
        sticky top-0 z-30 w-36 sm:w-64 md:w-72 lg:w-80 xl:w-96 min-h-screen
        flex flex-col gap-4 px-2 py-6 bg-gradient-to-b from-emerald-50 via-white to-emerald-100
        border-r border-emerald-100 shadow-2xl rounded-tr-3xl rounded-br-3xl
        transition-all duration-300 bg-white dark:bg-[#181f1b] dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]
        dark:border-emerald-900 dark:shadow-lg
      `}
      style={{
        boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.10), 0 1.5px 0 0 #d1fae5",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Profile Card */}
    <div className="flex flex-col gap-2">
  <div className="capitalize" onClick={setShowProfile(!showProfile)}>profile</div>
     {showProfile &&  <div className="mb-2">
        <Profile />
      </div>}
</div>
      {/* Search Bar */}
      <div className="mb-2 pl-2">
        <Search />
      </div>
      {/* Main Navigation */}
      <Teams />
      <nav className="flex flex-col gap-3  sm:gap-2 sm:mt-2">
        <Today />
        <Important />
        <Completed />
        <Pending />
        <Shared />
        <Planned />
        <Assigned />
        <Task />
        <Work />
        <Personal />
        <House />
        <Friend />
        <Social />
      </nav>

      <Trash />
    </aside>
  );
}

export default SideBar;
