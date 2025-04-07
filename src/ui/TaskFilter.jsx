import { FiFilter } from "react-icons/fi"
import TaskOperation from "../utils/TaskOperation"


function TaskFilter() {
  return (
    <div className="lg:text-2xl">
      <TaskOperation onClick={""} state={""} label={"filter"} icon={<FiFilter/>} childModal={""} rightAngle={"yes"}/>
    </div>
  )
}

export default TaskFilter
