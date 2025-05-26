import React from "react";
import { BiTime } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { useAuth } from "../../../../authentication/useAuth";

function AccountActivities() {
  const { lastLogin, accountStatus, emailVerified } = useAuth();

  const activities = [
    {
      label: "Last Login",
      icon: <BiTime />,
      value: lastLogin ? new Date(lastLogin).toLocaleString() : "N/A",
    },
    {
      label: "Account Status",
      icon: <FaUserCheck />,
      value: accountStatus || "Active",
    },
    {
      label: "Email Verified",
      icon: <MdVerifiedUser />,
      value: emailVerified ? "Yes" : "No",
    },
  ];

  return (
    <div className="flex flex-col items-start p-6 bg-white rounded shadow">
      <div className="flex flex-col gap-3 text-slate-600 text-sm w-full">
        {activities.map(({ label, icon, value }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-lg">{icon}</span>
            <span className="capitalize">{label}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountActivities;
