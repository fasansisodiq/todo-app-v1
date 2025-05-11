import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function StreetAdress() {
  const { streetAddress, setStreetAddress } = useAuth();
  return (
    <ProfileItem
      label={"street address"}
      type={"text"}
      id={"streetAddress"}
      name={"streetAddress"}
      defaultValue={streetAddress}
      setFunc={setStreetAddress}
      placeholder={"Enter your street address"}
    />
  );
}

export default StreetAdress;
