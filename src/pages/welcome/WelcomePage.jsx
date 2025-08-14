import { Link, useNavigate } from "react-router";
import Button from "../../utils/Button";
import { FcTodoList } from "react-icons/fc";
// import Logo from "../../utils/Logo";
import WhyTodoPro from "./WhyTodoPro";
import Gif from "./Gif";
import FeatureList from "./FeatureList";
import HowItWorks from "./HowItWorks";
import SocialProof from "./SocialProof";
import Testimonials from "./Testimonials";
import Logo from "../utils/Logo";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-slate-800 font-sans">
      {/* Header */}
      <nav className="w-full h-10 bg-emerald-50 sm:h-15 md:h-24  shadow-2xl fixed top-0 right-0 left-0 z-50 justify-between px-4  sm:px-6 md:px-8 flex  items-center ">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <img
            src="/todopro-light-small.png"
            className="size-10 sm:size-10 md:size-16"
          />

          <span className="text-2xl lg:text-4xl font-extrabold text-emerald-700 tracking-wide drop-shadow">
            todopro
          </span>
        </div>
        <Link
          to="/login"
          className="w-fit h-fit  p-0.5 px-2 flex justify-center items-center  sm:px-3 md:px-4 rounded-full bg-emerald-600 hover:bg-emerald-30 transition-all duration-200 shadow-lg text-white text-xs"
        >
          log in
          {/* <Button label={<span>login</span>} type="button" /> */}
        </Link>
      </nav>

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
          <Button
            label={
              <span className="flex items-center gap-4">
                {/* <img
                  src="/public/todopro-light-small.png"
                  className="size-2 sm:size-4 md:size-6"
                /> */}
                Get Started
              </span>
            }
            onClick={() => navigate("/signup")}
            type="button"
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg transition-all duration-200 text-base md:text-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
