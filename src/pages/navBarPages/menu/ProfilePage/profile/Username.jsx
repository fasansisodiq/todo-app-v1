import ProfileItem from "./ProfileItem";

function Username({ value, onChange }) {
  return (
    <ProfileItem
      label={"username"}
      type={"text"}
      id={"username"}
      name={"username"}
      value={value}
      onChange={onChange}
      placeholder={"Enter your username"}
    />
  );
}

export default Username;
