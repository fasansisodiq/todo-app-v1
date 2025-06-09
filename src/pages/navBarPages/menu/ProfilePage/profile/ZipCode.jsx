import ProfileItem from "./ProfileItem";

function ZipCode({ value, onChange }) {
  return (
    <ProfileItem
      label={"zip code"}
      name={"zip code"}
      type={"text"}
      id={"zip code"}
      value={value}
      placeholder={"Enter your zip code"}
      onChange={onChange}
    />
  );
}

export default ZipCode;
