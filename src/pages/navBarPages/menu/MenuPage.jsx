import {
  BsBarChart,
  BsGear,
  BsQuestionCircle,
  BsFilter,
  BsPerson,
} from "react-icons/bs";
import BackBtn from "../../../utils/BackBtn";
import { Link } from "react-router";

function MenuPage() {
  const menuNavLinkItems = [
    {
      to: "progress",
      element: "Progress",
      icon: <BsBarChart className="text-xl mr-2" />,
    },
    {
      to: "settings",
      element: "Settings",
      icon: <BsGear className="text-xl mr-2" />,
    },
    {
      to: "help",
      element: "Help",
      icon: <BsQuestionCircle className="text-xl mr-2" />,
    },
    {
      to: "filter",
      element: "Filter",
      icon: <BsFilter className="text-xl mr-2" />,
    },
    {
      to: "profile",
      element: "Profile",
      icon: <BsPerson className="text-xl mr-2" />,
    },
  ];

  return (
    <div className=" mt-4 absolute flex flex-col justify-start p-4 pl-5 gap-2 w-80 h-120 shadow-2xl border-4 border-white dark:border-emerald-900 bg-white dark:bg-[#232b25] rounded-2xl lg:text-2xl transition-colors duration-300">
      <div className="flex justify-start items-center lg:gap-5 gap-2 w-full pb-2 lg:pb-4">
        <BackBtn />
        <h1 className="text-center font-semibold text-slate-800 dark:text-yellow-200 ">
          Menu
        </h1>
      </div>
      {menuNavLinkItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center gap-2 py-2 px-3 rounded-lg text-slate-800 dark:text-yellow-200 hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-colors duration-150"
        >
          {item.icon}
          <span>{item.element}</span>
        </Link>
      ))}
    </div>
  );
}

export default MenuPage;
