import { useAuth } from "../../authentication/useAuth";
import { MdOutlineEmail, MdPersonOutline } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import UserProfileItem from "./ProfileItemLabel";

function AboutUser() {
  const { fullName, email, phoneNumber, dateOfBirth } = useAuth();

  return (
    <div className="flex flex-col justify-start items-start  pt-5">
      <span className="capitalize font-semibold">about</span>
      <div className="flex flex-col items-start justify-center text-sm text-slate-400 gap-2 ">
        <UserProfileItem
          label={"fullname"}
          icon={<MdPersonOutline />}
          data={fullName}
          onClick={() => {}}
        />
        <UserProfileItem
          label={"email"}
          icon={<MdOutlineEmail />}
          data={email}
          onClick={() => {}}
        />
        <UserProfileItem
          label={"phone number"}
          icon={<BiPhone />}
          data={phoneNumber}
          onClick={() => {}}
        />
        <UserProfileItem
          label={"date of birth"}
          icon={<CiCalendarDate />}
          data={dateOfBirth}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default AboutUser;
