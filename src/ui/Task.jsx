import { BiTask } from "react-icons/bi"
import Ui from "../utils/Ui"
import { NavLink } from "react-router"


function Task() {
  return (
    <div className="">
      <NavLink to="/layout/task">
        <Ui label={"task"} taskNum={8} icon={<span className="text-blue-400"><BiTask/></span>}/>
      </NavLink> 
      
    </div>
  )
}

export default Task
