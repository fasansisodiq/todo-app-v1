
import { BiMenu } from "react-icons/bi"
import TodoNavigator from "../utils/TodoNavigator";
import AddNewTaskBtn from "./AddNewTaskBtn";
import DisplayHoverMessage from "../utils/DisplayHoverMessage";
import Logout from "./Logout";


function Navbar() {
  return (
    <nav className="bg-slate-50 border-b-1 border-b-slate-500 w-full h-10 sm:h-12 md:h-14 lg:h-20 xl:h-20 shadow-2xl text-[0.6rem] sm:text-lg md:text-xl lg:text-2xl xl:text-2xl flex justify-end items-center gap-1 sm:gap-2 md:gap3 lg:gap-4 xl:gap-5 capitalize px-4 sm:px-6 md:px-8 lg:px-10  lg:pr-18 text-center ">
     <AddNewTaskBtn />
      <TodoNavigator
      to='progress'
      mClassName={'w-28 h-4 sm:h-5 md:h-6 -right-8 -bottom-6  lg:w-45 xl:w-50 lg:h-8 xl:h-10 xl:-right-4 xl:-bottom-12  lg:-right-10 lg:-bottom-10'}
       element={<span>progress</span>}
       message={'see progress report'}
        />
        <TodoNavigator
        to='settings'
        mClassName={'w-26 h-4 sm:h-5 md:h-6 -right-8 -bottom-6  lg:w-42 xl:w-48  lg:h-8 lg:-right-8 lg:-bottom-10 xl:h-10 xl:-right-4 xl:-bottom-12 '}
       element={ <span>settings</span>}
       message={'see settings menu'}
        />
        <TodoNavigator
        to='help'
        mClassName={'w-20 h-4 sm:h-5 md:h-6 -right-8 -bottom-6  lg:w-30 xl:w-35  lg:h-8 lg:-right-12 lg:-bottom-10 xl:h-10 xl:-right-4 xl:-bottom-12 '}
       element={<span>help</span>}
       message={'need help ?'}
        />
        <TodoNavigator
        to='menu'
        mClassName={'w-21 h-4 sm:h-5 md:h-6 -right-8 -bottom-6  lg:w-33 xl:w-38  lg:h-8 lg:-right-5 lg:-bottom-11 xl:h-10 xl:-right-4 xl:-bottom-12 '}
       element={ <span><BiMenu /></span>}
       message={'more options'}
        />
        <DisplayHoverMessage element={<Logout/>} message={'done with todo ?'}
        mClassName={"w-21 h-4 sm:h-5 md:h-6 -right-8 -bottom-6  lg:w-33 xl:w-45  lg:h-8 lg:-right-5 lg:-bottom-11 xl:h-10 xl:-right-4 xl:-bottom-12 "}
        />
     
    </nav>
  )
}

export default Navbar
