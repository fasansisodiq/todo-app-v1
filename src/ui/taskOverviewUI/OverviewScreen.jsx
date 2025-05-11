import { Outlet } from "react-router";

function OverviewScreen() {
  return (
    <main className="w-full min-h-full flex flex-col text-stone-800  items-center   ">
      <Outlet />
    </main>
  );
}

export default OverviewScreen;
