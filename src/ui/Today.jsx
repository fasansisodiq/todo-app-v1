import { IoTodaySharp } from "react-icons/io5";
import Ui from "../utils/Ui";
import { NavLink } from "react-router";

function Today() {
  return (
    <div>
      <NavLink
        to="/layout/today"
        className={({ isActive }) =>
          isActive ? "text - rose - 500" : "text - gray - 500"
        }
      >
        <Ui
          label={"today"}
          taskNum={4}
          icon={
            <span className="text-rose-500">
              <IoTodaySharp />
            </span>
          }
        />
      </NavLink>
    </div>
  );
}

export default Today;
