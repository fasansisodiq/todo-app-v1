import React from "react";
import UserProfileItem from "./ProfileItemLabel";
import { useAuth } from "../../authentication/useAuth";
import { FaMapLocation } from "react-icons/fa6";
import { PiCityLight } from "react-icons/pi";
import { MdLocationCity } from "react-icons/md";
import { FiMap } from "react-icons/fi";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
function UserAddress() {
  const { streetAddress, city, state, country, zipCode } = useAuth();
  return (
    <div className="flex flex-col justify-start items-start gap-2 pt-5">
      <span className="capitalize font-semibold">address</span>
      <div className="flex flex-col items-start justify-center text-sm text-slate-400 gap-2 ">
        <UserProfileItem
          label={"address"}
          icon={<FaMapLocation />}
          data={streetAddress}
          onClick={() => {}}
        />
        <UserProfileItem
          label={"city"}
          icon={<PiCityLight />}
          data={city}
          onClick={() => {}}
        />
        <UserProfileItem
          label={"state"}
          icon={<MdLocationCity />}
          data={state}
          onClick={() => {}}
        />
        <UserProfileItem
          label={"country"}
          icon={<FiMap />}
          data={country}
          onClick={() => {}}
        />
        <UserProfileItem
          label={"poster code"}
          icon={<LiaMapMarkerAltSolid />}
          data={zipCode}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default UserAddress;
