import ProfileItem from "./ProfileItem";

function FullName({ value, onChange }) {
  return (
    <ProfileItem
      label="Full Name"
      type="text"
      id="fullName"
      name="fullName"
      value={value}
      onChange={onChange}
      placeholder="Enter your full name"
      className="w-full rounded-lg border border-emerald-200 dark:border-yellow-100 dark:bg-[#181f1b] dark:focus:border-yellow-400 dark:ring-yellow-400 focus:border-emerald-500 focus:ring-emerald-100 px-4 py-2 text-base transition-all shadow-sm bg-white"
      labelClassName="block mb-1 text-emerald-700 dark:text-yellow-200 font-semibold capitalize"
    />
  );
}

export default FullName;
