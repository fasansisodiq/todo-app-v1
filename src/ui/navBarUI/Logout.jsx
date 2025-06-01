import { useNavigate } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";
import { useAuth } from "../../authentication/useAuth";

function Logout() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  // Function to sign out the current user
  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div className="pt-2 sm:pt-0">
      <CustomButton
        label={"log out"}
        type={"others"}
        size={"sm"}
        bg={"bg-emerald-600"}
        txtColor={"text-white"}
        hoverClass={"hover:bg-emerald-700 hover:text-slate-800"}
        onClick={handleLogOut}
      />
    </div>
  );
}

export default Logout;
