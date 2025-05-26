import React from "react";
import UserProfileItem from "./ProfileItemLabel";
import { useAuth } from "../../../../../authentication/useAuth";
import { FaMapLocation } from "react-icons/fa6";
import { PiCityLight } from "react-icons/pi";
import { MdLocationCity } from "react-icons/md";
import { FiMap } from "react-icons/fi";
import { LiaMapMarkerAltSolid } from "react-icons/lia";

function UserAddress() {
  const { streetAddress, city, state, country, zipCode } = useAuth();

  const addressFields = [
    {
      label: "address",
      icon: <FaMapLocation />,
      data: streetAddress,
    },
    {
      label: "city",
      icon: <PiCityLight />,
      data: city,
    },
    {
      label: "state",
      icon: <MdLocationCity />,
      data: state,
    },
    {
      label: "country",
      icon: <FiMap />,
      data: country,
    },
    {
      label: "postal code",
      icon: <LiaMapMarkerAltSolid />,
      data: zipCode,
    },
  ];

  return (
    <div className="flex flex-col justify-start items-start gap-2 pt-5">
      <span className="capitalize font-semibold">address</span>
      <div className="flex flex-col items-start justify-center text-sm text-slate-400 gap-2">
        {addressFields.map(({ label, icon, data }) => (
          <UserProfileItem key={label} label={label} icon={icon} data={data} />
        ))}
      </div>
    </div>
  );
}

export default UserAddress;
