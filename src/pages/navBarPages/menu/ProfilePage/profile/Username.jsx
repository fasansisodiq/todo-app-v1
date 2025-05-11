import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

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
