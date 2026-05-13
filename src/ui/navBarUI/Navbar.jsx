import { BiMenu } from "react-icons/bi";
import TodoNavigator from "../../utils/TodoNavigator";
import DisplayHoverMessage from "../../utils/DisplayHoverMessage";
import Logout from "./Logout";
import AddNewTaskBtn from "../../features/add-task/AddNewTaskBtn";
import StickyNav from "../../utils/StickyNaV";
import MenuPage from "../../pages/navBarPages/menu/MenuPage";
import { useState } from "react";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false)
  function handleMenuToggle(){
    setOpenMenu(!openMenu)
  }
  return (
    <StickyNav>
      <AddNewTaskBtn />
      <>  
      <TodoNavigator
        to={"menu"}
        message={"More options"}
        element={
         
          <span className=" flex items-center justify-center  text-xl lg:text-2xl text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
          onClick={handleMenuToggle}
          >
            <BiMenu size-10 />
          </span>
          
        
        }
        
      />
      <div className="absolute top-16 z-5 right-90" >{openMenu && <MenuPage onMenuOpen={handleMenuToggle}/>}</div>
      </>
    

      <DisplayHoverMessage
        element={
          <span className="flex items-center justify-center text-lg sm:text-xl text-emerald-600 dark:text-yellow-300 hover:text-red-500 dark:hover:text-yellow-400 transition-colors duration-200">
            <Logout />
          </span>
        }
        message="Done with todo?"
        mClassName="w-21 h-4 sm:h-5 sm:w-30 sm:-right-4 sm:-bottom-6 md:h-6 md:w-31 md:-right-3 -right-8 -bottom-6 lg:w-33 xl:w-45 lg:h-8 lg:-right-5 lg:-bottom-11 xl:h-10 xl:-right-8 xl:-bottom-12"
      />
    </StickyNav>
  );
}

export default Navbar;
