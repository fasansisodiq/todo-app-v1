import { useAuth } from "../../authentication/useAuth";
import Resizer from "@meghoshpritam/react-image-file-resizer";
import Label from "../../utils/Label";

function ProfilePicture() {
  const { profilePic, updatePhotoURL } = useAuth();

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
  const onChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      updatePhotoURL(file);

      console.log(image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Label name={"profilePic"}> Profile Picture:</Label>
      <input
        type="file"
        id="profilePic"
        name="profilePic"
        className="file:bg-emerald-500  file:px-2 file:h-12 file:font-semibold border border-gray-300 rounded-full h-6 md:h-8 lg:h-12 cursor-pointer bg-white file:text-white w-50 sm:w-65 md:w-80 lg:w-170 xl:w-170"
        accept="image/*"
        placeholder="Upload your profile picture"
        defaultValue={profilePic}
        onChange={onChange}
      />
      <p
        className="mt-1 text-sm lg:text-xl text-gray-700 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p>
    </div>
  );
}

export default ProfilePicture;
