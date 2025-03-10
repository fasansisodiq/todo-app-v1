import { BiCalendarEvent } from "react-icons/bi";
import Ui from "../utils/Ui";
import { NavLink } from "react-router-dom";

function Planned() {
  return (
    <div className="">
      <NavLink to="/layout/planned">
        <Ui
          label={"planned"}
          taskNum={2}
          icon={
            <span className="text-blue-600">
              <BiCalendarEvent />
            </span>
          }
        />
      </NavLink>
    </div>
  );
}

export default Planned;
