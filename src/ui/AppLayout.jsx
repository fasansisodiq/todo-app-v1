import { OperationProvider } from "../customHooks/operation/OperationProvider";
import Navbar from "./navBarUI/Navbar";
import SideBar from "./sideBarUI/SideBar";
import OverviewScreen from "./taskOverviewUI/OverviewScreen";
import { useDarkMode } from "../customHooks/DarkModeContext"; // Import your hook
import { useAuth } from "../authentication/useAuth";
import { useEffect, useState } from "react";
import Spinner from "../utils/Spinner";
import { Navigate } from "react-router";
import { useTasks } from "../customHooks/tasks/useTasks";

function AppLayout() {
  const { darkMode, setDarkMode } = useDarkMode();
  const { currentUser } = useAuth();
  const { ToastContainer } = useTasks();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (currentUser !== undefined) setAuthChecked(true);
  }, [currentUser]);

  if (!authChecked) return <Spinner />;
  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div
      className={`w-screen min-h-screen flex flex-col relative transition-colors duration-300 pb-7 ${
        darkMode ? "bg-[#181f1b]" : "bg-[#f0f4f3]"
      } dark:bg-[#181f1b]`}
    >
      {/* Sticky Navbar */}
      <>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </>

      {/* Main Content Area */}
      <div className="flex-1 flex  min-h-screen mt-15 sm:mt-25">
        {/* Sticky Sidebar */}
        <aside className=" min-h-full ">
          <SideBar />
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <OperationProvider>
            <OverviewScreen />
          </OperationProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
