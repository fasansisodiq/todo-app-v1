import { CiBellOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import DisplayHoverMessage from "../../utils/DisplayHoverMessage";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useAuth } from "../../authentication/useAuth";
import Logo from "../../utils/Logo";

function Profile() {
  const { date } = useTasks();
  const { username, fullName, profilePic, email } = useAuth();
  // const { notifications, enableNotifications } = useNotifications();

  // Greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="relative w-full  flex flex-col px-3  py-8 items-center gap-8 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] rounded-2xl shadow-lg font-sans border border-emerald-100 dark:border-emerald-900 transition-colors duration-300">
      {/*  Logo */}
      {/* <div className="w-full flex flex-col gap-1 sm:gap-0 sm:flex-row items-center justify-between px-1 mb-2">
        <Logo className="size-30 sm:size-20 md:size-25" />
      
      </div> */}
      {/* Date */}
      <span className="text-[0.6rem] sm:text-xs md:text-base text-slate-400 dark:text-slate-300 font-mono pt-1 self-end">
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
        <span className=" text-[0.45rem] sm:text-xs text-slate-400 dark:text-slate-300">
          {email}
        </span>
      </div>
    </div>
  );
}

export default Profile;
