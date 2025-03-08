import { Outlet } from "react-router";
import TaskOverviewHeader from "./TaskOverviewHeader";

function OverviewScreen({ show }) {
  return (
    <main className="w-full h-screen flex flex-col  items-center bg-[#f0f4f3]  ">
      {show && <TaskOverviewHeader />}
      <Outlet />
    </main>
  );
}

export default OverviewScreen;
