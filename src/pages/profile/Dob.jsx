import React from "react";
import ProfileItem from "./ProfileItem";
import { useAuth } from "../../authentication/useAuth";

function Dob() {
  const { dateOfBirth, setDateOfBirth } = useAuth();
  return (
    <ProfileItem
      label={"date of birth"}
      type={"date"}
      id={"dob"}
      name={"dob"}
      defaultValue={dateOfBirth}
      setFunc={setDateOfBirth}
      placeholder={"Enter your date of birth"}
    />
  );
}

export default Dob;
