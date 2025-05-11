import Resizer from "@meghoshpritam/react-image-file-resizer";

import { useRef } from "react";
import { IoCameraSharp } from "react-icons/io5";
import { HiPhoto } from "react-icons/hi2";
import { Link } from "react-router";

import { useAuth } from "../../../../../authentication/useAuth";
import Label from "../../../../../utils/Label";
import CustomButton from "../../../../../utils/CustomButton";

function ProfilePicture({ profileClassName }) {
  const imgRef = useRef(null);

  const { profilePic, setProfilePic, updatePhotoURL } = useAuth();

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer({
        file,
        maxWidth: 300,
        maxHeight: 300,
        compressFormat: "JPEG",
        quality: 100,
        rotation: 0,
        keepAspectRatio: true,
        responseUriFunc: (uri) => {
          resolve(uri);
        },
        outputType: "base64",
      });
    });
  const onChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];
      // const image = resizeFile(file);
      setProfilePic(file);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (file === null) {
  //     const success = await updatePhotoURL(file);
  //     if (success) {
  //       console.log("Profile picture updated successfully!");
  //     } else {
  //       console.error("Failed to update profile picture.");
  //     }
  //   }
  // };
  return (
    <form className="flex flex-col gap-1 ">
      <Label name={"profilePic"}>
        <span
          className={`text-emerald-500 absolute lg:text-lg p-1 bg-emerald-100  cursor-pointer 
          w-2.5 h-2.5 lg:w-8 lg:h-8 flex justify-center items-center rounded-full  border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all duration-300 ease-in-out ${
            profileClassName
              ? profileClassName
              : "right-14 top-2 lg:left-38 lg:top-45"
          }`}
        >
          {profilePic ? (
            <CustomButton
              type={"primary"}
              label={"upload"}
              size={"sm"}
              onClick={updatePhotoURL}
            />
          ) : (
            <IoCameraSharp />
          )}
        </span>
      </Label>
      <input
        type="file"
        ref={imgRef}
        id="profilePic"
        name="profilePic"
        style={{ display: "none" }}
        accept="image/*"
        defaultValue={profilePic}
        onChange={onChange}
      />

      {!profilePic && (
        <Link
          to={"/edit-profile"}
          className=" text-sm flex flex-col justify-center items-center gap-1"
          id="file_input_help"
        >
          <p className="lg:text-5xl ">
            <HiPhoto />
          </p>
          <p className="text-center">SVG, PNG, or JPG (MAX. 800x400px).</p>
        </Link>
      )}
    </form>
  );
}

export default ProfilePicture;
