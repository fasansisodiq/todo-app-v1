import React, { useRef, useState, useEffect } from "react";
import { IoCameraSharp } from "react-icons/io5";
import { useAuth } from "../../../../../authentication/useAuth";

function ProfilePicture({ profileClassName }) {
  const { profilePic, setProfilePic, updatePhotoURL, fullName, username } =
    useAuth();
  const [preview, setPreview] = useState(profilePic || "/default-profile.png");
  const fileInputRef = useRef(null);

  // Keep preview in sync with profilePic from context
  useEffect(() => {
    if (profilePic && typeof profilePic === "string") {
      setPreview(profilePic);
    }
    if (!profilePic) {
      setPreview("/default-profile.png");
    }
  }, [profilePic]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      setProfilePic(file);
      if (updatePhotoURL) {
        await updatePhotoURL(file);
      }
    }
  };

  return (
    <div className="w-full flex justify-start items-center font-semibold pt-7 pb-3 relative">
      <div className="flex flex-col items-center">
        <div
          className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex justify-center items-center font-bold rounded-full p-2 border-4 border-emerald-400 shadow-lg bg-white ${
            profileClassName || ""
          }`}
        >
          <img
            src={preview}
            alt="Profile"
            className="object-cover w-full h-full rounded-full"
          />
          <button
            type="button"
            className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2 rounded-full shadow hover:bg-emerald-700 transition"
            onClick={handleImageClick}
            title="Change Profile Picture"
            tabIndex={0}
          >
            <IoCameraSharp size={20} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            aria-label="Upload profile picture"
          />
        </div>
        <span className="mt-2 text-sm text-slate-500">Profile Picture</span>
      </div>
      <div className="flex flex-col items-start justify-center gap-1 pl-6">
        <span className="capitalize text-xl font-bold text-emerald-800">
          {fullName}
        </span>
        <span className="text-base text-slate-500 italic">
          @{username?.replace(/^@/, "")}
        </span>
      </div>
    </div>
  );
}

export default ProfilePicture;
