import { MdWork } from "react-icons/md"
import Ui from "../utils/Ui"
import { NavLink } from "react-router"


function Work() {
  return (
    <div>
      <NavLink to="/layout/work">
        <Ui label={"work"} taskNum={12} icon={<span className="text-orange-600"><MdWork/></span>}/>
      </NavLink>
    </div>
  )
}

export default Work
