
import OverviewScreen from "./OverviewScreen";
import SideBar from "./sideBar";
import SuggestionScreen from "./SuggestionScreen";
import Navbar from "./Navbar";


function AppLayout() {

  return (
    <div  className={`w-screen h-screen  flex justify-between border-t-8 border-t-green-700  relative`}>
     <SideBar  />
      <div className=" w-full flex flex-col">
         <Navbar />
        <OverviewScreen  />
        
      </div>
    </div>
  );
}

export default AppLayout;

