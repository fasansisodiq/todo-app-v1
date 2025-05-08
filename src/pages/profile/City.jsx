import React from "react";
import ProfileItem from "./ProfileItem";
import { useAuth } from "../../authentication/useAuth";

function City() {
  const { city, setCity } = useAuth();
  return (
    <ProfileItem
      label={"city"}
      type={"text"}
      id={"city"}
      name={"city"}
      defaultValue={city}
      setFunc={setCity}
      placeholder={"Enter your city"}
    />
  );
}

export default City;
