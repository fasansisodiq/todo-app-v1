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
import DarkModeToggle from "../../../../../utils/DarkModeBtn";
import BackBtn from "../../../../../utils/BackBtn";

function EditProfile() {
  const navigate = useNavigate();
  const { updateUserData, profile, setProfile, setRole } = useAuth();
  if (!profile) {
    return (
      <ProfileDesign>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-xl text-slate-500">Loading profile...</h2>
        </div>
      </ProfileDesign>
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await updateUserData(profile);
    if (profile.role !== undefined) {
      setRole(profile.role || "user");
    }
    setProfile(profile);
    navigate("/profile");
  }

  return (
    <ProfileDesign
      bg="bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:bg-[#181f1b] dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]
        dark:border-emerald-900 dark:shadow-lg"
    >
      <span className="w-full flex justify-between items-center p-4">
        <span className="text-left">
          <BackBtn />
        </span>
        <DarkModeToggle />
      </span>
      <div className="flex flex-col items-center max-w-xl mx-auto w-full rounded-xl shadow-lg p-6 mt-6 font-sans">
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 mb-6 tracking-wide drop-shadow self-center">
          Edit Profile
        </h1>
        <form
          id="editProfileForm"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4 w-full"
        >
          <FullName
            value={profile.fullName || ""}
            onChange={(e) =>
              setProfile({ ...profile, fullName: e.target.value })
            }
          />
          <Username
            value={profile.username || ""}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <Role
            value={profile.role || ""}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          />
          <PhoneNumber
            value={profile.phoneNumber || ""}
            onChange={(e) =>
              setProfile({ ...profile, phoneNumber: e.target.value })
            }
          />
          <Dob
            value={profile.dateOfBirth || ""}
            onChange={(e) =>
              setProfile({ ...profile, dateOfBirth: e.target.value })
            }
          />
          <Country
            value={profile.country || ""}
            onChange={(e) =>
              setProfile({ ...profile, country: e.target.value })
            }
          />
          <State
            value={profile.state || ""}
            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
          />
          <City
            value={profile.city || ""}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
          />
          <StreetAddress
            value={profile.streetAddress || ""}
            onChange={(e) =>
              setProfile({ ...profile, streetAddress: e.target.value })
            }
          />
          <ZipCode
            value={profile.zipCode || ""}
            onChange={(e) =>
              setProfile({ ...profile, zipCode: e.target.value })
            }
          />

          <div className="flex justify-center gap-4 w-full pt-4">
            <CustomButton
              label="Cancel"
              size="md"
              btnType="secondary"
              onClick={() => navigate(-1)}
            />
            <CustomButton
              label="Update"
              size="md"
              type="submit"
              btnType="primary"
            />
          </div>
        </form>
      </div>
    </ProfileDesign>
  );
}

export default EditProfile;
