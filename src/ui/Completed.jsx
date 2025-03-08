import { MdDone } from "react-icons/md"
import Ui from "../utils/Ui"
import { NavLink } from "react-router"


function Completed() {
  return (
    <div>
      <NavLink to="/layout/completed">
<Ui label={"completed"} taskNum={10} icon={<span className="text-black-600"><MdDone/></span>}/>
      </NavLink> 
      
    </div>
  )
}

export default Completed
