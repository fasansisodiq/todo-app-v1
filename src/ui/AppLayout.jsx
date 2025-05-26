import { OperationProvider } from "../customHooks/operation/OperationProvider";
import Navbar from "./navBarUI/Navbar";
import SideBar from "./sideBarUI/SideBar";
import OverviewScreen from "./taskOverviewUI/OverviewScreen";

function AppLayout() {
  return (
    <div className="w-screen min-h-screen bg-[#f0f4f3] flex relative">
      {/* Sticky Sidebar */}
      <aside className="sticky top-0 left-0 min-h-screen z-30 flex-shrink-0">
        <SideBar />
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur border-b border-emerald-100 shadow-sm">
          <Navbar />
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
