import { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import DisplayHoverMessage from "../../utils/DisplayHoverMessage";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useAuth } from "../../authentication/useAuth";
import ProfilePicture from "../../pages/navBarPages/menu/ProfilePage/profile/ProfilePicture";

function Profile() {
  const { date } = useTasks();
  const { username, fullName, profilePic, email } = useAuth();
  const [notification, setNotification] = useState(true);

  // Greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="relative w-full max-w-xs flex flex-col px-1 md:px-5  py-6 items-center gap-6 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl shadow-2xl font-sans border border-emerald-100">
      {/* Greeting */}
      <span className="font-semibold text-[0.6rem] md:text-base lg:text-xl text-emerald-800 max-w-full text-center tracking-wide">
        {getGreeting()},{" "}
        <span className=" font-bold text-emerald-600">
          {username ? `${username.replace(/^@/, "")}` : fullName || email}
          !!
        </span>
      </span>
      {/* Header */}
      <div className="w-full flex flex-col justify-between items-center text-xs md:text-lg pb-2">
        <h1 className="opacity-90 font-extrabold tracking-widest text-emerald-700 text-lg md:text-xl uppercase drop-shadow">
          todopro
        </h1>
        <span className="text-xs md:text-base text-slate-400 font-mono pt-1">
          {date}
        </span>
      </div>
      {/* Profile Avatar & Name */}
      <div className="relative flex flex-col items-center gap-2 w-full">
        <div className="flex flex-col items-center pt-6 sm:pt-0">
          <span className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24  flex  justify-center items-center font-bold rounded-full border-4 border-emerald-400 shadow-lg bg-gradient-to-br from-white to-emerald-50 overflow-hidden ring-2 ring-emerald-200">
            {profilePic}
          </span>
          <span className="mt-2 sm:text-lg font-bold text-[0.7rem] text-emerald-700 capitalize tracking-wide">
            {fullName || username || email}
          </span>
          <span className="text-xs text-slate-400">{email}</span>
        </div>
        {/* Notification Bell */}
        {notification && (
          <Link
            to={"/layout/notification"}
            className="absolute sm:top-0 -top-6 right-0 "
          >
            <DisplayHoverMessage
              element={
                <span className="font-bold relative">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-emerald-500 drop-shadow">
                    <CiBellOn />
                  </p>
                  <span className="absolute -top-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-[0.5rem] text-white font-bold shadow">
                    25
                  </span>
                </span>
              }
              message={"See all notifications"}
              mClassName="w-36 h-8 text-xs"
            />
          </Link>
        )}
      </div>
      {/* Divider */}
      <div className="w-full border-t border-emerald-100 my-2"></div>
      {/* Quick Actions (optional, for modern UI) */}
      <div className="flex w-full justify-around gap-2 mt-2 text-[0.7rem] sm:text-xs">
        <Link
          to="/profile"
          className="bg-emerald-100 hover:bg-emerald-200 text-center text-emerald-700 font-semibold px-1 py-0.5 sm:px-4 sm:py-2 rounded-lg shadow transition-all duration-150 "
        >
          View Profile
        </Link>
        <Link
          to="/edit-profile"
          className="bg-white border border-emerald-300 text-center hover:bg-emerald-600 hover:text-white text-emerald-700 font-semibold px-1 py-0.5 sm:px-4 sm:py-2 rounded-lg shadow transition-all duration-150 "
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default Profile;
