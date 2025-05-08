import { useAuth } from "../../authentication/useAuth";
import ProfileItem from "./ProfileItem";

function FullName() {
  const { fullName, setFullName } = useAuth();

  return (
    <ProfileItem
      label={"full name"}
      type={"text"}
      id={"fullName"}
      name={"fullName"}
      defaultValue={fullName}
      setFunc={setFullName}
      placeholder={"Enter your full name"}
    />
  );
}

export default FullName;
