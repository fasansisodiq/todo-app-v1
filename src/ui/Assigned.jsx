import { CgAssign } from "react-icons/cg";
import Ui from "../utils/Ui";
import { NavLink } from "react-router-dom";

function Assigned() {
  return (
    <div>
      <NavLink to="/layout/assigned">
        <Ui
          label={"assigned"}
          taskNum={2}
          icon={
            <span className="text-lime-500">
              <CgAssign />
            </span>
          }
        />
      </NavLink>
    </div>
  );
}

export default Assigned;
