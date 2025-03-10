import { FaTrash } from "react-icons/fa";
import Ui from "../utils/Ui";
import { NavLink } from "react-router-dom";

function Trash() {
  return (
    <div>
      <NavLink to="/layout/trash">
        <Ui
          label={"trash"}
          taskNum={12}
          icon={
            <span className="text-fuchsia-600">
              <FaTrash />
            </span>
          }
        />
      </NavLink>
    </div>
  );
}

export default Trash;
