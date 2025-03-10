import { TbSocial } from "react-icons/tb";
import Ui from "../utils/Ui";
import { NavLink } from "react-router-dom";

function Social() {
  return (
    <div>
      <NavLink to="/layout/social">
        <Ui
          label={"social"}
          taskNum={3}
          icon={
            <span className="text-amber-500">
              <TbSocial />
            </span>
          }
        />
      </NavLink>
    </div>
  );
}

export default Social;
