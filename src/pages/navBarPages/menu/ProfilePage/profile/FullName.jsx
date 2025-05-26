import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function FullName() {
  const { fullName, setFullName } = useAuth();

  return (
    <ProfileItem
      label="Full Name"
      type="text"
      id="fullName"
      name="fullName"
      defaultValue={fullName}
      setFunc={setFullName}
      placeholder="Enter your full name"
      className="w-full rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-emerald-100 px-4 py-2 text-base transition-all shadow-sm bg-white"
      labelClassName="block mb-1 text-emerald-700 font-semibold capitalize"
    />
  );
}

export default FullName;
