import { Link } from "react-router";

const NavBtn = ({ to, label, onClick }) => {
  return (
    <Link
      to={`/${to}`}
      className={`
      `}
    >
      <button
        type="button"
        onClick={onClick}
        className={`px-2 py-1 sm:px-6 sm:py-2 rounded-2xl font-semibold shadow-md hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 transition-all duration-200 text-sm sm:text-xl flex items-center justify-center gap-2
          ${
            label === "Login"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-300 focus:ring-emerald-200"
              : "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white focus:ring-emerald-400"
          }
        `}
      >
        {label}
      </button>
    </Link>
  );
};

export default NavBtn;
