import { useNavigate } from "react-router";
import SmallButton from "../utils/SmallButton";

function Logout() {
  const navigate = useNavigate();
  return (
    <div className="ml-45">
      <SmallButton
        label={"log out"}
        w={30}
        onClick={() => navigate("/login")}
      />
    </div>
  );
}

export default Logout;
