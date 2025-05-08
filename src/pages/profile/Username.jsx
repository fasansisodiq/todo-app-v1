import { useAuth } from "../../authentication/useAuth";
import ProfileItem from "./ProfileItem";

function Username() {
  const { username, setUsername } = useAuth();
  return (
    <ProfileItem
      label={"username"}
      type={"text"}
      id={"username"}
      name={"username"}
      defaultValue={username}
      setFunc={setUsername}
      placeholder={"Enter your username"}
    />
  );
}

export default Username;
