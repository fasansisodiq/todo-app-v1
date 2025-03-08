
import { NavLink } from "react-router"
import Ui from "../utils/Ui"
import { IoInformation } from "react-icons/io5"


function Important() {
  return (
    <div>
      <NavLink to="/layout/important">
  <Ui icon={<span className="text-green-500"><IoInformation/></span>} label={"impotant"} taskNum={3}/>
      </NavLink> 
    
    </div>
  )
}

export default Important
