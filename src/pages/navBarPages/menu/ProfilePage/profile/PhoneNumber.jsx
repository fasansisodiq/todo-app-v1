import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function PhoneNumber({ value, onChange }) {
  // const { setPhoneNumber } = useAuth();
  return (
    <ProfileItem
      label={"phone number"}
      type={"tel"}
      id={"phoneNumber"}
      name={"phoneNumber"}
      value={value}
      onChange={onChange}
      // setFunc={setPhoneNumber}
      placeholder={"Enter your phone number"}
    />
  );
}

export default PhoneNumber;
