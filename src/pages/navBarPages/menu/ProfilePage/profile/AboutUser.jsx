import { MdOutlineEmail, MdPersonOutline } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { FaUserShield } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import UserProfileItem from "./ProfileItemLabel";
import { useAuth } from "../../../../../authentication/useAuth";

function AboutUser() {
  const { profile } = useAuth();
  const userProfile = [
    {
      label: "fullname",
      icon: <MdPersonOutline />,
      data: profile?.fullName || "",
    },
    {
      label: "email",
      icon: <MdOutlineEmail />,
      data: profile?.email || "",
    },
    {
      label: "phone number",
      icon: <BiPhone />,
      data: profile?.phoneNumber || "",
    },
    {
      label: "date of birth",
      icon: <CiCalendarDate />,
      data: profile?.dateOfBirth || "",
    },
    {
      label: "role",
      icon: <FaUserShield />,
      data: profile?.role || "",
    },
    {
      label: "join date",
      icon: <FaRegCalendarCheck />,
      data: profile?.joinDate || "",
    },
  ];
  return (
    <div className="flex flex-col justify-start items-start pt-5">
      <div className="flex flex-col items-start justify-center text-base text-slate-400 dark:text-yellow-50 gap-2">
        {userProfile.map(({ label, icon, data }) => (
          <UserProfileItem key={label} label={label} icon={icon} data={data} />
        ))}
      </div>
    </div>
  );
}

export default AboutUser;
