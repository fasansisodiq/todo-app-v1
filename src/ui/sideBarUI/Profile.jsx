import { CiBellOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import DisplayHoverMessage from "../../utils/DisplayHoverMessage";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useAuth } from "../../authentication/useAuth";
import { useNotifications } from "../../customHooks/notification/useNotifications";
import DarkModeToggle from "../../utils/DarkModeBtn";

function Profile() {
  const { date } = useTasks();
  const { username, fullName, profilePic, email } = useAuth();
  const { notifications, enableNotifications } = useNotifications();

  // Greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  //calculate total, read, and unread notifications
  const totalNotifications = notifications?.length;
  const readNotifications = notifications.filter((notif) => notif.read).length;
  const unreadNotifications = totalNotifications - readNotifications;

  return (
    <div className="relative w-full max-w-xs flex flex-col px-3 md:px-6 py-8 items-center gap-8 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] rounded-2xl shadow-2xl font-sans border border-emerald-100 dark:border-emerald-900 transition-colors duration-300">
      {/* Header: Logo, Dark Mode, Notification */}
      <div className="w-full flex items-center justify-between px-1 mb-2">
        <h1 className="opacity-90 font-extrabold tracking-widest text-emerald-700 dark:text-yellow-300 text-lg md:text-xl uppercase drop-shadow">
          todopro
        </h1>
        <div className="flex items-center gap-2">
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
      </div>
      {/* Date */}
      <span className="text-xs md:text-base text-slate-400 dark:text-slate-300 font-mono pt-1 self-end">
        {date}
      </span>
      {/* Greeting */}
      <span className="font-semibold text-[0.7rem] md:text-base lg:text-xl text-emerald-800 dark:text-emerald-200 max-w-full text-center tracking-wide">
        {getGreeting()},{" "}
        <span className="font-bold text-emerald-600 dark:text-yellow-300">
          {username ? `${username.replace(/^@/, "")}` : fullName || email}
          !!
        </span>
      </span>
      {/* Profile Avatar & Name */}
      <div className="relative flex flex-col items-center gap-2 w-full">
        <span className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center font-bold rounded-full border-4 border-emerald-400 shadow-lg bg-gradient-to-br from-white to-emerald-50 dark:from-[#232b25] dark:to-[#181f1b] overflow-hidden ring-2 ring-emerald-200">
          <img
            src={profilePic || "/default-profile.png"}
            alt="Profile"
            className="object-cover w-full h-full rounded-full"
          />
        </span>
        <span className="mt-2 sm:text-lg font-bold text-[0.8rem] text-emerald-700 dark:text-yellow-200 capitalize tracking-wide">
          {fullName || username || email}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-300">
          {email}
        </span>
      </div>
    </div>
  );
}

export default Profile;
