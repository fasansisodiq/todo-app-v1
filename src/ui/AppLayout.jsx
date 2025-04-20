import { OperationProvider } from "../customHooks/operation/OperationProvider";
import Navbar from "./navBarUI/Navbar";
import SideBar from "./sideBarUI/SideBar";
import OverviewScreen from "./taskOverviewUI/OverviewScreen";

function AppLayout() {
  return (
    <div
      className={`w-screen h-screen  flex justify-between border-t-8 border-t-green-700  relative 
       `}
    >
      <SideBar />
      <div className=" w-full flex flex-col">
        <Navbar />
        <OperationProvider>
          <OverviewScreen />
        </OperationProvider>
      </div>
    </div>
  );
}

export default AppLayout;
