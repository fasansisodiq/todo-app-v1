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
        bg={"bg-emerald-600 dark:bg-emerald-800"}
        txtColor={"text-white dark:text-yellow-200"}
        hoverClass={
          "hover:bg-emerald-700 hover:text-slate-800 dark:hover:bg-emerald-900 dark:hover:text-yellow-300"
        }
        onClick={handleLogOut}
      />
    </div>
  );
}

export default Logout;
