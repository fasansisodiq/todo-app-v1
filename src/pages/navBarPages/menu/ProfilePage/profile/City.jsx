import React from "react";
import ProfileItem from "./ProfileItem";
import { useAuth } from "../../../../../authentication/useAuth";

function City({ value, onChange }) {
  // const { setCity } = useAuth();
  return (
    <ProfileItem
      label={"city"}
      type={"text"}
      id={"city"}
      name={"city"}
      value={value}
      onChange={onChange}
      // setFunc={setCity}
      placeholder={"Enter your city"}
    />
  );
}

export default City;
