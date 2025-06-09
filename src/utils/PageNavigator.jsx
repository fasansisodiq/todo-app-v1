import { NavLink } from "react-router-dom";

function PageNavigator({ to, children, activeClassName, notActiveClassName }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `w-full min-h-fit text-slate-800 dark:text-yellow-200 font-semibold
               bg-white dark:bg-[#232b25] sm:p-1 
               border-x-3 lg:border-x-6 border-x-green-500 dark:border-x-yellow-400
               transition-all duration-300 ${activeClassName} shadow`
          : `h-5 sm:min-h-fit hover:bg-slate-300 dark:hover:bg-[#232b25] dark:text-slate-300 ${notActiveClassName}`
      }
    >
      {children}
    </NavLink>
  );
}

export default PageNavigator;
