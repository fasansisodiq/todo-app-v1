import { useNavigate } from "react-router-dom";
import SmallButton from "../utils/SmallButton";

function Logout() {
  const navigate = useNavigate();
  return (
    <div className="">
      <SmallButton
        label={"log out"}
        w={30}
        onClick={() => navigate("/login")}
      />
    </div>
  );
}

export default Logout;
