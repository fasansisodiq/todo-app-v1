import { CgProfile } from "react-icons/cg";
import MenuItem from "./MenuItem";

function ProfileUi() {
  return <MenuItem label={"profile"} icon={<CgProfile />} to={"/profile"} />;
}

export default ProfileUi;
