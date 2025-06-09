import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function State({ value, onChange }) {
  // const { setState } = useAuth();

  return (
    <ProfileItem
      label={"state"}
      type={"text"}
      id={"state"}
      name={"state"}
      value={value}
      onChange={onChange}
      // setFunc={setState}
      placeholder={"Enter your state"}
    />
  );
}

export default State;
