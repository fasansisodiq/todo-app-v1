import { useNavigate } from "react-router-dom";
import CustomButton from "../utils/CustomButton";

function Logout() {
  const navigate = useNavigate();
  return (
    <div className="">
      <CustomButton
        label={"log out"}
        type={"others"}
        size={"sm"}
        bg={"bg-emerald-600"}
        txtColor={"text-white"}
        hoverClass={"hover:bg-emerald-700 hover:text-slate-800"}
        onClick={() => navigate("/login")}
      />
    </div>
  );
}

export default Logout;
