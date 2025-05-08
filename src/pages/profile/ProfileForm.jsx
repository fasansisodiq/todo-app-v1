import React from "react";

function ProfileForm() {
  return (
    <form className="flex flex-col items-center justify-center gap-4 w-full h-full p-4">
      <ProfilePicture />
      <FullName />
      <Username />
      <button
        type="submit"
        className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition duration-200"
      >
        Update Profile
      </button>
    </form>
  );
}

export default ProfileForm;
