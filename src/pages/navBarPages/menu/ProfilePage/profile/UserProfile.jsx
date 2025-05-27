import { Link, useNavigate } from "react-router";

import AboutUser from "./AboutUser";
import UserAdress from "./UserAddress";
import { BsChevronLeft } from "react-icons/bs";
import ProfileDesign from "./ProfileDesign";
import ProfilePicture from "./ProfilePicture";
import AccountActivities from "../../filterPage/AccountActivities";
import TaskRelatedStats from "../TaskRelatedStats";
import ProfileHider from "../ProfileHider";
import { useTaskStats } from "../../../progress/Utils";
import DeleteAccount from "./deleteAccount";

function UserProfile() {
  const navigate = useNavigate();
  const { totalTasks, completedTasks, activeTasks, taskListNum } =
    useTaskStats();

  return (
    <ProfileDesign bg="bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="flex flex-col min-h-screen px-4 py-6 rounded-xl shadow-2xl max-w-2xl mx-auto border border-emerald-100 font-sans text-base">
        {/* Header */}
        <span className="flex justify-between items-center w-full mb-2">
          <span
            role="button"
            onClick={() => navigate("/layout")}
            className="text-slate-500 cursor-pointer text-[1.7rem] lg:text-2xl hover:text-emerald-700 transition"
            title="Back"
          >
            <BsChevronLeft />
          </span>
          <Link
            to={"/edit-profile"}
            className="w-fit self-end capitalize border border-emerald-400 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white py-1 px-4 rounded-lg text-emerald-700 cursor-pointer text-base font-semibold shadow transition"
          >
            Edit Profile
          </Link>
        </span>
        {/* Title */}
        <h1 className="self-center capitalize text-emerald-700 font-extrabold text-2xl mt-2 tracking-wide drop-shadow">
          My Profile
        </h1>
        {/* Profile Avatar, Name & Username */}
        <ProfilePicture />
        {/* About User */}
        <ProfileHider header="about">
          <AboutUser />
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
        <ProfileHider header="">
          <UserAdress />
        </ProfileHider>
        {/* Delete Account */}
        <div className="mt-auto mb-8 flex justify-center">
          <DeleteAccount />
        </div>
      </div>
    </ProfileDesign>
  );
}

export default UserProfile;
