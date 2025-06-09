import { Link } from "react-router";

function AccountSectionItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-yellow-50 dark:hover:bg-yellow-100 dark:text-emerald-600 font-semibold px-4 py-2 rounded-lg shadow dark:shadow-lg transition-all duration-150"
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
}

export default AccountSectionItem;
