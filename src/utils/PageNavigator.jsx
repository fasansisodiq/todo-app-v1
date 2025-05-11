import { NavLink } from "react-router-dom";

function PageNavigator({ to, children, activeClassName, notActiveClassName }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `h-5 md:min-h-fit  text-slate-800 font-semibold
               bg-white p-1 
              border-x-3 
              lg:border-x-6 border-x-green-500
              transition-all duration-3 ${activeClassName} shadow `
          : `h-5 sm:min-h-fit  hover:bg-slate-300 ${notActiveClassName}`
      }
    >
      {children}
    </NavLink>
  );
}

export default PageNavigator;
