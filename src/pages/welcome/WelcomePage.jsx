import { useNavigate } from "react-router";
import Button from "../../utils/Button";
import { FcTodoList } from "react-icons/fc";
// import Logo from "../../utils/Logo";
import WhyTodoPro from "./WhyTodoPro";
import Gif from "./Gif";
import FeatureList from "./FeatureList";
import HowItWorks from "./HowItWorks";
import SocialProof from "./SocialProof";
import Testimonials from "./Testimonials";
import Logo from "./Logo";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-slate-800 font-sans">
      {/* Header */}
      <header className="flex flex-col items-center gap-2 mt-8 mb-4">
        <Logo />
        <span className="text-2xl lg:text-4xl font-extrabold text-emerald-700 tracking-wide drop-shadow">
          todopro
        </span>
        <span className="text-lg lg:text-2xl text-emerald-800 font-semibold mt-2">
          Get things done, beautifully.
        </span>
        <span className="text-base lg:text-xl text-slate-500 font-medium text-center">
          Your #1 <span className="text-emerald-600 font-semibold">2-in-1</span>{" "}
          task manager &amp; todo list app.
        </span>
      </header>

      {/* Main Content Stacked */}
      <div className="flex flex-col gap-6 items-stretch w-full max-w-2xl px-2 flex-1">
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
        <div className="flex justify-center mt-4 md:mt-6">
          <Button
            label={
              <span className="flex items-center gap-2">
                <FcTodoList className="text-xl" />
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
