import React from "react";
import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function Dob({ value, onChange }) {
  // const { setDateOfBirth } = useAuth();
  return (
    <ProfileItem
      label={"date of birth"}
      type={"date"}
      id={"dob"}
      name={"dob"}
      value={value}
      onChange={onChange}
      // setFunc={setDateOfBirth}
      placeholder={"Enter your date of birth"}
    />
  );
}

export default Dob;
