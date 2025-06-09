import { Link, useNavigate } from "react-router";
import { useAuth } from "../../../../../authentication/useAuth";
import AboutUser from "./AboutUser";
import UserAdress from "./UserAddress";
import { BsChevronLeft } from "react-icons/bs";
import ProfileDesign from "./ProfileDesign";
import ProfilePicture from "./ProfilePicture";
import AccountActivities from "../../filterPage/AccountActivities";
import TaskRelatedStats from "../TaskRelatedStats";
import ProfileHider from "../ProfileHider";
import { useTaskStats } from "../../../progress/Utils";
import BackBtn from "../../../../../utils/BackBtn";
import DarkModeToggle from "../../../../../utils/DarkModeBtn";
import EditProfileBtn from "./utils/EditProfileBtn";
// import DeleteAccount from "./deleteAccount";

function UserProfile() {
  const { profile } = useAuth();
  const { totalTasks, completedTasks, activeTasks, taskListNum } =
    useTaskStats();

  if (!profile) {
    return (
      <ProfileDesign>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-xl text-slate-500 dark:text-yellow-200">
            No profile data found.
          </h2>
        </div>
      </ProfileDesign>
    );
  }

  return (
    <ProfileDesign
      bg="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:bg-[#232b25]  dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]
        dark:border-yellow-100 dark:shadow-lg"
    >
      <div className="relative flex flex-col min-h-screen px-4 py-6 rounded-xl shadow-2xl max-w-2xl mx-auto border border-emerald-100 font-sans text-base">
        <span className=" absolute top-0 -right-34 ">
          <DarkModeToggle />
        </span>
        {/* Header */}
        <span className="flex justify-between items-center w-full mb-2">
          <BackBtn />
          <EditProfileBtn />
        </span>
        {/* Title */}
        <h1 className="self-center capitalize text-emerald-700 dark:text-emerald-300 font-extrabold text-2xl mt-2 tracking-wide drop-shadow">
          My Profile
        </h1>
        {/* Profile Avatar, Name & Username */}
        <ProfilePicture profile={profile} />
        {/* About User */}
        <ProfileHider header="about">
          <AboutUser profile={profile} />
        </ProfileHider>
        {/* Task Related Stats */}
        <ProfileHider header="Task Stats">
          <TaskRelatedStats
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            activeTasks={activeTasks}
            totalLists={taskListNum}
          />
        </ProfileHider>
        {/* Account Activities */}
        <ProfileHider header=" Account & Activity">
          <AccountActivities />
        </ProfileHider>
        {/* Address */}
        <ProfileHider header="address">
          <UserAdress profile={profile} />
        </ProfileHider>
        {/* Delete Account */}
        {/* <div className="mt-auto mb-8 flex justify-center">
          <DeleteAccount />
        </div> */}
      </div>
    </ProfileDesign>
  );
}

export default UserProfile;
