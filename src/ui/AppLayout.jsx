import { useState } from "react";
import OverviewScreen from "./OverviewScreen";
import SideBar from "./sideBar";
import SuggestionScreen from "./SuggestionScreen";

function AppLayout() {
  const [show, setShow] = useState(true);
  return (
    <div className="w-full h-full  flex justify-between border-t-8 border-t-green-700 ">
      <SideBar setShow={setShow} />
      <OverviewScreen show={show} />
      {/* <SuggestionScreen /> */}
    </div>
  );
}

export default AppLayout;
// bg-[#183a1f]
