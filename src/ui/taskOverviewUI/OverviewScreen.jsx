import { Outlet } from "react-router";
import Spinner from "../../utils/Spinner";

function OverviewScreen() {
  return (
    <main className="w-full h-full flex flex-col text-stone-800  items-center bg-[#f0f4f3]  ">
      {<Spinner text={"loading"} /> && <Outlet />}
    </main>
  );
}

export default OverviewScreen;
