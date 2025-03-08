import { GiSelfLove } from "react-icons/gi"
import Ui from "../utils/Ui"
import { NavLink } from "react-router"


function Personal() {
  return (
    <div>
      <NavLink to="/layout/personal">
 <Ui label={"personal"} taskNum={5} icon={<span className="text-pink-600"><GiSelfLove/></span>}/>
      </NavLink> 
     
    </div>
  )
}

export default Personal
