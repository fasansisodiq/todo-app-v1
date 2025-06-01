import { BiMenu } from "react-icons/bi";
import TodoNavigator from "../../utils/TodoNavigator";
import DisplayHoverMessage from "../../utils/DisplayHoverMessage";
import Logout from "./Logout";
import AddNewTaskBtn from "../../features/add-task/AddNewTaskBtn";

const navLinks = [
  {
    to: "progress",
    message: "See progress report",
    element: <span className="font-semibold tracking-wide">Progress</span>,
    mClassName:
      "w-28 h-4 sm:h-5 sm:w-30 sm:-right-9 sm:-bottom-6 md:h-6 md:w-36 md:-right-9 md:-bottom-8 -right-8 -bottom-6 lg:w-45 xl:w-50 lg:h-8 xl:h-10 xl:-right-14 xl:-bottom-12 lg:-right-10 lg:-bottom-10",
  },
  {
    to: "settings",
    message: "See settings menu",
    element: <span className="font-semibold tracking-wide">Settings</span>,
    mClassName:
      "w-26 h-4 sm:h-5 sm:w-29 sm:-right-9 sm:-bottom-6 md:h-6 md:w-34 md:-right-9 md:-bottom-8 -right-8 -bottom-6 lg:w-42 xl:w-48 lg:h-8 lg:-right-8 lg:-bottom-10 xl:h-10 xl:-right-14 xl:-bottom-12",
  },
  {
    to: "help",
    message: "Need help?",
    element: <span className="font-semibold tracking-wide">Help</span>,
    mClassName:
      "w-20 h-4 sm:h-5 sm:w-22 sm:-right-7 sm:-bottom-6 md:h-6 md:w-23 md:-right-7 md:-bottom-8 -right-8 -bottom-6 lg:w-30 xl:w-35 lg:h-8 lg:-right-12 lg:-bottom-10 xl:h-10 xl:-right-11 xl:-bottom-12",
  },
  {
    to: "menu",
    message: "More options",
    element: (
      <span className="flex items-center justify-center pt-1 sm:pt-0 text-sm sm:text-lg lg:text-2xl text-emerald-600 hover:text-emerald-800 transition-colors duration-200">
        <BiMenu />
      </span>
    ),
    mClassName:
      "w-21 h-4 sm:h-5 sm:w-24 sm:-right-9 sm:-bottom-7 md:h-6 md:w-27 md:-right-9 md:-bottom-9 -right-8 -bottom-6 lg:w-33 xl:w-38 lg:h-8 lg:-right-5 lg:-bottom-11 xl:h-10 xl:-right-16 xl:-bottom-14",
  },
];

function Navbar() {
  return (
    <nav
      className="
        sticky top-0 z-40 w-full
        bg-gradient-to-r from-emerald-50 via-white to-emerald-100
        border-b border-emerald-100 shadow-xl
        flex items-center justify-end  sm:gap-2 md:gap-4 lg:gap-8
        h-14 sm:h-16 md:h-20 px-1 sm:px-4 md:px-8 lg:px-12
        rounded-b-2xl
        backdrop-blur-md
        transition-all duration-300 text-[0.7rem] sm:text-[0.9rem]
      "
    >
      <AddNewTaskBtn />
      {navLinks.map((link) => (
        <TodoNavigator
          key={link.to}
          to={link.to}
          mClassName={link.mClassName}
          element={link.element}
          message={link.message}
        />
      ))}
      <DisplayHoverMessage
        element={
          <span className="flex items-center justify-center text-lg sm:text-xl text-emerald-600 hover:text-red-500 transition-colors duration-200">
            <Logout />
          </span>
        }
        message="Done with todo?"
        mClassName="w-21 h-4 sm:h-5 sm:w-30 sm:-right-4 sm:-bottom-6 md:h-6 md:w-31 md:-right-3 -right-8 -bottom-6 lg:w-33 xl:w-45 lg:h-8 lg:-right-5 lg:-bottom-11 xl:h-10 xl:-right-8 xl:-bottom-12"
      />
    </nav>
  );
}

export default Navbar;
