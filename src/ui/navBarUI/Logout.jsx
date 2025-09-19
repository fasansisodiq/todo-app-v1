import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/useAuth";
import NavBtn from "../../pages/welcome/NavBtn";

function Logout() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  // Function to sign out the current user
  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div className="">
      <NavBtn label="log out" onClick={handleLogOut} />
    </div>
  );
}

export default Logout;
