import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function StreetAdress({ value, onChange }) {
  // const { setStreetAddress } = useAuth();
  return (
    <ProfileItem
      label={"street address"}
      type={"text"}
      id={"streetAddress"}
      name={"streetAddress"}
      value={value}
      onChange={onChange}
      // setFunc={setStreetAddress}
      placeholder={"Enter your street address"}
    />
  );
}

export default StreetAdress;
