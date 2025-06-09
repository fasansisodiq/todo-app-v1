import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../authentication/useAuth";
import EditProfileBtn from "../navBarPages/menu/ProfilePage/profile/utils/EditProfileBtn";

function getInitials(name, username, email) {
  if (name) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (username) return username[0].toUpperCase();
  if (email) return email[0].toUpperCase();
  return "U";
}

function ProfileSection() {
  const { username, email, fullName, profilePic } = useAuth();
  const initials = getInitials(fullName, username, email);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-slate-700 dark:text-emerald-300/70">
        Profile
      </h2>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-yellow-100 flex items-center justify-center text-3xl font-bold text-emerald-600 dark:text-yellow-600 overflow-hidden">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            initials
          )}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-800 dark:text-yellow-100/80">
            {username}
          </div>
          <div className="text-slate-500 text-sm dark:text-yellow-100/60">
            {email}
          </div>
        </div>
        <EditProfileBtn />
      </div>
    </div>
  );
}

export default ProfileSection;
