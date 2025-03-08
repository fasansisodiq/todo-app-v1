import { HiHomeModern } from "react-icons/hi2"
import Ui from "../utils/Ui"
import { NavLink } from "react-router"


function House() {
  return (
    <div>
      <NavLink to="/layout/house">
         <Ui label={"house"} taskNum={4} icon={<span className="text-orange-400"><HiHomeModern/></span>}/>
      </NavLink>
     
    </div>
  )
}

export default House
