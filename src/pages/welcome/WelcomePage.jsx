// import Logo from "../../utils/Logo";
import WhyTodoPro from "./WhyTodoPro";
import Gif from "./Gif";
import FeatureList from "./FeatureList";
import HowItWorks from "./HowItWorks";
import SocialProof from "./SocialProof";
import Testimonials from "./Testimonials";
import StickyNav from "../../utils/StickyNaV";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import NavBtn from "./NavBtn";

function WelcomePage() {
  const [openMenu, setOpenMenu] = useState(false);

  function handleToggleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-slate-800 font-sans">
      {/* Header */}
      <StickyNav className="">
        <div className="w-full flex justify-start  items-center gap-2 sm:gap-3 md:gap-4">
          <img
            src="/todopro-light-small.png"
            className=" size-10 sm:size-10 md:size-16"
          />

          <span className="text-xl lg:text-2xl font-bold text-emerald-700 tracking-wide drop-shadow">
            todopro
          </span>
        </div>
        <div className="sm:text-xl lg:text-2xl">
          {openMenu ? (
            <button
              onClick={handleToggleMenu}
              className="sm:text-2xl h-5 w-5 sm:h-8 sm:w-8 rounded flex items-center justify-center hover:bg-emerald-200 active:bg-emerald-200 "
            >
              &times;
            </button>
          ) : (
            <BiMenu onClick={handleToggleMenu} />
          )}
        </div>
      </StickyNav>
      <>
        {openMenu && (
          <div
            onClick={handleToggleMenu}
            className={`w-screen mt-10 sm:mt-15 fixed inset-0 z-10 flex justify-center items-center bg-black/30 dark:bg-bg-[#181f1b] dark:rounded-2xl backdrop-blur-sm transition-all`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`w-full p-4 pb-8 flex flex-col justify-between h-50 sm:h-100 absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]  ${
                openMenu ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
            >
              <div>menu</div>
              <div>page</div>
              <div className="flex self-center gap-4  sm:gap-8">
                <NavBtn to="login" label="Login" />
                <NavBtn to="signup" label="Get started for free" />
              </div>
            </div>
          </div>
        )}
      </>

      {/* Main Content Stacked */}
      <div className="flex flex-col gap-6 items-stretch w-full max-w-2xl px-2 pt-30 flex-1">
        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-lg lg:text-2xl text-emerald-800 font-semibold mt-2">
            Get things done, beautifully.
          </span>
          <span className="text-base lg:text-xl text-slate-500 font-medium text-center">
            Your #1{" "}
            <span className="text-emerald-600 font-semibold">2-in-1</span> task
            manager &amp; todo list app.
          </span>
        </div>
        {/* Social Proof */}
        <SocialProof />

        {/* How it works */}
        <HowItWorks />

        {/* Features */}
        <div className="mt-4">
          <h2 className="text-lg lg:text-xl font-bold text-emerald-700 mb-2">
            Key Features
          </h2>
          <FeatureList />
        </div>

        {/* Why todopro badges */}
        <WhyTodoPro />

        {/* Demo GIF or Screenshot */}
        <div className="w-full flex justify-center">
          <Gif />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Call to action button */}
        <div className="flex justify-center items-center  sm:mt-2  mb-15 md:mb-20">
          <NavBtn to={"signup"} label={"Get Started for free"} />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
