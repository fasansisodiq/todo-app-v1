import { useNavigate } from "react-router";

import FullName from "./FullName";
import ProfileDesign from "./ProfileDesign";
import Username from "./Username";
import City from "./City";
import Country from "./Country";
import State from "./State";
import ZipCode from "./ZipCode";
import StreetAddress from "./StreetAddress";
import Dob from "./Dob";
import PhoneNumber from "./PhoneNumber";
import { useAuth } from "../../../../../authentication/useAuth";
import CustomButton from "../../../../../utils/CustomButton";

function EditProfile() {
  const navigate = useNavigate();
  const { updateUserData } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    await updateUserData(data);

    navigate("/profile");
  }

  return (
    <ProfileDesign bg={"bg-slate-50"}>
      {/* <div className="  h-fit bg-[#c0efe3] w-1/2 flex justify-center items-center"></div> */}
      <h1 className="self-center capitalize text-lg md:text-2xl lg:text-3xl text-gray-600 font-bold">
        edit profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 w-full h-full p-4"
      >
        <FullName />
        <Username />
        <StreetAddress />
        <PhoneNumber />
        <Dob />
        <City />
        <State />
        <Country />
        <ZipCode />
        <div className="flex  justify-center gap-2 lg:gap-4 w-full pt-4 lg:pt-6">
          <CustomButton
            label={"cancel"}
            size={"md"}
            type={"secondary"}
            onClick={() => navigate(-1)}
          />
          <CustomButton label={"Update"} size={"md"} type={"primary"} />
        </div>
      </form>
    </ProfileDesign>
  );
}

export default EditProfile;
