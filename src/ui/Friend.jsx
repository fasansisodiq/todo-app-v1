import { NavLink } from "react-router-dom";
import Ui from "../utils/Ui";
import { FaUserFriends } from "react-icons/fa";

function Friend() {
  return (
    <div>
      <NavLink to="/layout/friend">
        <Ui
          label={"friend"}
          taskNum={3}
          icon={
            <span className="text-pink-700">
              <FaUserFriends />
            </span>
          }
        />
      </NavLink>
    </div>
  );
}

export default Friend;
