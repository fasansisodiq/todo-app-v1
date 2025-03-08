import logo from "../logo/logo-big.png";
function Logo() {
  return (
    <div>
      <img
        className="opacity-70  w-[15rem] sm:w-[25rem] lg:w-[35rem] mt-4"
        src={logo}
        alt="app logo"
      />
    </div>
  );
}

export default Logo;
