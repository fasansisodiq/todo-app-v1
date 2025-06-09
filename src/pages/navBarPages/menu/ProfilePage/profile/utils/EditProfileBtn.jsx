import { Link } from "react-router";

function EditProfileBtn() {
  return (
    <Link
      to={"/edit-profile"}
      className="w-fit self-end capitalize border border-emerald-400 dark:text-emerald-300 dark:border-yellow-800 dark:bg-yellow-50 dark:hover:text-yellow-50 dark:hover:bg-yellow-500/60  dark:hover:border-yellow-300 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white py-1 px-4 rounded-lg text-emerald-700 cursor-pointer text-base font-semibold shadow transition"
    >
      Edit Profile
    </Link>
  );
}

export default EditProfileBtn;
