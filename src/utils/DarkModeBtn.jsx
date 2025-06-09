import { IoMoon, IoSunny } from "react-icons/io5";
import { useDarkMode } from "../customHooks/DarkModeContext";

// Modern dark mode toggle button
function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      onClick={toggleDarkMode}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 shadow-md
          ${
            darkMode
              ? "bg-emerald-900 text-yellow-300"
              : "bg-emerald-100 text-emerald-600"
          }
          hover:scale-105 hover:shadow-lg focus:outline-none`}
      aria-label="Toggle dark mode"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="absolute inset-0 flex items-center justify-center">
        {darkMode ? (
          <IoSunny className="w-6 h-6" />
        ) : (
          <IoMoon className="w-6 h-6" />
        )}
      </span>
    </button>
  );
}

export default DarkModeToggle;
