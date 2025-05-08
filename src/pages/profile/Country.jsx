import { useAuth } from "../../authentication/useAuth";
import ProfileItem from "./ProfileItem";

function Country() {
  const { country, setCountry } = useAuth();
  return (
    <ProfileItem
      label={"country"}
      type={"text"}
      id={"country"}
      name={"country"}
      defaultValue={country}
      setFunc={setCountry}
      placeholder={"Enter your country"}
    />
  );
}

export default Country;
