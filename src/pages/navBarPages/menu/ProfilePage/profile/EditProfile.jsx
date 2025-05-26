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
import Role from "./Role";

function EditProfile() {
  const navigate = useNavigate();
  const { updateUserData } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    await updateUserData(data);
    navigate("/profile");
  }

  return (
    <ProfileDesign bg="bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="flex flex-col items-center max-w-xl mx-auto w-full rounded-xl shadow-lg p-6 mt-6 font-sans">
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 mb-6 tracking-wide drop-shadow self-center">
          Edit Profile
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4 w-full"
        >
          <FullName />
          <Username />
          <Role />
          <StreetAddress />
          <PhoneNumber />
          <Dob />
          <City />
          <State />
          <Country />
          <ZipCode />

          <div className="flex justify-center gap-4 w-full pt-4">
            <CustomButton
              label="Cancel"
              size="md"
              type="secondary"
              onClick={() => navigate(-1)}
            />
            <CustomButton label="Update" size="md" type="primary" />
          </div>
        </form>
      </div>
    </ProfileDesign>
  );
}

export default EditProfile;
