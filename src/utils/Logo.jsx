import { useDarkMode } from "../customHooks/DarkModeContext";

function Logo({ size }) {
  const { darkMode } = useDarkMode();
  return (
    <img
      className={` ${size}`}
      src={`${
        darkMode
          ? "/public/todopro-dark-removebg.png"
          : "/public/todopro-light-removebg.png"
      }`}
      alt="app logo"
    />
  );
}

export default Logo;
