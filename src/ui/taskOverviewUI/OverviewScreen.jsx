import { Outlet } from "react-router";

function OverviewScreen() {
  return (
    <main className="w-full h-full flex flex-col text-stone-800  items-center bg-[#f0f4f3]  ">
      <Outlet />
    </main>
  );
}

export default OverviewScreen;
