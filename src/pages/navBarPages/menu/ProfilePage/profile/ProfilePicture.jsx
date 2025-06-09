import { IoCameraSharp } from "react-icons/io5";
import { useAuth } from "../../../../../authentication/useAuth";

function ProfilePicture({ profileClassName }) {
  const {
    fullName,
    username,
    profilePic,
    fileInputRef,
    handleFileChange,
    handleImageClick,
  } = useAuth();

  return (
    <div className="w-full flex justify-start items-center font-semibold pt-7 pb-3 relative">
      <div className="flex flex-col items-center">
        <div
          className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex justify-center items-center font-bold rounded-full p-2 border-4 border-emerald-400 dark:border-yellow-400 dark:bg-yellow-50 shadow-lg bg-white ${
            profileClassName || ""
          }`}
        >
          <img
            src={profilePic || "/default-profile.png"}
            alt="Profile"
            className="object-cover w-full h-full rounded-full"
          />
          <button
            type="button"
            className="absolute bottom-2 right-2 bg-emerald-500 dark:bg-yellow-500 dark:text-yellow-50 text-white p-2 rounded-full shadow hover:bg-emerald-700 dark:hover:bg-yellow-700 transition"
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
        <span className="mt-2 text-sm text-slate-500 dark:text-emerald-300/50">
          Profile Picture
        </span>
      </div>
      <div className="flex flex-col items-start justify-center gap-1 pl-6">
        <span className="capitalize text-xl font-bold text-emerald-800 dark:text-emerald-300/70">
          {fullName}
        </span>
        <span className="text-base text-slate-500 dark:text-yellow-50/50 italic">
          @{username?.replace(/^@/, "")}
        </span>
      </div>
    </div>
  );
}

export default ProfilePicture;
