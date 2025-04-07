import OverviewScreen from "./OverviewScreen";
import SideBar from "./sideBar";
import Navbar from "./Navbar";
import { useTodos } from "../customHooks/TodosContext";

function AppLayout() {
  const {onClose,isOpen} = useTodos()
  return (
    <div
      onClick={isOpen && onClose}
      className={`w-screen h-screen  flex justify-between border-t-8 border-t-green-700  relative 
       `}
    >
      <SideBar />
      <div className=" w-full flex flex-col">
        <Navbar />
        <OverviewScreen />
      </div>
    </div>
  );
}

export default AppLayout;
// ${
//         open ? `backdrop-blur-sm visible bg-slate-300/10` : "invisible"
//       }
// ${
//           open ? "scale-100 opacity-100" : "scale-125 opacity-0"
//         }
