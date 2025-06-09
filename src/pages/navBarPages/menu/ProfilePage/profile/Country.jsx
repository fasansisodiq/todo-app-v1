import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function Country({ value, onChange }) {
  // const { setCountry } = useAuth();
  return (
    <ProfileItem
      label={"country"}
      type={"text"}
      id={"country"}
      name={"country"}
      value={value}
      onChange={onChange}
      // setFunc={setCountry}
      placeholder={"Enter your country"}
    />
  );
}

export default Country;
