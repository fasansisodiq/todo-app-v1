import { useDarkMode } from "../customHooks/DarkModeContext";

function Logo({ className }) {
  const { darkMode } = useDarkMode();
  return (
    <img
      className={`${className}`}
      src={`${
        darkMode ? "/todopro-dark-removebg.png" : "/todopro-light-small.png"
      }`}
      alt="app logo"
    />
  );
}

export default Logo;
