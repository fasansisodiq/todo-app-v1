import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/useAuth";
import NavBtn from "../../pages/welcome/NavBtn";
import { useDarkMode } from "../../customHooks/DarkModeContext"; // import the hook

function Logout() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { setDarkMode } = useDarkMode(); // get setDarkMode

  // Function to sign out the current user
  const handleLogOut = () => {
    logOut();
    setDarkMode(false); // reset to light mode
    navigate("/login");
  };

  return (
    <div className="">
      <NavBtn label="log out" onClick={handleLogOut} />
    </div>
  );
}

export default Logout;