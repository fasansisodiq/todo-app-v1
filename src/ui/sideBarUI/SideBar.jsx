import Assigned from "./Assigned";
import Completed from "./Completed";
import Friend from "./Friend";
import House from "./House";
import Important from "./Important";
import Personal from "./Personal";
import Planned from "./Planned";
import Profile from "./Profile";
import SearchTask from "./SearchTask";
import Social from "./Social";
import Task from "./Project";
import Today from "./Today";
import Trash from "./Trash";
import Work from "./Work";
import Pending from "./Pending";
import Shared from "./Shared";
import Teams from "./Teams";
import { useState } from "react";
import Ui from "../../utils/Ui";
import { CgProfile, CgSearch } from "react-icons/cg";
import { useNotifications } from "../../customHooks/notification/useNotifications";
import { CiBellOn } from "react-icons/ci";
import { Link } from "react-router";
import DarkModeToggle from "../../utils/DarkModeBtn";
import DisplayHoverMessage from "../../utils/DisplayHoverMessage";
import ShowUi from "../../utils/ShowUi";
import Modal from "../../utils/Modal";

function SideBar() {
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { notifications, enableNotifications } = useNotifications();
  //calculate total, read, and unread notifications
  const totalNotifications = notifications?.length;
  const readNotifications = notifications.filter((notif) => notif.read).length;
  const unreadNotifications = totalNotifications - readNotifications;
  return (
    <aside
      className={`
        sticky top-0 z-30 w-36 sm:w-64 md:w-72 lg:w-80 xl:w-96 min-h-screen pb-4
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
      {/*  Dark Mode, Notification */}
      <div className="flex items-center gap-2 lg:gap-10 pb-4 self-end">
        <DarkModeToggle />
        {enableNotifications && notifications && (
          <Link to={"/layout/notification"} className="relative">
            <DisplayHoverMessage
              element={
                <span className="font-bold relative">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-emerald-500 dark:text-yellow-300 drop-shadow">
                    <CiBellOn />
                  </p>
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-[0.7rem] text-white font-bold shadow">
                      {unreadNotifications}
                    </span>
                  )}
                </span>
              }
              message={"See all notifications"}
              mClassName="w-36 h-8 text-xs"
            />
          </Link>
        )}
      </div>

      {/* Profile Card */}
      <ShowUi
        label={showProfile ? "close profile" : "profile"}
        icon={<CgProfile />}
        onClick={() => setShowProfile(!showProfile)}
      >
        {showProfile && <Profile setShowProfile={setShowProfile} />}
      </ShowUi>

      {/* Search Bar */}
      <ShowUi
        label={showSearch ? "close search" : "search"}
        icon={<CgSearch />}
        onClick={() => setShowSearch(true)}
      >
        <Modal isOpen={showSearch} onClose={() => setShowSearch(false)}>
          <span className="font-bold text-2xl text-emerald-500 capitalize pb-4">
            search task
          </span>
          <SearchTask onClose={() => setShowSearch(false)} />
        </Modal>
      </ShowUi>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-3  sm:gap-2 sm:my-2 ">
        <Teams />
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
        <Trash />
      </nav>
    </aside>
  );
}

export default SideBar;
