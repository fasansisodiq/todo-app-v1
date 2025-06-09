import { OperationProvider } from "../customHooks/operation/OperationProvider";
import Navbar from "./navBarUI/Navbar";
import SideBar from "./sideBarUI/SideBar";
import OverviewScreen from "./taskOverviewUI/OverviewScreen";
import { useDarkMode } from "../customHooks/DarkModeContext"; // Import your hook
import { useAuth } from "../authentication/useAuth";
import { useEffect, useState } from "react";
import Spinner from "../utils/Spinner";
import { Navigate } from "react-router";

function AppLayout() {
  const { darkMode, setDarkMode } = useDarkMode();
  const { currentUser } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (currentUser !== undefined) setAuthChecked(true);
  }, [currentUser]);

  if (!authChecked) return <Spinner />;
  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div
      className={`w-screen min-h-screen flex relative transition-colors duration-300 ${
        darkMode ? "bg-[#181f1b]" : "bg-[#f0f4f3]"
      } dark:bg-[#181f1b]`}
    >
      {/* Sticky Sidebar */}
      <aside className="sticky top-0 left-0 min-h-screen z-30 flex-shrink-0">
        <SideBar />
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-20 w-full border-b shadow-sm transition-colors duration-300 bg-white/80 dark:bg-[#232b25]/80 border-emerald-100 dark:border-emerald-900">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <OperationProvider>
            <OverviewScreen />
          </OperationProvider>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
