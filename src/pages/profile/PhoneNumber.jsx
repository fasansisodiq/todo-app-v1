import ProfileItem from "./ProfileItem";
import { useAuth } from "../../authentication/useAuth";

function PhoneNumber() {
  const { phoneNumber, setPhoneNumber } = useAuth();
  return (
    <ProfileItem
      label={"phone number"}
      type={"tel"}
      id={"phoneNumber"}
      name={"phoneNumber"}
      defaultValue={phoneNumber}
      setFunc={setPhoneNumber}
      placeholder={"Enter your phone number"}
    />
  );
}

export default PhoneNumber;
