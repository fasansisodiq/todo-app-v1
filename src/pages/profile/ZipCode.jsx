import React from "react";
import { useAuth } from "../../authentication/useAuth";
import ProfileItem from "./ProfileItem";

function ZipCode() {
  const { zipCode, setZipCode } = useAuth();
  return (
    <ProfileItem
      label={"zip code"}
      name={"zip code"}
      type={"text"}
      id={"zip code"}
      defaultValue={zipCode}
      placeholder={"Enter your zip code"}
      maxLength={10}
      pattern="[0-9]*"
      inputMode="numeric"
      onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
          setZipCode(value);
        }
      }}
    />
  );
}

export default ZipCode;
