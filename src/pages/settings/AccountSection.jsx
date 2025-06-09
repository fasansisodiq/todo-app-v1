import React from "react";
import { Link, useNavigate } from "react-router";
import { FiUser, FiLock, FiLogOut, FiMail } from "react-icons/fi";
import { useAuth } from "../../authentication/useAuth";
import AccountSectionItem from "./utils/AccountSectionItem";
const sections = [
  {
    to: "/profile",
    icon: <FiUser />,
    label: "View Profile",
  },
  {
    to: "/settings/change-password",
    icon: <FiLock />,
    label: "Change Password",
  },
  {
    to: "/settings/change-email",
    icon: <FiMail />,
    label: "Change Email",
  },
];
function AccountSection() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  // Function to sign out the current user
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-bold text-slate-700 dark:text-yellow-300/70">
        Account
      </h2>
      <div className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <AccountSectionItem
            key={index}
            to={section.to}
            icon={section.icon}
            label={section.label}
          />
        ))}
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-all text-sm w-fit"
        onClick={handleLogout}
      >
        <FiLogOut className="text-lg" />
        Log out
      </button>
    </div>
  );
}

export default AccountSection;
