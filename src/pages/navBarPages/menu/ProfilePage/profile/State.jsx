import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function State() {
  const { state, setState } = useAuth();

  return (
    <ProfileItem
      label={"state"}
      type={"text"}
      id={"state"}
      name={"state"}
      defaultValue={state}
      setFunc={setState}
      placeholder={"Enter your state"}
    />
  );
}

export default State;
